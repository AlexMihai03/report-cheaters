import "dotenv/config";
import { Sequelize, Dialect } from "sequelize";

const {
  RC_DB_USER,
  RC_DB_PASS,
  RC_DB_HOST,
  RC_DB_DEV_DB_NAME,
  RC_DB_TEST_DB_NAME,
  RC_DB_PROD_DB_NAME,
  NODE_ENV,
  RC_IS_PRODUCTION,
  CLEARDB_DATABASE_URL,
} = process.env;

const databaseCredentials = {
  "development": {
    "username": RC_DB_USER,
    "password": RC_DB_PASS,
    "database": RC_DB_DEV_DB_NAME,
    "host": RC_DB_HOST,
    "dialect": "mysql",
  },
  "test": {
    "username": RC_DB_USER,
    "password": RC_DB_PASS,
    "database": RC_DB_TEST_DB_NAME,
    "host": RC_DB_HOST,
    "dialect": "mysql",
  },
  "production": {
    "username": RC_DB_USER,
    "password": RC_DB_PASS,
    "database": RC_DB_PROD_DB_NAME,
    "host": RC_DB_HOST,
    "dialect": "mysql",
  }
};

const {
  username,
  password,
  database,
  host,
  dialect,
} = databaseCredentials[NODE_ENV as "production" | "development" | "test"];

const mode = RC_IS_PRODUCTION === "true" ? "prod" : "dev";

console.log(`[DB]: Connecting to the database in ${mode} mode.`);

export const connection = RC_IS_PRODUCTION === "true"
  ? new Sequelize(CLEARDB_DATABASE_URL)
  : new Sequelize(database, username, password, {
    host,
    dialect: dialect as Dialect,
    port: 3306,
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  },
);

