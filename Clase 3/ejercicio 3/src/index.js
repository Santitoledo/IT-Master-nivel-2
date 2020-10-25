import React, { useState,useEffect,useRef }  from "react";
import ReactDOM from "react-dom";


const App = () =>{ 
const [tipoCambio, SetCambio] = useState();
const [Cambiando, SetCambiando] = useState();
const [tipoCambio2, SetCambio2] = useState();
const Valor = useRef();
const Valor2 = useRef();
const Cambiar = useRef();
//armamos la funcion que irá en un boton
const Acambiar= ()=>{SetCambiando(Cambiar.current.value);SetCambio(Valor.current.value);SetCambio2(Valor2.current.value);document.getElementById("form").reset();};
  // creamos hook useState para el resultado final con estado inicial []
  const Calculo =() =>{
  const[users,setUsers]=useState([]);
  //buscamos la data en la api (json)
  function getUsers() {
    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
      .then(response => response.json())
      .then(users => {setUsers(users)})
      .catch(err => console.log(err.message))
  }
  useEffect(()=>{
    getUsers()
  },[])
  //hacemos mapeo buscando el dato en la api que queremos, (dolar oficial y dolar blue), y usamoms condicionales (if) para identificar la opcion que se eligió. 
  //Se usa replace para modificar el json,así toma la cuenta.
  //multiplicamos el valor ingresado en (cambiando) * el valor obtenido desde la api co.casa.venta. 
  return (  
    <>
    {users.map( (co, i)=>{
      if (co.casa.nombre === 'Dolar Oficial' && parseInt(tipoCambio)===1 && parseInt(tipoCambio2)===1 && Cambiando.length >0){
      return (<div key={i}><p>${(parseFloat(Cambiando.replace(',', '.'))*parseFloat(co.casa.venta.replace(',', '.'))).toFixed(2)} <br/><span>"Al Valor de Venta del Banco"</span></p><p>${(parseFloat(Cambiando)*parseFloat(co.casa.compra.replace(',', '.'))).toFixed(2)} <br/><span>"Al Valor de Compra del Banco"</span></p></div>)}
    
      if (co.casa.nombre === 'Dolar Oficial' && parseInt(tipoCambio)===1 && parseInt(tipoCambio2)===2 && Cambiando.length >0){
        return (<p>U$S{(parseFloat(Cambiando.replace(',', '.'))/parseFloat(co.casa.venta.replace(',', '.'))).toFixed(2)} </p>)}
    
      if (co.casa.nombre === 'Dolar Blue' && parseInt(tipoCambio)===2 && parseInt(tipoCambio2)===1 && Cambiando.length >0){
          return (<><p>${(parseFloat(Cambiando.replace(',', '.'))*parseFloat(co.casa.venta.replace(',', '.'))).toFixed(2)}<br/><span>"Al Valor de Venta del Banco"</span></p><p>${(parseFloat(Cambiando)*parseFloat(co.casa.compra.replace(',', '.'))).toFixed(2)} <br/><span>"Al Valor de Compra del Banco"</span></p></>)}
        
      if (co.casa.nombre === 'Dolar Blue' && parseInt(tipoCambio)===2 && parseInt(tipoCambio2)===2 && Cambiando.length >0){
            return (<p>U$S{(parseFloat(Cambiando.replace(',', '.'))/parseFloat(co.casa.venta.replace(',', '.'))).toFixed(2)} </p>)}
    })}
    </> 
)
};
return(
<div id='contenedor'>
<h1>Cuanto vale su plata?</h1>
<form id="form">
<label>Ingrese el monto a calcular:</label>
<input type="text" name="" id="" ref={Cambiar} placeholder='Monto...'/> 
<label> Elija el Valor del tipo de cambio de referencia:</label>
<select id="" ref={Valor}>
<option value="0">Elegir...</option>
<option value="1">Dolar Oficial</option>
<option value="2">Dolar Blue</option>  
</select>
<label> Elija la moneda que quiere cambiar:</label>
<select id="" ref={Valor2}>
<option value="0">Elegir...</option>
<option value="1">Dolares a pesos</option>
<option value="2">Pesos a dolares</option>  
</select>
<input type="button" value="Valor" onClick={Acambiar}/> 
</form>
<Calculo/>
</div>
)};

const rootElement = document.getElementById("root");
ReactDOM.render(
<App />,
rootElement
);
