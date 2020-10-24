import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';

const  App = () => {
  const [user, setUser] = useState([])
  
const getUser =() =>{
  fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {setUser(data);})
        .catch(err => console.log(err.message))
}
  useEffect(() => { 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  getUser()
}, [])

return (  
<section style={{color:'red'}}>
{user.filter(usuario=> usuario.name[0]==='C').map((usuario,i) => 
<>
  <h4 key={i}>Nombre: {usuario.name}</h4>
  <h4>Email: {usuario.email}</h4>
  <h4>Web: {usuario.website}</h4> 
  <h4>Nombre de la Compañia: {usuario.company.name} </h4>
  <h4>Eslogan: {usuario.company.catchPhrase} </h4>
  <br/>
</>)
}
</section>
)
};


ReactDOM.render(<App />,document.getElementById('root'));
