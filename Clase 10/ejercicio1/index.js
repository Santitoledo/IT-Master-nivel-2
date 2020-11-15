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
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    res.render('index.html',{titulo:"VTV", t1:"Debo realizar la VTV?"})    
    });

app.post("/turnos", function(req, res){
    var patente1 =  req.body.patente;
    var km1 = req.body.km;
    var year1 = req.body.year;
    var currentDay = new Date();
    var currentY = currentDay.getFullYear();
    
    
 res.render('turnos.html',{titulo2: "Turnos",t2:"Datos vehículo",patente:patente1,km:km1,year:year1,currentY:currentY})
    
});
app.listen(8080); 