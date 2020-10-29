import React  from 'react';
// Importamos el useFetch que se encargará de manejar el pedido al JSON online
import useFetch from "./useFetch";


const Productos = () => {
    // la constante users recibe la info de todos los usuarios
  const producs = useFetch("https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json");
    return (  
        <ul>
          { producs.filter(p => p.price > 15 ).map((pro, i) =><li key={i}><h3>titulo</h3> {pro.title} <h3>precio</h3>${pro.price}<h3>Description</h3> {pro.description}</li>) } 
        </ul>      
    )
}
  const App = () => (
        <div className="App">
          <header className="App-header">          
            <h1>Productos:</h1>
          </header>
          <Productos/>      
        </div>
      );
export default App;
