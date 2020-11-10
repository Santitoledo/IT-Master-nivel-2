const http = require('http');
var request = require("request");

var url = "https://raw.githubusercontent.com/dweinberger/Oscars.JSON/master/oscars.json.2016/oscars2016.json";
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
		request({
		    url: url,
		    json: true
		}, function (error, response, data) {
            // Creamos el array vacío de títulos
            
            var titulos = [];            
                if (!error && response.statusCode === 200) {                    
                    // Recorremos el array de nominations que quedó en la variable data que viene del JSON
                    for ( i in data.nominations ){  
                        //console.log((Object.values(data.nominations[i].category))[1])  
                        // Verificamos si esamos pasando x Best Picture                
                        if ( (Object.values(data.nominations[i].category))[0] == 'Best Picture' ){
                            for ( t in (Object.values(data.nominations[i].category))[1] ){
                                // Push en el array de titulos
                                titulos.push( Object.values(((Object.values(data.nominations[i].category))[1])[t]) );
                            }
                        }
                    }
                    
                }else{
                    res.write("Error");
                    
                }
            
            //Recorremos el array de títulos 
            for (let titulo of titulos){
                //Mostramos los titulos
                res.write(`${titulo} <br>`);
                
                
            }            
            //Cerramos y mostramos la fecha de la ceremonia
            res.end(`Fecha: ${data.awards_date}`);
            
		   
		})
}).listen(8080);
