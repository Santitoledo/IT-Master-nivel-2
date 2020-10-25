import React, { useState,useEffect } from 'react';
import { Switch,Route,Link,NavLink,useParams } from 'react-router-dom'

const Tareas = () => {
  const [tareas, setTareas] = useState( [] )

  function getTareas() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(tareas => setTareas(tareas))
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getTareas()
  }, [])

  return (  
    <ul>
        {tareas.filter( tarea => tarea.userId===8).map( trabajo =>
        <li key={trabajo.id}><NavLink to={"/tarea/"+trabajo.id}>
        {trabajo.title}</NavLink>
        </li>
          )}     
    </ul> 
     
  )
}

const Tarea = () => {
  const [tarea, setTarea] = useState( [] )
  let params = useParams();
  const getTarea = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(tarea => {setTarea(tarea);})
      .catch(err => console.log(err.message))
  }
  useEffect(() => { getTarea();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])
      return (  
      <section>
        {tarea.filter( tare => tare.userId===8 && parseInt(tare.id)===parseInt(params.id)).map(work =>
        <div key={work.id}>
        <h1>{ params.id } - {work.title}</h1>       
         <p>Estado de la Tarea: {work.completed ? "Completada 🟢":"Falta completar 🔴"}</p>   
         <p><Link to="/">Regresar a la home</Link></p>
         </div>
         )} 
      </section>    
  )
}


  const App = () => (
        <div className="App">
          <header className="App-header">          
            <h1 className="App-title">Lista de Tareas UsuarioId: 8</h1>
          </header>
          <Switch>
            <Route exact path="/"><Tareas/></Route>
            <Route exact path="/Tarea/:id"><Tarea/></Route>
          </Switch>        
        </div>
      );
export default App;
