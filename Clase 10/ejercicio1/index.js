const express = require('express');
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');
app.use(express.static('public'));

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
    var i = '';
    var meses = ["Octubre","Noviembre","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre"]
    //console.log(patente1);
    //console.log(patente1.length);

    if(patente1.length === 7){
        i = parseFloat(patente1[patente1.length-1])
    }else if(patente1.length === 9){
        i = parseFloat(patente1[patente1.length-4])
    }
    //console.log(i);
 res.render('turnos.html',{titulo2: "Turnos",t2:"Datos vehículo",patente:patente1,km:km1,year:year1,currentY:currentY,meses:meses[i]})
    
});
app.listen(8080); 