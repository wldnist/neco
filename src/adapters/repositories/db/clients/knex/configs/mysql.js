/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import * as dotenv from "dotenv";
// dotenv.config({ path: "../../../../../../../.env" });
dotenv.config();

export default {
  development: {
    client: process.env.MYSQL_DB_CONNECTION,
    connection: {
      host: process.env.MYSQL_DB_HOST,
      port: process.env.MYSQL_DB_PORT,
      user: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../../../../../../../schemas/mysql/knex/migrations",
    },
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000,
    },
    seeds: {
      directory: "../../../../../../../schemas/mysql/knex/seeders",
    },
  },
};
