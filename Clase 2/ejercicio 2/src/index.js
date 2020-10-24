import React, {useState,useRef } from "react";
import ReactDOM from 'react-dom';

const Componente = () => {
   const ingresado = useRef()
   const elegido = useRef()
   
   const [resultado,setResult] = useState();
  
  const convertir = () => {     
     if(ingresado.current.value>=0){
       if(elegido.current.value!=="0"){
         let operacion = ((ingresado.current.value)/elegido.current.value).toFixed(2)
         setResult(operacion)
        }
       else{
         setResult("Elija una opción válida")
       }
     }
    else{
        setResult("Ingrese un número positivo")
    }
  }
  
  return(
    <div id="Contenedor">
      <header><h1>Conversión de Criptomonedas</h1></header>
      <form>
        <label>USD : </label>
        <input type="number" placeholder="Ingrese su importe en Dólares" ref={ingresado}/>
        <select ref={elegido}>
          <option value="0">Elegir...</option>
          <option value="5">Coins 1</option>
          <option value="21">Coins 2</option>
          <option value="120">Supercoins</option>
        </select>
        <input type="button" onClick={convertir} value="Convertir" className="btn btn-dark"/>
      </form>
      {resultado && !isNaN(resultado)?<p>Resultado: {resultado} Coins</p>:null}
      {resultado && isNaN(resultado)? <p>No se puede realizar el cálculo</p>:null}
    </div>
  )
} 
ReactDOM.render(<Componente/>, document.getElementById('root'));
