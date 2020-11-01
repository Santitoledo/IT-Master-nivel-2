var http = require('http');
const titulo= "Notas"; 
const notas = [{"Pedro":{"Matematica": 10,"Geografia": 6,"Historia": 9}},{"Juana":{"Matematica": 5,"Geografia": 10,"Historia": 7}}]


const alumno = Object.keys(notas[0])
const materias = Object.values(notas[0].Pedro)
var suma = 0;

    materias.forEach (function(materia){
        suma += materia;
    });

// console.log(materias)
// console.log(alumno)    
    
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
    console.log("El promedio de ${alumno} es ${(suma/materias.length).toFixed(2)}")
    
    </script>
    <style>
     h1{
        text-align: center;
        font-family: monospace;
        font-size: 60px;
     }
    </style>
    
</head>
<body>
    <h1>Ver en consola  ➡ </h1>
</body>
</html>
    	`);
    res.end();
}).listen(8888);
//http://localhost:8888/
