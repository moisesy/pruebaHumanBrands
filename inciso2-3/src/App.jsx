import { useState } from "react";
import { AddPersona } from "./components/AddPersona";
import { ShowPersona } from "./components/ShowPersona";

export const App = () => {
  const [personas, setPersonas] = useState([]);

  const onAddPersona = (nuevaPersona) => {
    if (personas.includes(nuevaPersona)) {
      alert("Este usuario ya existe");
      return;
    }
    setPersonas([...personas, nuevaPersona]);
  };

  const onRemovePersona = (index) => {
    let temp = [...personas];
    temp.splice(index, 1);
    setPersonas(temp);
  };
  return (
    <>
      <div className="padre">
        <div align="center">
          <h1>Usuarios</h1>
          <AddPersona onNewPersona={(value) => onAddPersona(value)} />
          <div className="row">
            {/* <div className="col"></div> */}
            <div className="col">
              <ShowPersona
                onRemovePersona={(value) => onRemovePersona(value)}
                personas={personas}
              />
            </div>
            {/* <div className="col"></div> */}
          </div>
        </div>
      </div>
    </>
  );
};
