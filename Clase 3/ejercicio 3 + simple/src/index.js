import React,{useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

const Dolar = () =>{
  const [compra, setCompra] = useState("")
  const [venta, setVenta] = useState("")
  const [montoFinal, setMontoF] = useState("")
  const dolarRef = useRef()
  const selectRef = useRef()

  const convertir  = () => {
    var oper = parseInt(selectRef.current.value)
    var monto = parseInt(dolarRef.current.value) 
    if (oper === 1){
      setMontoF((monto / venta).toFixed(2))
    }
    
    if (oper === 2){
      setMontoF((monto * compra).toFixed(2))
    }
  }
  
  useEffect( () => {
    const dolar_hoy =() =>{
      fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
      .then (turn => turn.json())
      .then (dolar =>{
        setCompra(dolar[0].casa.compra.replace(",","."))
        setVenta(dolar[0].casa.venta.replace(",","."))
      })
    }
    dolar_hoy();
  }, [compra, venta])

  return(
    <div>
      <h1>Conversión Peso / Dólar - Dólar - Pesos</h1>
      <input type="number" min={1} placeholder="Ingrese un monto" ref={dolarRef}/>
      <select ref={selectRef}>
        <option value={0}>Elegir</option>
        <option value={1}>Pesos - Dolar</option>
        <option value={2}>Dolar - Pesos</option>
      </select>      
      <input type="button" value="Convertir" onClick={convertir} />      
      <p>{montoFinal.replace(".",",")}</p>  
      <p>Cotización compra: {compra.replace(".",",")}</p>  
      <p>Cotización venta: {venta.replace(".",",")}</p>  
    </div>
  )
}

ReactDOM.render(<Dolar/>, document.getElementById('root'));
