let textOriginal = [];
let reg = /^[a-zA-Z0-9\,\.\-\_\:\;\s\b]{1,1000}$/gi;

//VALIDACION DE REGEX
let input = document.getElementById("textinfo")
input.addEventListener("keyup",(e) =>{
    e.target.value.match(reg)?actualizarText():errorText()
})
 
//BLOQUEAR BOTONES Y SACAR TEXTO POR ERROR
function errorText(){
    document.getElementById("error").style = 'display:none';
    document.getElementById("msjError").style = 'display:block';
    document.getElementById("encriptar").style = 'display:none';
    document.getElementById("desencriptar").style = 'display:none';
}

function botonReinicio(){
    let reinicio = document.getElementById("reinicio");
    reinicio.addEventListener("click",()=>{location.reload();});
}

//funcion que captura en tiempo real el texto de entrada del text area con funcion onkeyup
function actualizarText(){
    let textEntrada = document.getElementById("textinfo").value;
    document.getElementById("espera").style = 'display:none';
    document.getElementById("resultado").style = 'display:block';
    textOriginal.push(textEntrada)
    //Esto nos ayuda por medio de regex a sustituir caracteres//
    let textVocal = textEntrada.replaceAll(/[aiu]/gi,"*");
    let textVocal2 = textVocal.replaceAll(/[eo]/gi,"@");
    let textCons = textVocal2.replaceAll(/[bdlm]/gi,"$");
    let textCons2 = textCons.replaceAll(/[cfgn]/gi,"&");
    let textNums = textCons2.replaceAll(/[13579]/gi,"!")
    let textNums2= textNums.replaceAll(/[2468]/gi,"?")
    //Este hace un reverse para mostrar al reves la palabra//
    document.getElementById("encriptar").style = 'display:block';
    document.getElementById("desencriptar").style = 'display:block';
    return textNums2.split("").reverse().join("");
    }

function botonEncriptar(){
    let textoFinal = actualizarText()
    //Anexa con inner el texto al textarea
    document.getElementById("textencriptado").innerHTML = textoFinal;
    //cambia el valor del textarea
    document.getElementById("textinfo").value = textoFinal;
    document.getElementById("textinfo").innerHTML = textoFinal;
    document.getElementById("espera").style = 'display:none';
    document.getElementById("resultado").style = 'display:block';
}

function botonDesencriptar(){
    //Nos muestra el elemento completo escrito almacenado en el ultimo index//
    let textEntrada = textOriginal[textOriginal.length - 1];
    console.log(textEntrada)
    document.getElementById("textencriptado").innerHTML = textEntrada;
    document.getElementById("textinfo").value = textEntrada;
    document.getElementById("textinfo").innerHTML = textEntrada;
    document.getElementById("espera").style = 'display:none';
    document.getElementById("resultado").style = 'display:block';
}

function botonCopiar(){
    //Estamos seleccionando el contenido del textarea
    let copiar = document.getElementById("textencriptado").textContent
    //Lo estamos conectando para copiar texto
    navigator.clipboard.writeText(copiar);
    //Estamos cambiando la propiedad display de el elemento
    document.getElementById("parrafo-msj").style = 'display:block';
}



//Anexa un elemento dinamicamente desde js al dom aun div vacio con el id "parrafo-msj" y le asigna al parrafo un id"parraf"
// document.getElementById("parrafo-msj").innerHTML += `<p {id="parraf">El texto fue copiado</p>`

