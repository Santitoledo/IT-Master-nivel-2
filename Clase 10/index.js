const express = require('express');
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');
// Inicializamos express
const app = express();
// Declaramos public
app.use(express.static('public'));

// Declaramos la carpeta de las vistas de Nunjucks
nunjucks.configure('views', {
    autoescape: false,
    express: app
});

app.get('/', function(req, res) {    
    fetch('https://www.googleapis.com/books/v1/volumes?q=node.js')
    .then(response => response.json())
    .then(libros => res.render('index.html',{titulo: "Los Libros",th1 : "Libros", libros:libros}))
});
app.get('/libro/:id', function(req, res) {
    fetch('https://www.googleapis.com/books/v1/volumes/'+req.params.id)
    .then(response => response.json())
    .then(libro => res.render('libro.html', {libro:libro}))
});

app.listen(8080);