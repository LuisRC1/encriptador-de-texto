let count = 0;

function asignarTextoElemento(elementoHTML, texto) {
    let mensajeAlerta = document.querySelector(elementoHTML);
    mensajeAlerta.innerHTML = texto;
    return;
}

function caracteresNoPermitidos(event) {
   // Expresión regular que solo permite letras minúsculas y números
    let caracterPermitido = /^[a-zñ0-9 !\t\r\n]+$/;

   // Obtiene el carácter presionado usando event
    let caracterPresionado = String.fromCharCode(event.which || event.keyCode);

   // Permite ingresar una letra minúscula o número
    if (!caracterPermitido.test(caracterPresionado)) {
        event.preventDefault(); // Evita que se inserte el carácter en el campo de texto
        let toast = document.querySelector('.miToast');
        toast.style.display = "block";
        setTimeout(function(){ toast.style.display = "none"; }, 3000); // Desaparece después de 3 segundos
    }
}

function eliminarImagen() {
    let eliminarImagen = document.querySelector('.container__contenido__derecha__imagen');
    eliminarImagen.remove();
}

function crearBoton() {
    let newButton = document.createElement("button");
    let textToBoton = document.createTextNode("Copiar");
    newButton.appendChild(textToBoton);
    let element = document.querySelector('.container__contenido__derecha__mensaje');
    element.appendChild(newButton);
    newButton.setAttribute("class", "container__contenido__boton__tres");
    newButton.addEventListener("click",copiarSalida);
}

function copiarSalida() {
    var texto = document.querySelector('.container__contenido__derecha__parrafo').innerText;
    navigator.clipboard.writeText(texto).then(function() {
    }).catch(function(err) {
        console.error("No se pudo copiar el texto: ", err);
    });
}

function eventoClickEncriptar() {
    let inputUsuario = document.querySelector('.container__contenido__input').value.toLowerCase();
    asignarTextoElemento('.container__contenido__mensaje__alerta', '');
    asignarTextoElemento('.container__contenido__mensaje__inicial', '');
    let outputEncriptar = encriptar(inputUsuario);
    while (count < 1) {
        eliminarImagen();
        crearBoton();
        count++;
    }
    asignarTextoElemento('.container__contenido__derecha__parrafo', outputEncriptar);
    limpiarCaja();
    return;
}

function eventoClickDesencriptar() {
    let inputUsuario = document.querySelector('.container__contenido__input').value.toLowerCase();
    asignarTextoElemento('.container__contenido__mensaje__alerta', '');
    asignarTextoElemento('.container__contenido__mensaje__inicial', '');
    let outputDesencriptar = desencriptar(inputUsuario);
    while (count < 1) {
        eliminarImagen();
        crearBoton();
        count++;
    }
    asignarTextoElemento('.container__contenido__derecha__parrafo', outputDesencriptar);
    limpiarCaja();
    return;
}

function limpiarCaja() {
    let valorInput = document.querySelector('.container__contenido__input');
    valorInput.value = '';
}

function encriptar(stringEncriptar) {
    let vowelsEncriptar = ["a", "e", "i", "o", "u"];
    let words = ["ai", "enter", "imes", "ober", "ufat"];
    let myArray = stringEncriptar.split("");
    for (let i = 0; i < stringEncriptar.length; i++) {
        for (let j = 0; j < vowelsEncriptar.length; j++) {
            if (myArray[i] == vowelsEncriptar[j]) {
                myArray[i] = words[j];
            }
        }
    }
    let outputEncriptar = myArray.join("");
    return outputEncriptar;
}

function desencriptar(stringDesencriptar) {
    let searchWord = ["ai", "enter", "imes", "ober", "ufat"];
    let vowelsDesencriptar = ["a", "e", "i", "o", "u"];
    let count = 0;
    for (let i = 0; i < searchWord.length; i++) {
        let myIndex = stringDesencriptar.indexOf(searchWord[i]);
        stringDesencriptar = stringDesencriptar.replace(searchWord[i], vowelsDesencriptar[i]);
        while (myIndex !== -1) {
            count++;
            // Busca desde el siguiente índice
            myIndex = stringDesencriptar.indexOf(searchWord[i], myIndex + 1);
            stringDesencriptar = stringDesencriptar.replace(searchWord[i], vowelsDesencriptar[i]);
        }
    }
    return stringDesencriptar;
}

/***********Llamar funciones y pasar argumentos***********/
// Uso en un campo de texto
document.querySelector('.container__contenido__input').addEventListener("keypress", caracteresNoPermitidos);
asignarTextoElemento('.container__contenido__mensaje__alerta', 'Ningún mensaje fue encontrado');
asignarTextoElemento('.container__contenido__mensaje__inicial', 'Ingresa el texto que desees encriptar o desencriptar.');
