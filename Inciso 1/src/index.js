#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";

program.version("0.0.1").description("Linea de comandos para clientes");

let arrayClientes = [];
let opcion = "";

program.command("menu").action(async () => {
  await menu();
});
async function menu() {
  const respuestaLista = await inquirer.prompt([
    {
      type: "list",
      message: "Opciones \n",
      name: "lista",
      choices: ["Nuevo cliente", "Listar clientes filtrados"],
    },
  ]);
  opcion = respuestaLista.lista;

  if (opcion == "Nuevo cliente") {
    await nuevoCliente();
  }

  if (opcion == "Listar clientes filtrados") {
    await listarCliente();
  }
}
async function nuevoCliente() {
  const respuesta = await inquirer.prompt([
    {
      type: "input",
      message: "Ingrese el nombre del cliente \n",
      name: "cliente",
    },
  ]);
  arrayClientes.push(respuesta.cliente.toUpperCase());
  const respuestaSiNo = await inquirer.prompt([
    {
      type: "confirm",
      message: "¿Desea agregar otro cliente? \n",
      name: "confirmacion",
    },
  ]);
  if (respuestaSiNo.confirmacion == true) {
    await nuevoCliente();
  } else {
    console.clear();
    await menu();
  }
}
async function listarCliente() {
  let arrayClientesFiltrados = [];
  if (arrayClientes.length > 0) {
    arrayClientes.filter((cliente) => {
      if (cliente.includes("RE")) arrayClientesFiltrados.push(cliente);
    });
    console.table(arrayClientesFiltrados);
  } else {
    console.log("Deber agregar clientes");
  }

  const respuestaSiNo = await inquirer.prompt([
    {
      type: "confirm",
      message: "¿Desea regresar al menu? \n",
      name: "confirmacion",
    },
  ]);
  if (respuestaSiNo.confirmacion == true) {
    console.clear();
    await menu();
  } else {
    console.clear();
    // console.log("Gracias :)");
  }
}

program.parse(process.argv);
