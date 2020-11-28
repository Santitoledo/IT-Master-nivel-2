var express = require('express'),
app = express(),
session = require('express-session');
const nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'string-supersecreto-nuncavisto-jamas',
    name: 'sessionId',
    proxy: true,
    resave: true,
    saveUninitialized: true ,
    cookie: { maxAge:  60 * 60 * 1000 }  
}));
const path = require('path');
app.use('/public', express.static(path.join(__dirname + '/public')));

nunjucks.configure(path.join(__dirname + '/views/'), {
    autoescape: false,
    express: app
  }); 

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017/restapi';


var auth = function(req, res, next) {
  if (req.session.login)
    return next();
  else
	return res.status(401).send("No has sido autorizado, amigo. O tu sesion expiró.");
};
 
//Index
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/');
});


// Login endpoint
app.all('/login', function (req, res) {
  if (!req.body.user || !req.body.pass) {
    res.status(404).send('Login failed');    
  } else {

    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
        const dbo = db.db("restapi");  
        dbo.collection("usuarios").findOne({$and:[{"user":req.body.user},{"pass":req.body.pass}]},function(err, data) {             
            //console.log(data); 
            if(data){
                req.session.admin = true;  
                req.session.name = data.name;               
                res.status(200).render('add.html',);  
            }
            else{
              res.status(401).send(`You are not authorized <p><a href="/">Return home</a></p>`);
            } 
          })
        });
      }
    });

 
    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.render('logout.html', )
      });
 

app.post('/add', (req, res)=>{
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("libros ")
    // key de la base datos : req.body.name_campo_formulario
    dbo.collection("libros ").insertOne(
        {   
            isbm: parseInt(req.body.isbm),
            title: req.body.title,
            author: req.body.author,
            Year:req.body.Year,
            country: req.body.country,
            editorial: req.body.editorial
            
        },
        function (err, res) {
            if (err) {
            db.close();
            return console.log(err);
            }
            db.close()
        })
        res.status(200).send('<p>Book added successfully</p><p><a href="/add">Add book</a></p><p><a href="/">Return home</a></p>')
    })
}) 
app.listen(8080);