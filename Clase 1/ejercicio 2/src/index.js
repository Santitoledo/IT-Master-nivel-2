  
import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import './index.scss'

const Style={
  margintop: '5%'
}

const App = () =>{
  const textName = useRef();
  const [name,setName] = useState();
  const Mostrar = () =>{
    setName(textName.current.value)
  }
  return(
    <div id="contain" style={Style}>
      <form action="" style={Style}>
        <input type="text" style={Style} ref={textName} onChange={Mostrar} placeholder="Escriba el texto..."/>
      </form>
      <div id="box">
          {name && name.length <= 20 ? <p>Su texto: {name}</p>:null}
          {name && name.length>20?<p id="error">Pasaste los 20 caracteres!!!</p>:null}
      </div>

    </div>
  )
}
  ReactDOM.render(<App />,document.getElementById('root'));
