var http = require('http');
const titulo= "Nombres"; 
const nombres = ["Ines","Carlos","Marcelo","Vera","Rafael"];
let nombreshtml = ""
for(nombre of nombres){
    nombreshtml += `*${nombre}`
}

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${titulo}</title>
    <script>
    console.log("${nombreshtml}")
    </script>
    
</head>
<body>
    <h1>Ver en consola  ➡ </h1>
</body>
</html>
    	`);
    res.end();
}).listen(8888);
