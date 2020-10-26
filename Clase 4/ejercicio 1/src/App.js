import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useParams } from 'react-router-dom'

//Home
// creamos el componente Paises , usesState para el estado, y obtenemos datos del json.
const Paises = () => {
  const [paises, setPaises] = useState([])

  const getPaises = () => {
    fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json')
      .then(response => response.json())
      .then(paises => setPaises(paises))
      .catch(errores => console.log(errores))
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getPaises()
  }, [])
  //filtramos del json los paises que empiezan con A, toUpperCase pasa a mayuscula.Creamos link para que vaya a /pais y (+pais) para que lo agregue en el url
  const key = Object.keys(paises)
  return(
    <ul>
      { key.filter(pais => pais[0].toUpperCase() ==='A').map((pais, i) => <Link to={'/pais/'+pais}><li key={i}>{pais}</li></Link>) }
    </ul>
  )
}
// creamos componente Pais ,useState para el estado, creamos parametros para usarlo como variable para que cambie la ruta  y obtenemos datos del json.
const Pais = () => {
  const [pais, setPais] = useState([]);
  const parametros = useParams();
  const getPais = () => {
    fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json')
      .then(response => response.json())
      .then(pais => setPais(pais))
      .catch(errores => console.log(errores))
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getPais()
  }, [])

  return(
    <>
      <p>Ciudades:<ul>{ pais[parametros.p]? pais[parametros.p].map((pais,i) => <li>{pais}</li>):null }</ul></p>
      <Link to='/'>Regresa al Home</Link>
    </>
  )
}


const App = () => (
    <div className="App">
      <header className="App-header">          
        <h1 className="App-title">Paises</h1>
      </header>
      <Switch>
        <Route exact path="/"><Paises/></Route>
        <Route path="/pais/:p"><Pais/></Route>
      </Switch>        
    </div>
  );
  export default App;
