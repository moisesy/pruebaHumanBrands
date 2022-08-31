const { Router } = require("express");
const { check } = require("express-validator");

const {
  indexClientes,
  postCliente,
  busquedaId,
  updateCliente,
  desactivarCliente,
  activarCliente,
} = require("../controllers/cliente.controller");
const { PersonaIdExist } = require("../helpers");
const { validarCampos } = require("../middlewares");

const router = Router();
router.get("/get", [validarCampos], indexClientes);
router.get("/busqueda/:id", [validarCampos], busquedaId);
router.post(
  "/store",
  [
    check("nombre", "El nombre del cliente es necesario").not().isEmpty(),
    check("apellido", "El apellido del cliente es necesario").not().isEmpty(),
    check("numero", "El telefono del cliente es necesario").not().isEmpty(),
    check("cui", "El cui del cliente es necesario").not().isEmpty(),
    check("nit", "El nit del cliente es necesario").not().isEmpty(),
    validarCampos,
  ],
  postCliente
);
router.put(
  "/update",
  [
    check("nombre", "El nombre del cliente es necesario").not().isEmpty(),
    check("apellido", "El apellido del cliente es necesario").not().isEmpty(),
    check("numero", "El telefono del cliente es necesario").not().isEmpty(),
    check("cui", "El cui del cliente es necesario").not().isEmpty(),
    check("nit", "El nit del cliente es necesario").not().isEmpty(),
    check("id").custom(PersonaIdExist),
    validarCampos,
  ],
  updateCliente
);
router.put(
  "/desactivate",
  [check("id").custom(PersonaIdExist), validarCampos],
  desactivarCliente
);
router.put(
  "/activate",
  [check("id").custom(PersonaIdExist), validarCampos],
  activarCliente
);

module.exports = router;
