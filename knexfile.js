require("dotenv").config();
const path = require("path");
const { DB_DEVELOPMENT, DB_PRODUCTION } = process.env;

module.exports = {

  development: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DB_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    }
  },

  production: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DB_PRODUCTION,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    }
  }

};
