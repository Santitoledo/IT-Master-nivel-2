// Script client side  
let conjunto = ["AAA-123","AAC-823","AA-134-CC"];
var pat1 = /^[a-z-A-Z]{3}[-][0-9]{3}$/;
var pat2= /^[a-z-A-Z]{2}[-][0-9]{3}[-][a-z-A-Z]{2}$/;

function validar() {            
    var patente = document.formu.patente.value;
    
    console.log(patente);
    
    if ( pat1.test(patente) ||  pat2.test(patente)) {

        if (conjunto.includes(patente)){
             swal("Patente Morosa!!");
        }else{
            // usando el name del formulario y el método submit
            document.formu.submit();
        }
    } 
    else{
        alert("NO Es el formato: aaa-111 o aa-111-aa");
    }
   
}
