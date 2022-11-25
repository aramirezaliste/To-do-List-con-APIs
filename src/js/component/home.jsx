import React, { useState, useEffect } from "react";



//create your first component
const Home = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://assets.breatheco.de/apis/fake/todos/user/andresramirez", requestOptions)
      .then(response => response.json())
      .then(data => setTareas(data))
      .catch(error => console.log('error', error));
  }, []);


  return ( 
      
    <div className="cuerpo">
      <h1>Lista de Tareas</h1>
      <input className="inputUno" type="text" placeholder="Ingresar tarea"
        onKeyPress={(event) => {
          if (event.key == "Enter") {setTareas([...tareas, event.target.value]);
            event.target.value = "";
          }
        }}
      />

      {tareas.map((value, index) => {
        return (
          <li key={index}> {value.label}{" "}
            <button value={index} onClick={(pos) => {
                //console.log(pos.target.value);
                setTareas(tareas.filter((val, ind) => {
                    return ind != pos.target.value;
                  })
                );
              }}>
              <i className="fas fa-minus"></i>
            </button>
          </li>
        );
      })}
      <li className="ultimoLi">
        {tareas.length != 0
          ? tareas.length + " tareas por hacer"
          : "No hay tareas, añadir tareas!"}
      </li>
    </div>
  );
};

export default Home;
