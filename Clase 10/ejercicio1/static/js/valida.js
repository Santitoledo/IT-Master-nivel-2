// Script client side  
let conjunto = ["AAA-123","AAC-823","AA-134-CC"];
var pat1 = /^[a-z-A-Z]{3}[-][0-9]{3}$/;
var pat2= /^[a-z-A-Z]{2}[-][0-9]{3}[-][a-z-A-Z]{2}$/;

function validar() {            
    var patente = document.formu.patente.value;
    
    if ( pat1.test(patente) ||  pat2.test(patente)) {

        if (conjunto.includes(req.body.patente)){
            document.getElementById('deu').innerHTML = 'patente con deuda'
        }else{
            // usando el name del formulario y el método submit
            document.formu.submit();
        }
    } 
    else{
        alert("NO Es el formato");
    }
   
}
