var http = require('http');
const titulo= "Nombres"; 
const nombres = ["Andrés", "Carlos", "Liliana", "Soledad","Ana", "Carolina", "Magdalena", "Silvia", "Marcos", "Elena", "Carla","Antonio"];
let nombrescona = ""
let nombresconb = ""
let nombresconc = ""
for(nombre of nombres){
    if (nombre[0].toUpperCase() === "A"){
    nombrescona += `+${nombre}`
    }
    if(nombre[0].toUpperCase() === "B"){
    nombresconb += `+${nombre}`
    }
    if(nombre[0].toUpperCase() === "C"){
    nombresconc += `+${nombre}`
    }
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
    console.log("${nombrescona}")
    console.log("${nombresconb}")
    console.log("${nombresconc}")
    </script>
    
</head>
<body>
    <h1>Ver en consola  ➡ </h1>
</body>
</html>
    	`);
    res.end();
}).listen(8888);
//http://localhost:8888/
