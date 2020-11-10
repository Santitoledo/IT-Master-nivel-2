const http = require('http');
var request = require("request");
var url = "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json";
// Vamos a guardar los continentes
var Continente = []
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
		request({
		    url: url,
		    json: true
		}, function (error, response, j) {
            if (!error && response.statusCode === 200) {
                // Recorre todo lo que viene del JSON
                for(a of j){
                    
                    // Verifica si el continente de ese país estába en el Array Continente 
                    if (!(Continente.includes(a.continent))){
                        // Si no estaba en el Array Continente  lo agrega para que no queden continentes repetidos
                        Continente.push(a.continent)
                    }
                }   
                
            // Recorremos el array de continentes
            for (c of Continente){
                res.write(`<table border=1>`)    
                res.write(`<thead><tr><th>${c}</th></tr></thead>`)
                // Recorremos el JSON
                for(a of j){
                    // Filtramos x continente para armar cada tabla
                    if (a.continent === c) {
                        res.write(`<tr><td>${a.country}</td></tr>`)
                    }
                }
                res.write(`</table>`)
            }            
            res.end();}
            else{
                res.write("Error");
                res.end();
            }
		})
}).listen(8080);
