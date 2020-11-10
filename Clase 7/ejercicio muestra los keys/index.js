var http = require('http');
var request = require("request");
var url = "https://jsonplaceholder.typicode.com/users/1";

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
		request({
		    url: url,
		    json: true
		}, function (error, response, persona) {

		    if (!error && response.statusCode === 200) {
            let acumula = ''
            // Recorremos el primer nivel
			Object.keys(persona).forEach(function(key) {
                    // Si no es un object / JSON anidado
					if(typeof persona[key] != 'object'){
						acumula+= key + ': ' + persona[key] + "<br>"
					}
					else{
						Object.keys(persona[key]).forEach(function(key2) {
							if(typeof persona[key][key2] != 'object'){
								acumula+= key2 + ': ' + persona[key][key2] + "<br>"
							}
							else{
								Object.keys(persona[key][key2]).forEach(function(key3) {
									if(typeof persona[key][key2][key3] != 'object'){
										acumula+= key3 + ': ' + persona[key][key2][key3] + "<br>"
									}
								})
							}
						})
					}
					
				})
						
				res.write(acumula)			
		        res.end();
		    }
		})
}).listen(8080);
