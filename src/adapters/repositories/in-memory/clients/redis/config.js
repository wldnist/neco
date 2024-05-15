import { Redis } from "ioredis";

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisAuth = process.env.REDIS_AUTH;

let redisClient = null;
(async () => {
  redisClient = new Redis({
    host: redisHost,
    port: redisPort,
    password: redisAuth,
  });

  redisClient.on("error", (error) => {
    console.log(error);
  });

  redisClient.on("connect", () => {
    console.log("Redis connected!");
  });
})();

export default redisClient;
