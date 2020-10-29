import React  from 'react';
// Importamos el useFetch que se encargará de manejar el pedido al JSON online
import useFetch from "./useFetch";
import  "./index.css"


const Productos = () => {
    // la constante producs recibe la info de todos los productos
  const producs = useFetch("https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json");
 
  // creamos un array y pushiamos solo los precios, arranca en 0.
  var array = [0];
  for (let produc of producs){
    array.push(produc.price);  
  }
  // sumamos los precios, El método reduce() ejecuta una función reductora sobre cada elemento de un array, devolviendo como resultado un único valor.

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  var total = array.reduce(reducer);
  return(
    <p> ${total}</p>
  )   
}
  const App = () => (
        <div className="App">
          <header className="App-header">          
            <h1>La suma de todos los precios es: <Productos/> </h1>
          </header>
               
        </div>
      );
export default App;
