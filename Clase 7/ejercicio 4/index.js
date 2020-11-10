const http = require('http');
var request = require("request");
var url = "https://gist.githubusercontent.com/mariodev12/a923f2b651a005ca3ca7f851141efcbc/raw/39b06a32e4a58fc1fe63c7478a97edccd21138f1/superheroes.json";
// Vamos a guardar los continentes
var editoriales = []
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
                    if (!(editoriales.includes(a.publisher))){
                        // Si no estaba en el Array Continente  lo agrega para que no queden continentes repetidos
                        editoriales.push(a.publisher)
                    }
                }   
            // Recorremos el array de continentes
            
            for (c of editoriales){
                var cantidad = 0;
                res.write(`<table border=1>`)    
                res.write(`<thead><tr><th>${c}</th></tr></thead>`)
                // Recorremos el JSON
                for(a of j){
                    // Filtramos x continente para armar cada tabla
                    if (a.publisher === c) {
                        res.write(`<tr><td>${a.superhero}</td></tr>`)
                        cantidad++;
                    }
                    
                }
                res.write(`<p>la cantidad de heroes son ${cantidad}</p>`)
                res.write(`</table>`)
            }            
            res.end();}
            else{
                res.write("Error");
                res.end();
            }
		})
}).listen(8080);
