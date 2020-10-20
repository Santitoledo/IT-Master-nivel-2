  
import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import './index.scss'


const App = () =>{
  const textUser = useRef();
  const [text,setText] = useState();
  const Valida = () =>{
    setText(textUser.current.value)
    document.getElementById("formu").reset();
  }
  return(
   <div id="contain">
     <form id="formu">
       <input type="text" ref={textUser} placeholder="Ingrese n°"></input>
       <input type="button" value="validar" onClick={Valida}></input>
     </form>
     <div id="box">
       {text && !isNaN(text)? <p>Es un número</p>:null}
       {text && isNaN(text)?<p id="error">No es un número</p>:null }
       {!isNaN(text)&& text % 1 === 0 ? <p>Es entero</p>: null}
       {!isNaN(text) && text % 1 !==0 ?<p>No es entero</p>:null}
       {!isNaN(text)&& text % 2 === 0 ?<p>Es par </p>:null}
       {!isNaN(text)&& text % 2 !== 0 ?<p>No es par</p>:null}
       {!isNaN(text) && text > 0?<p>Es positivo</p>:null}
       {!isNaN(text) && text < 0?<p>Es negativo</p>:null}
       {!isNaN(text) && text == 0?<p>Es cero</p>:null}


     </div>
   </div> 
  )
 
}
  ReactDOM.render(<App />,document.getElementById('root'));
