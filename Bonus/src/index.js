#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";

program.version("0.0.1").description("Linea de comandos para clientes");

let arrayNumeros = [];
let opcion = "";

program.command("ingresar").action(async () => {
  await ingresarNumeros();
});

async function ingresarNumeros() {
  for (let i = 0; i < 10; i++) {
    const respuesta = await inquirer.prompt([
      {
        type: "input",
        message: `Ingrese el numero ${i + 1} \n`,
        name: "numero",
      },
    ]);
    console.clear();
    arrayNumeros.push(respuesta.numero);
  }
  console.log("El número mayor es", Math.max(...arrayNumeros));
}

program.parse(process.argv);
