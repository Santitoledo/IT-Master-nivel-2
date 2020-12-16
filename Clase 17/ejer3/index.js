var express = require('express');
var	app = express();
//https://www.npmjs.com/package/is-mobile is-mobile@1.0.0
const mobile = require('is-mobile');

app.use("/mobile", express.static('mobile'));
app.use("/desktop", express.static('desktop'));
app.use("/js", express.static('js'));
nunjucks.configure('views', {
    autoescape: false,
    express: app
});
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

	app.get('/', function(req, res){
			console.log(mobile(req))
			if(mobile(req)){
				res.render(__dirname + '/mobile/index.html');
			
            }else{		
				res.render(__dirname + '/desktop/index.html');
			}

	});

	app.listen(8888, function(){
		console.log("Escuchando en el puerto 8888");
	});