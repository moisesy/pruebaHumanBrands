const { DataTypes } = require("sequelize");
const db = require("../../../db/config");

const Persona = db.define("personas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_persona: {
    type: DataTypes.STRING(50),
    // unique: true
  },
  apellido_persona: {
    type: DataTypes.STRING(50),
    // unique: true
  },
  direccion_persona: {
    type: DataTypes.STRING(100),
  },
  numero_persona: {
    type: DataTypes.STRING(10),
  },
  email_persona: {
    type: DataTypes.STRING(100),
  },
  cui_persona: {
    type: DataTypes.STRING(100),
  },
  estado_persona: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Persona;
