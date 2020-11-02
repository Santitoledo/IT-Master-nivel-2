var http = require('http');
const titulo= "Tabla de posiciones"; 
const equipos =  [
    {"Equipo": "Barcelona", "PG": 22, "PE": 7, "PP": 6, "GF": 49, "GC": 33,},
    {"Equipo": "Getafe", "PG": 14, "PE": 11, "PP": 9, "GF": 42, "GC": 31,},
    {"Equipo": "Real Sociedad", "PG": 15, "PE": 6, "PP": 13, "GF": 51, "GC": 43,},
    {"Equipo": "Atletico Madrid", "PG": 16, "PE": 15, "PP": 4, "GF": 47, "GC": 26,},
    {"Equipo": "Valencia", "PG": 13, "PE": 11, "PP": 11, "GF": 45, "GC": 51,},
    {"Equipo": "Villareal", "PG": 16, "PE": 6, "PP": 12, "GF": 54, "GC": 44,},
    {"Equipo": "Real Madrid", "PG": 23, "PE": 8, "PP": 3, "GF": 62, "GC": 21,},
]


var puntosCampeon = 0;
var campeon = "";

for (let e of equipos){
    console.log(e)
    const puntos = (e.PG*3) + (e.PE)
    console.log(puntos)
    const difgol= (e.GF) - (e.GC)
    console.log(difgol)
    if(puntos>puntosCampeon){
        puntosCampeon = puntos
        campeon = e.Equipo;
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
    
   
    console.log("el campeon es  ${campeon} con ${puntosCampeon} puntos ")
    
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
