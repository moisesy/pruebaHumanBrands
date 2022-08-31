const { response, request } = require("express");
const { Cliente, Persona } = require("../models");
const Sequelize = require("sequelize");
const { getPagination, getPagingData } = require("../resources/paginacion");

const Op = Sequelize.Op;
const sequelize = require("../db/config");

const indexClientes = async (req = request, res = response) => {
  const {
    page = 1,
    limite = 10,
    search = "",
    criterio = "nombre_persona",
  } = req.query;
  // console.log('entro');
  let clientes;
  let response;
  const opt1 = {
    limit: parseInt(limite) || 10,
    page: parseInt(page) || 0,
  };
  const { limit, offset } = getPagination(opt1.page, opt1.limit);
  if (search == "") {
    try {
      clientes = await Cliente.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [["createdAt", "DESC"]],
        // attributes : ['id', 'nombre_persona', 'createdAt'],
        include: [
          { model: Persona },
          // {model : Tienda}
        ],
      });
      response = getPagingData(clientes, page, limit);
    } catch (err) {
      return res.status(400).json({
        msg: "Algo salio mal",
        err,
      });
    }
  } else {
    try {
      clientes = await Cliente.findAndCountAll({
        offset: offset,
        limit: limit,
        include: [
          {
            model: Persona,
            where: { [criterio]: { [Op.like]: `%${search}%` } },
          },
        ],
      });
      response = getPagingData(clientes, page, limit);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        msg: "Algo salio mal",
        err,
      });
    }
  }
  res.send(response);
};

const busquedaId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const clientes = await Cliente.findByPk(id, {
      include: [{ model: Persona }],
    });
    return res.json(clientes);
  } catch (error) {
    return res.status(400).json({
      msg: "Algo salio mal",
      err,
    });
  }
};

const postCliente = async (req = request, res = response) => {
  const { estado, fecha, ...resto } = req.body;
  const data = {
    nombre_persona: resto.nombre,
    apellido_persona: resto.apellido,
    direccion_persona: resto.direccion,
    numero_persona: resto.numero,
    email_persona: resto.email,
    cui_persona: resto.cui,
    nit_cliente: resto.nit,
    estado_persona: 1,
  };
  try {
    const persona = new Persona(data);
    await persona.save();
    const { id } = persona.dataValues;

    const cliente = new Cliente();
    cliente.personaId = id;
    cliente.nit_cliente = data.nit_cliente;
    await cliente.save();

    const clientes = await Cliente.findAll({
      where: {
        // company_proveedor: { [Op.like]: `%${search}%`},
        id: cliente.id,
        estado_cliente: true,
      },
      attributes: [
        "nit_cliente",
        "id",
        [
          sequelize.fn(
            "concat",
            sequelize.col("persona.nombre_persona"),
            " ",
            sequelize.col("nit_cliente")
          ),
          "nombre",
        ],
      ],
      include: [
        {
          model: Persona,
          required: true,
          attributes: ["nombre_persona"],
        },
      ],
    });

    res.json({
      msg: "ok",
      clientes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error",
    });
  }
};
const updateCliente = async (req = request, res = response) => {
  const { estado, fecha, ...resto } = req.body;

  const data = {
    nombre_persona: resto.nombre,
    apellido_persona: resto.apellido,
    direccion_persona: resto.direccion,
    numero_persona: resto.numero,
    email_persona: resto.email,
    cui_persona: resto.cui,
    nit_cliente: resto.nit,
    estado_persona: 1,
    id: parseInt(resto.id),
  };
  try {
    // console.log(data);
    await Persona.update(
      {
        nombre_persona: data.nombre_persona,
        apellido_persona: data.apellido_persona,
        direccion_persona: data.direccion_persona,
        numero_persona: data.numero_persona,
        email_persona: data.email_persona,
        cui_persona: data.cui_persona,
      },
      { where: { id: data.id } }
    );

    await Cliente.update(
      {
        nit_cliente: data.nit_cliente,
      },
      { where: { personaId: data.id } }
    );

    res.json({
      msg: "Actualización realizada con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error",
    });
  }
};
const desactivarCliente = async (req = resquest, res = response) => {
  const { ...resto } = req.body;
  const data = {
    id: resto.id,
  };
  try {
    const persona = await Persona.update(
      {
        estado_persona: 0,
      },
      { where: { id: data.id } }
    );

    await Cliente.update(
      {
        estado_cliente: 0,
      },
      { where: { personaId: data.id } }
    );
    res.json({
      msg: "Actualización realizada con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error",
    });
  }
};
const activarCliente = async (req = resquest, res = response) => {
  const { ...resto } = req.body;
  const data = {
    id: resto.id,
  };
  try {
    const persona = await Persona.update(
      {
        estado_persona: 1,
      },
      { where: { id: data.id } }
    );

    await Cliente.update(
      {
        estado_cliente: 1,
      },
      { where: { personaId: data.id } }
    );
    res.json({
      msg: "Actualización realizada con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error",
    });
  }
};

module.exports = {
  indexClientes,
  busquedaId,
  postCliente,
  updateCliente,
  desactivarCliente,
  activarCliente,
};
