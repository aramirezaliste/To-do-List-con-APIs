import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [tareas, setTareas] = useState([]); //funcion actualizadora

  //Funcion para el metodo PUT
  function putApi(){ 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    //Se actualiza PUT en esta variable
    var raw = JSON.stringify(tareas);
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    //Llamada del metodo PUT (Modificar o Borrar)
    fetch("https://assets.breatheco.de/apis/fake/todos/user/andresramirez", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
  };
  //Llamada del metodo GET (Obtener)
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

    //Al variar la variable tareas (useEffect), utilizar la funcion (putApi) 
  useEffect(()=>{
    putApi();
  },[tareas]);

  return (
    <div className="cuerpo">
      <h1>Lista de Tareas</h1>
      <input className="inputUno" type="text" placeholder="Ingresar tarea"
        onKeyPress={(event) => {
          if (event.key == "Enter") {
            setTareas([...tareas, {label:event.target.value, done:false}]);
            event.target.value = "";
          }
        }}
      />

      {tareas.map((value, index) => {
        return (
          <li key={index}> {value.label}
            <button value={index} onClick={(pos) => {
              //console.log(pos.target.value);
              setTareas(tareas.filter((val, ind) => {
                return ind != pos.target.value; //devuelve todas mis tareas que sean diferentes del button
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
