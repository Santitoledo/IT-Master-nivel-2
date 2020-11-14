// Script client side   
function validar() {            
    var patente = document.formu.patente.value;
    //Validamos patente básica agregar la otra opción de validación con ||
     // Validar también que todos los campos estén completos
    if ( /^[A-Z]{3}[-]\d{3}$/.test(patente)|| /^[A-Z]{2}[-]\d{3}[-]$/.test(patente)){
            // usando el name del formulario y el método submit
            document.formu.submit();
        }
    else{
        alert("NO Es el formato");
    }
   
}