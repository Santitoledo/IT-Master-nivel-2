var express = require('express');
const nunjucks = require('nunjucks');
var	app = express();

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017/menu';

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

nunjucks.configure('views', {
    autoescape: true,
    express: app
  });

  app.get('/', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("menu"); 
    var data = [];   
    dbo.collection("Platos").find().toArray()
    .then((dataplatos) => { 
  // en data[0] quedan los platos
      data.push(dataplatos)
    }) 
    .then(() => {
      dbo.collection("Categorias").find().toArray()
      .then((datacategorias) => { 
  // en data[1] quedan los categorias
        data.push(datacategorias)      
        res.render('index.html',{data:data});
      }) 
    })
  });
  });

  app.get('/plato/:id', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("menu"); 
    var id = parseInt(req.params.id);     
    dbo.collection("Platos").findOne({"id":id},function(err, data) {   	
	    if (data){     
            res.status(200).render('platos.html',{name:data.name,img:data.img,descrip:data.descripción,categoria:data.categoria}
            );	
        }else{
            res.status(404).send(`<p>ERROR</p>`)

        }    		
      });
  });	
  });	

  // Trae los platos de la categoria que recibe como parámetro
 app.get('/categoria/:cat', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
        const dbo = db.db("menu");         
        dbo.collection("Platos").find({"categoria":req.params.cat}).toArray()
          .then((data) => {      
            res.render('categorias.html',{data:data});
          }) 
        })
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
    dbo.collection("Platos").insertOne(
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
            categoria : req.body.categoria,
            id: req.body.id
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