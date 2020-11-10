var express = require('express');
var	app = express();
const fetch = require('node-fetch');
// Declaro que existe la ruta /img vinculada a la carpeta img del proyecto
app.use('/img', express.static('img'));
// home: lista de shows
app.get('/', function(req, res){
	fetch('https://www.episodate.com/api/most-popular?page=1')
    .then(response => response.json())
    .then(json => {
        let acumula = '';
        for (let show of json.tv_shows){
            acumula+=`<a href="/show/${show.id}"><li style="color:green;">${show.name}</li></a>`;
        }
        res.status(200).send(`<ul style="list-style: none;font-size:30px;"${acumula}</ul>`)
    })  
});
// contenido de shows
app.get('/show/:id/', function(req, res){
    fetch('https://www.episodate.com/api/show-details?q='+req.params.id)
    .then(response => response.json())
    .then(json => {
        let generos = '';
        for (let genero of json.tvShow.genres) {
            generos+=`<li>${genero}</li>` 
            
        }
      
        /*let picture = '';
        for (let pic of json.tvShow.pictures){
            picture+=`<li>${pic}<li>`
        }*/
        res.status(200).send(`
                <h1>${json.tvShow.name}</h1>
                <div><img src=${json.tvShow.image_thumbnail_path}></div>
                <p>Descripcion: ${json.tvShow.description}</p>
                <h2>Cadena: ${json.tvShow.network} </h2>
                <p>Pais: ${json.tvShow.country}</p>
                <p>Rating: ${json.tvShow.rating}</p>
                <ul>Generos: ${generos}</ul>
                <p><a href="${json.tvShow.description_source}">Wikipedia</a></p>
                <p><a href="${json.tvShow.url}">Mas info</a></p>
                <div><img src=${json.tvShow.pictures[0]}></div>
                <div><img src=${json.tvShow.pictures[1]}></div>
                <div><img src=${json.tvShow.pictures[2]}></div>`
                
                        );        
    })     
 });

app.listen(8080, function(){
	console.log("Iniciado");
});
