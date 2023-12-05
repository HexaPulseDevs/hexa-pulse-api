// Imports
const { config } = require("../config/config");

// Libraries
const { Sequelize } = require("sequelize");

let URI;
if (config.isPro) {
  URI = config.dbUrl;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);

  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: false,
  define: { timestamps: true },
});

module.exports = sequelize;
