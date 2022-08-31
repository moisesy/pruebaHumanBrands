const { DataTypes, Sequelize} = require('sequelize');
const db = require('../../../db/config');
const Persona = require('../persona/persona.model');

const Cliente = db.define('clientes', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nit_cliente: {
        type: DataTypes.STRING(50),
    },
    estado_cliente: {
        type: DataTypes.BOOLEAN,
        defaultValue : true
    },
});
Cliente.belongsTo(Persona,{
    foreignKey: {
    allowNull: false
}});
Persona.hasMany(Cliente);


module.exports = Cliente;