// External libraries
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import knex from "knex";
import swaggerUi from "swagger-ui-express";

// Configurations
import knexMySQLClient from "./src/adapters/repositories/db/clients/knex/configs/mysql.js";
import swaggerSpec from "./docs/swagger/index.js";

// Middlewares
import Auth from "./src/adapters/transports/middlewares/auth.js";
import { errorHandler } from "./src/adapters/transports/rest/middlewares/errorHandler.js";

// Database and Repository
import redisClient from "./src/adapters/repositories/in-memory/clients/redis/config.js";
import InMemoryRepository from "./src/adapters/repositories/in-memory/clients/redis/wrapper.js";
import UserRepository from "./src/adapters/repositories/db/clients/knex/mysql/user.js";

// Services
import UserService from "./src/core/impl/user.js";

// Route Handler
import UserRouteHandler from "./src/adapters/transports/rest/route-handlers/user.js";

// Routes
import UserRouter from "./src/adapters/transports/rest/routes/user.js";
import typeDefs from "./src/adapters/transports/graphql/schemas/index.js";
import resolvers from "./src/adapters/transports/graphql/resolvers/index.js";

// Utilities
import { gracefulShutdown } from "./src/core/server/gracefulShutdown.js";
import TransactionHelper from "./src/adapters/repositories/db/clients/knex/helpers/transaction.js";

dotenv.config();
const port = process.env.PORT || 8356;

// Setup Express application
const app = express();
app.use(express.json());
app.use(cors());

// Serve Swagger UI for API documentation
app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { displayRequestDuration: true },
  }),
);

// External datasource

// Database setup
const inMemoryRepository = new InMemoryRepository({
  inMemoryRepositoryClient: redisClient,
});

const dbClient = knex(knexMySQLClient.development);
const transactionHelper = new TransactionHelper(dbClient);
const userRepository = new UserRepository({ dbClient });

// Middleware to expose dependencies
const middlewareDependencies = () => {
  return {
    inMemoryRepository,
    userRepository,
  };
};

const exposedDependencies = async (req, res, next) => {
  req.dependencies = middlewareDependencies();
  next();
};

app.use(exposedDependencies);

// Service setup
const userService = new UserService({
  transactionHelper,
  userRepository,
  inMemoryRepository,
  auth: Auth,
});

// Route handler setup
const userRouteHandler = new UserRouteHandler({ userService });
const userRouter = new UserRouter({
  expressRouter: express.Router(),
  userRouteHandler,
  auth: Auth,
});

// Routes
app.use("/api/v1/user", userRouter.route());

// Default route
app.get("/", async (req, res) => {
  res.status(200).json({ message: "ok" });
});

// Create an Apollo Server instance.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Mount Apollo Server and GraphQL Playground.
await server.start();
app.use(
  "/graphql",
  // Auth.authenticate,
  expressMiddleware(server, {
    context: async ({ req }) => ({
      userService: userService,
    }),
  }),
);

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown handler
const shutdownHandler = () => {
  gracefulShutdown(
    {
      dbClient,
      inMemoryRepositoryClient: redisClient,
    },
    (err) => {
      if (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
      } else {
        console.log("Server gracefully shut down.");
        process.exit(0);
      }
    },
  );
};

// Handle termination signals
process.on("SIGTERM", shutdownHandler);
process.on("SIGINT", shutdownHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
