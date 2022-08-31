const { Cliente, Persona } = require("../models");

const PersonaIdExist = async (id) => {
  const persona = await Persona.findByPk(id);
  if (!persona) {
    throw new Error(`El id de la persona no existe en nuestros registros`);
  }
};
module.exports = {
  PersonaIdExist,
};
