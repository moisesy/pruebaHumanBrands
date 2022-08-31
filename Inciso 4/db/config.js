const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("prueba", "msyo", "Diamante1@", {
  host: "localhost",
  port: "8889",
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
