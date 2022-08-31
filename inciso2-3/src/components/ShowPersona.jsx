import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";

export const ShowPersona = ({ personas, onRemovePersona }) => {
  const showDate = (date) => {
    return moment(date).locale("es").utc().format("MMM Do YYYY");
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Accion</th>
            <th>Nombre</th>
            <th>DPI</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((value, index) => (
            <tr key={index}>
              <td>
                <Button variant="danger" onClick={() => onRemovePersona(index)}>
                  Eliminar
                </Button>
              </td>
              <td>{value.nombre}</td>
              <td>{value.dpi}</td>
              <td>{showDate(value.fecha)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
