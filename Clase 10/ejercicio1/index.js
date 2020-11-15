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

function currentYear (){
    var year = document.forms.year.value;
    const currentDay = new Date();
    const currentY = currentDay.getFullYear();
    if((currentY - year) <= 3){
        return false;
    }else{
        return true;
    }
}

app.get('/', function(req, res) {
    res.render('index.html',{titulo:"VTV", t1:"Debo realizar la VTV?"})    
    });

app.post("/turnos", (req, res) => {
    var patente1 =  req.body.patente;
    var km1 = req.body.km;
    var year1 = req.body.year;
    if(currentYear(year) || req.body.km > 60000){
        res.render('turnos.html',{titulo2: "Turnos",t2:"datos vehículo",patente:patente1,km:km1,year:year1})
    }else{
        res.status(200).send(`<p>NO debe hacer vtv`)
    }

});
app.listen(8080); 