import { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import "react-datepicker/dist/react-datepicker.css";

export const AddPersona = ({ onNewPersona }) => {
  const [inputObject, setInputObject] = useState({
    nombre: "",
    dpi: "",
    fecha: new Date(),
  });

  const onInputChange = (e, tipo) => {
    let updatedValue = {};
    if (tipo == "nombre") {
      updatedValue = { nombre: e.target.value };
      setInputObject((nombre) => ({
        ...nombre,
        ...updatedValue,
      }));
    }
    if (tipo == "dpi") {
      updatedValue = { dpi: e.target.value };
      setInputObject((dpi) => ({
        ...dpi,
        ...updatedValue,
      }));
    }
    if (tipo == "fecha") {
      updatedValue = { fecha: e };
      setInputObject((fecha) => ({
        ...fecha,
        ...updatedValue,
      }));
    }
  };

  const onButtonSave = (event) => {
    event.preventDefault();
    if (inputObject.nombre == "" || inputObject.dpi == "") {
      alert("Los campos no pueden estar vacios");
      return;
    }
    onNewPersona(inputObject);
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <form>
            <Form.Control
              type="input"
              placeholder="Ingresar nombre"
              value={inputObject.nombre}
              onChange={(nombre) => onInputChange(nombre, "nombre")}
            />
            <br />
            <Form.Control
              type="number"
              placeholder="Ingresar DPI"
              value={inputObject.dpi}
              onChange={(dpi) => onInputChange(dpi, "dpi")}
            />
            <br />
            <DatePicker
              selected={inputObject.fecha}
              onChange={(fecha) => onInputChange(fecha, "fecha")}
            />
          </form>
          <br />
          <Button onClick={onButtonSave}>Guardar</Button>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};
