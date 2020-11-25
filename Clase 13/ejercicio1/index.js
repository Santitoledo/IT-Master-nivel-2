var express = require('express');
//const nunjucks = require('nunjucks');
var	app = express();

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017/menu';

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*nunjucks.configure('views', {
    autoescape: true,
    express: app
  });*/

app.get('/', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("menu");  
    var r = "";
    dbo.collection("Platos de comida").find().forEach((data) => {   		
            r += `<li><a href="/plato/${data.id}">${data.name}</a></li>`; 		
        }, ()=>{  	
          res.send("<header><h1>Menu</h1></header><ul>" + r + "</ul><p><a href='/agregar'>Agregar platos</a></p><p><a href='/agregarCat'>Agregar categorias</a></p>");			
      });
  });	
  });	


  app.get('/plato/:id', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("menu"); 
    var id = parseInt(req.params.id);     
    dbo.collection("Platos de comida").findOne({"id":id},function(err, data) {   	
	    if (data){     
            res.status(200).send(`
            <header><h1>Plato</h1></header>           
            <div>
            <h1>${data.name}</h1>
            <img src=${data.img}>
            </div>            
            <p><a href='/'>Regresar a la home</a></p>
            `);	
        }else{
            res.status(404).send(`<p>ERROR</p>`)

        }    		
      });
  });	
  });	
  app.get('/categoria/:id', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("menu"); 
    var id = parseInt(req.params.id);     
    dbo.collection("Categorias").findOne({"id":id},function(err, data) {   	
	    if (data){     
            res.status(200).send(`
            <header><h1>Categorias</h1></header>           
            <div>
            <h1>${data.categoria}</h1>
            </div>            
            <p><a href='/'>Regresar a la home</a></p>
            `);	
        }else{
            res.status(404).send(`<p>ERROR</p>`)

        }    		
      });
  });	
  });

// Mostramos el formulario
app.get('/agregar', (req, res)=> {
    res.sendFile(__dirname + '/agregar.html')
})
app.get('/agregarCat', (req, res)=> {
    res.sendFile(__dirname + '/agregarCat.html')
})


// Recibimos la información del formulario
app.post('/alta', (req, res)=>{
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("menu")
    // key de la base datos : req.body.name_campo_formulario
    dbo.collection("Platos de comida").insertOne(
        {   
            id: parseInt(req.body.id),
            name: req.body.name,
            img: req.body.imagen,
            descripción:req.body.descrip,
            categoria: req.body.categoria
            
        },
        function (err, res) {
            if (err) {
            db.close();
            return console.log(err);
            }
            db.close()
        })
        res.send('<p>Plato agregado exitosamente</p><p><a href="/agregar">Agregar plato</a></p><p><a href="/">Regresar a Inicio</a></p>')
    })
}) 
app.post('/altacat', (req, res)=>{
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("menu")
    // key de la base datos : req.body.name_campo_formulario
    dbo.collection("Categorias").insertOne(
        {   
            categoria : req.body.categoria
            
        },
        function (err, res) {
            if (err) {
            db.close();
            return console.log(err);
            }
            db.close()
        })
        res.send('<p>Categoria agregada exitosamente</p><p><a href="/agregarCat">Agregas otra categoria</a></p><p><a href="/">Regresar a Inicio</a></p>')
    })
})
app.listen(8080);