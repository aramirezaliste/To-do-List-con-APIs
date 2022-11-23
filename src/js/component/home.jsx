import React, { useState } from "react";

//create your first component
const Home = () => {
  const [tareas, nueva] = useState([
    "Estudiar Programación",
    "Alimentar al gato",
    "Regar las plantas",
  ]);

  return (
    <div className="cuerpo">
      <h1>Lista de Tareas</h1>
      <input
	  	className="inputUno"
        type="text"
        placeholder="Ingresar tarea"
        onKeyPress={(event) => {
          if (event.key == "Enter") {
            nueva([...tareas, event.target.value]);
            event.target.value = "";
          }
        }}
      />

      {tareas.map((value, index) => {
        return (
          <li key={index}>
            {value}{" "}
            <button
              value={index}
              onClick={(pos) => {
                //console.log(pos.target.value);
                nueva(
                  tareas.filter((val, ind) => {
                    return ind != pos.target.value;
                  })
                );
              }}
            >
              <i class="fas fa-minus"></i>
            </button>
          </li>
        );
      })}
	  <li className="ultimoLi">{tareas.length != 0 ?
		tareas.length + " tareas por hacer" : "No hay tareas, añadir tareas!"}
	  </li>
    </div>
  );
};

export default Home;
