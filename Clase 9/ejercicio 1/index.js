var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var destinos = [{"destino":"Brasil","precio":"500"},{"destino":"Francia","precio":"1200"},{"destino":"Alemania","precio":"1350"},{"destino":"Noruega","precio":"1500"}];


app.get("/", (req, res) => {
    var paises = ''
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
          <input type="number" name="pasajeros">
          <input type="submit" value="Comprar">
        </form>`
        );
        
app.post("/cotizacion", (req, res) => {
    for (d of destinos){
    if (req.body.lugares === d.destino && req.body.pasajeros > 0){
        
        var pasa = req.body.pasajeros>1?"pasajeros ":"pasajero ";
          res.status(200).send(
            `<h2>${req.body.user} tu destino es  ${req.body.lugares}!!! para ${req.body.pasajeros} ${pasa} el valor es  $${req.body.pasajeros * d.precio} </h2>
            <a href="/">Volver</a>
            `
          )}
        else{
            res.status(200).send(`<h3>mínimo 1 pasajero</h3>
            <a href="/">Volver</a>
            `)
        }};
              });
});

app.listen(8080);
