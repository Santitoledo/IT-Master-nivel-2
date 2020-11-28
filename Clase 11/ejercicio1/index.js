//npm install --save express express-session body-parser
var express = require('express');
const nunjucks = require('nunjucks');
app = express();
app.use(express.static('public'));
// Incorporamos exress session
session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
//https://www.npmjs.com/package/express-session
//https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Set-Cookie
//http://expressjs.com/en/resources/middleware/cookie-session.html

app.use(session({
    secret: process.env.key || 'string-supersecreto-nunca-visto-jamas-jamas',
    name: 'sessionId',
    proxy: true,
    resave: true,
    saveUninitialized: true ,
    cookie: { maxAge:  60 * 1000 }  
}));
 
//cookie: { maxAge:  24 * 60 * 60 * 1000 }  1 día

// Authentication and Authorization Middleware
var auth1 = function(req, res, next) {
    if (req.session && req.session.level)
    return next();
  else
	return res.status(401).send("No has sido autorizado, amigo. O tu sesion expiró.</br><a href='/'>Home</a>");
};
var auth2 = function(req, res, next) {
    if (req.session && req.session.administrador)
    return next();
  else
	return res.status(401).send("No has sido autorizado, amigo. O tu sesion expiró.</br><a href='/'>Home</a>");
};
 
//Index
app.get('/', function(req, res) {    
    res.render('index.html',{titulo:"LOGIN",t1:"Ingrese usuario y password"})
  });
  


// Login endpoint
app.post('/login', function (req, res) {
    var usuarios = [{"user":"vir","password":"1234","nivel":2},{"user":"ines","password":"1111","nivel":1}];
    var userok = false;
    for(usuario of usuarios){
      if(req.body.user === usuario.user && req.body.pass === usuario.password) {
            // Guardo en variables de sesión la información que deseo
            req.session.user = req.body.user;
            req.session.level = usuario.nivel;
            userok = true;
             
          }
    }
    if(userok &&  req.session.level == 2){
        req.session.administrador= true;
        res.status(200).send("<h1>Login con exito!" + req.session.user + "</h1><a href='/pagina1'>Ir a Página 1</a></br><a href='/pagina2'>Ir a Página 2</a></br><a href='/'>Home</a></br><a href='/logout'>Desloguearse</a>")
    }else if(req.session.level == 1){
        res.status(200).send("<h1>Login con exito!" + req.session.user + "</h1><a href='/pagina1'>Ir a Página 1</a></br><a href='/'>Home</a></br><a href='/logout'>Desloguearse</a");    
      }
      else{
        res.status(401).send("No has sido autorizado, amigo. O tu sesion expiró!!! <a href='/'>Home</a>");
      }
});
     
// Logout endpoint, para cerrar la sesión
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("Sesión cerrada! </br><a href='/'>volver</a>");
});
 
// Página 2
app.get('/pagina1', auth1, function (req, res) {
    res.render('pagina1.html',{t2: "admin",admin: req.session.user});
});
app.get('/pagina2', auth2, function (req, res) {
    res.render('pagina2.html',{t2: "admin",admin: req.session.user});
});
 
app.listen(8080);