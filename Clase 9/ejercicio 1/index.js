var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var destinos = [{"destino":"Brasil","precio":"500"},{"destino":"Francia","precio":"1200"},{"destino":"Alemania","precio":"1350"},{"destino":"Noruega","precio":"1500"}];

// Home
app.get("/", (req, res) => {
    var paises = ''
    // Recorremos el array de destinos y los ubicamos en un acumula para los option del select
    for (d of destinos){
         paises += `<option value="${d.destino}">${d.destino}</option>`
        }
    res.status(200).send(
          `<form method="post" action="/cotizacion">      
          <input type="text" name="user" placeholder="ingrese pasajero" >
          <br>
          <select name="lugares">
          <option value="">Elegir 🌎</option>
          ${paises}
          </select>
          <br>
          <input type="number" name="pasajeros" min="1" value="1" max="10">
          <input type="submit" value="Comprar">
        </form>`)
    });

// Cotizacion        
app.post("/cotizacion", (req, res) => {
    // Inicializamos precio en 0
    var precio = 0;
    // Recorremos los destinos
    for (d of destinos){
            // Si encuentra el destino que eligió el usuario asigna el precio del destino
            if(req.body.lugares == d.destino){
                var precio = d.precio;
            }
        }
        // SI es > 0 el precio es que encontré el país
        if(precio > 0){
            var pasa = req.body.pasajeros>1?"pasajeros ":"pasajero ";
            res.status(200).send(
                `<h2>${req.body.user} tu destino es  ${req.body.lugares}!!! para ${req.body.pasajeros} ${pasa} el valor es  $${req.body.pasajeros * precio} </h2>
                <a href="/">Volver</a>
                `
            )
         }
         else{
            res.status(200).send("<h1>Error</h1>");
         }

});
app.listen(8080);