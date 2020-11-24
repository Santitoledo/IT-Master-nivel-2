// npm install --save express mongodb
const express = require('express');
const	app = express();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017/TV';

app.get('/', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("TV");  
    var r = "";
    //dbo.collection("personajesdark").find({"edad":20}).forEach((data) => {   		
    dbo.collection("Series").find().forEach((data) => {   		
            
            r += `<a href="porserie/${data.título}"><li>${data.título}</li></a>`;  		
        }, ()=>{  	
          res.send("<header><h1>Series</h1></header><ul>" + r + "</ul>");			
      });
  });	
  });	

  app.get('/porserie/:id', (req, res)=>{	  
    MongoClient.connect(MONGO_URL,{ useUnifiedTopology: true }, (err, db) => {  
    const dbo = db.db("TV");  
    var id =  parseInt(req.params.id);
    
    dbo.collection("Series").findOne({"id":id}, function(err, data) {
        if (err) throw err; 
        if(data){
            
            res.send(`<h2>El título es:${data.título}, protagonizado por ${data.protagonista}, su lanzamiento fue en ${data.year}, realizada en ${data.país}</h2>`);
        }
        else{
            res.send("No encontrado");
            console.log(id);
        }
        
        db.close();
        });
      });
  });	
app.listen(8080);