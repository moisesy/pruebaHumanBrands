const express = require("express");
const cors = require("cors");
const sequelize = require("../db/config");
require("../models/index");
// MEJORES PRACTICAS, CREANDO UNA CLASE QUE SE ENCARGARA DE NUESTRO SERVER Y RUTAS
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // PATH USER
    this.paths = {
      clientes: "/api/controlador",
    };

    // conexion
    this.conexion();
    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }
  async conexion() {
    try {
      await sequelize.sync();
      console.log("Conexión con al base de datos exitosa");
    } catch (error) {
      console.error("No se ha podido conectar a la base de datos:", error);
    }
  }
  middlewares() {
    // corss
    this.app.use(cors());

    // Lectura y parseo del body
    // basicamente cofiguramos el tipo de dato que recibimos
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());

    // pintara lo que tenga la carpeta public
    this.app.use(express.static("public"));
  }

  // se encargara de controlar las rutas
  routes() {
    this.app.use(this.paths.clientes, require("../routers/clientes.routes"));
  }
  // se encarga de encender nuestro servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
