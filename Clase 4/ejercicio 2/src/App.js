import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useParams } from 'react-router-dom'
//Home
const Libros = () => {
  const [libros, setLibros] = useState([])
  const getLibros = () => {
    fetch('https://raw.githubusercontent.com/bvaughn/infinite-list-reflow-examples/master/books.json')
      .then(response => response.json())
      .then(libros => setLibros(libros))
      .catch(errores => console.log(errores))
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getLibros()
  }, [])
  //Listamos todos los libros en la home
  return(
    <ul>      
      { libros.map((libro,i) => <li key={i}><Link to={'/libro/'+libro.isbn}> {libro.title}</Link></li>) }
    </ul>
  )
}
// Ruta individual de los libros /libro/:isbn
const Libro = () => {
  const [libro, setLibro] = useState([]);
  const parametros = useParams();
  const getLibro = () => {
    fetch('https://raw.githubusercontent.com/bvaughn/infinite-list-reflow-examples/master/books.json')
      .then(response => response.json())
      .then(libro => setLibro(libro))
      .catch(errores => console.log(errores))
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getLibro()
  }, [])
  // Filtramos sobre el estado que tiene todos los libros y obtenemos el libro por el isbn
  return(
    <>   
        { libro.filter((libro) => libro.isbn === parametros.isbn).map((libro,i) => 
        <article key={i}>
         <h4>Titulo: {libro.title}</h4> 
         <p>ISBN: {libro.isbn}</p>
         <p>Paginas: {libro.pageCount}</p>
         <img src={libro.thumbnailUrl} alt="cover"></img><br/>
         <p>Categorias: 
            <ul>
                {libro.categories.map((cat,i) =><li key={i}>{cat}</li>) }
             </ul>
        </p>
         <div>Autores: 
             <ul>
                {libro.authors.map((autor,i) =><li key={i}>{autor}</li>) }
             </ul>
        </div>
         <p>Descripcion: {libro.longDescription}</p>
        </article>        
        )}
      <Link to='/'>Home</Link>
      </>
  )
}
const App = () => (
    <div className="App">
      <header className="App-header">          
        <h1 className="App-title">Libros</h1>
      </header>
      <Switch>
        <Route exact path="/"><Libros/></Route>
        <Route path="/libro/:isbn"><Libro/></Route>
      </Switch>        
    </div>
  );
  export default App;
