const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
} else {
  config.user = process.env.DB_USER;
  config.host = process.env.DB_HOST;
  config.database = process.env.DB_NAME;
  config.password = process.env.DB_PASSWORD;
  config.port = process.env.DB_PORT;
}

module.exports = new Pool(config);
