/** 
 * @author Cristian Manuel Alcobendas Beorlegui
 * @version 1.0
 * */

// === MODO ESTRICTO === //
"use strict";

// === VARIABLES Y ELEMENTOS HTML === //
// * Elementos del formulario
const formRegistro = document.forms["registro"];
const textNombre = formRegistro["nombre"];
const textApellido = formRegistro["apellido"];
const emailCorreo = formRegistro["correo"];
const telTelefono = formRegistro["telefono"];
const buttonValidarDatos = formRegistro["validarDatos"];
// * Elementos que hacen referencia al estado de validez de un campo de formulario.
const estadoNombre = document.getElementById("estadoNombre");
const estadoApellido = document.getElementById("estadoApellido");
const estadoCorreo = document.getElementById("estadoCorreo");
const estadoTelefono = document.getElementById("estadoTelefono");
// * Expresiones regulares para validar los formatos de los campos del formulario.
const regexCorreo = /^[a-zA-Z0-9._-]+@{1}[a-zA-Z0-9._-]+\.{1}[a-zA-Z]+$/i;
const regexTelefono = /^([0-9]{9})$/i;

// === EVENTOS === //
buttonValidarDatos.addEventListener("click", validarDatosFormularioRegistro, false);

// === METODOS === //

/** 
 * Funcion que se encarga de validar si los campos del formulario de registro "formRegistro"
 * cumplen con un conjunto de requisitos.
 * 
 * Los requisitos que se deben cumplir son:
 *      - Todos los campos deben de tener datos, sin excepcion.
 *      - El campo "emailCorreo" debera de seguir el formato: <Algo>@<subdominio>.<dominio>
 *      - El campo "telTelefono" debera de tener el siguiente formato de numero: 123456789
 * */
function validarDatosFormularioRegistro() {
    // Variables
    // * Donde guardamos el valor de los campos del formulario sin espacios.
    let valorNombre = eliminarEspacios(textNombre.value);
    let valorApellido = eliminarEspacios(textApellido.value);
    let valorCorreo = eliminarEspacios(emailCorreo.value);
    let valorTelefono = eliminarEspacios(telTelefono.value);
    // * Donde generaremos algun mensaje emergente.
    let msg = null;

    // Comprobamos que se cumplan todos los requisitos.
    if( // Comprobamos que no hayan campos vacios.
        valorNombre != "" &&
        valorApellido != "" &&
        valorCorreo != "" &&
        valorTelefono != "" &&
        // Comprobamos que el formato de los campos sean los correctos
        regexCorreo.test(valorCorreo) &&
        regexTelefono.test(valorTelefono)) {
            // Si se cumplen todas las condiciones, reiniciaremos el mensaje de estado de todos los campos.
            estadoNombre.innerHTML = "&nbsp;";
            estadoApellido.innerHTML = "&nbsp;";
            estadoCorreo.innerHTML = "&nbsp;";
            estadoTelefono.innerHTML = "&nbsp;";

            // === CONTINUACION DEL CODIGO... === //
            window.alert("Todo OK");
            document.write("Todo OK");
    }

    else {
        // Si alguno de los campos no cumple con algun requisito, generaremos un mensaje indicandolo.
        msg = "";

        // Comprobamos cada campo del formulario
        // * Nombre
        // Miramos si el valor del "nombre" esta vacio.
        if(valorNombre == "") {
            // De estarlo, lo indicaremos en el mensaje.
            msg += "- El campo \"Nombre\" no puede dejarse vacio.\n";
            estadoNombre.innerText = "Introduce un nombre.";
        }
    
        else {
            // En caso contrario, en el estado del nombre dejaremos un espacio en blanco.
            estadoNombre.innerHTML = "&nbsp;";
        }

        // * Apellido
        // Miramos si el campo se encuentra vacio.
        if(valorApellido == "") {
            // De estarlo, anyadiremos un mensaje indicandolo.
            msg += "- El campo \"Apellido\" debe completarse.\n";
            estadoApellido.innerText = "Indica un apellido.";
        }

        else {
            // En caso contrario, guardaremos en el estado del apellido un espacio en blanco.
            estadoApellido.innerHTML = "&nbsp;";
        }

        // * Correo
        // Miramos si el valor del campo esta vacio.
        if(valorCorreo == "") {
            // De estarlo, lo registraremos en un mensaje.
            msg += "- El campo \"correo\" debe tener una dirección de correo.\n";
            estadoCorreo.innerText = "Especifica una dirección de correo.";
        }

        // Si no esta vacio comprobaremos si el formato de este no es correcto.
        else if(!regexCorreo.test(valorCorreo)) {
            // Si no cumple con el formato, haremos que conste en un mensaje.
            msg += "- La dirección de correo escrita en \"correo\" no tiene un formato válido.\n Ej. admin@email.com\n";
            estadoCorreo.innerText = "El formato del correo indicado no es válido. Ej. admin@email.com";
        }

        else {
            // En caso contrario, guardaremos en el estado del correo un espacio en blanco.
            estadoCorreo.innerHTML = "&nbsp;";
        }

        // * Telefono
        // Miramos si el valor del campo esta vacio
        if(valorTelefono == "") {
            // De estarlo, lo indicaremos en un mensaje.
            msg += "- El campo \"Telefono\" se ha de indicar un numero de teléfono.\n";
            estadoTelefono.innerText = "Escribe un número de teléfono.";
        }

        // De no estar vacio, comprobaremos si el telefono no cumple con el formato.
        else if(!regexTelefono.test(valorApellido)) {
            // Si el telefono no esta introducido en un formato valido, lo indicaremos en un mensaje.
            msg += "- El teléfono indicado en \"Teléfono\" no tiene un formato valido. [Ej. 999332211]\n";
            estadoTelefono.innerText = "Formato de teléfono no válido. Ej. 999332211";
        }

        else {
            // En caso contrario, guardaremos en el estado del telefono un espacio en blanco.
            estadoTelefono.innerHTML = "&nbsp;";
        }

        // Comprobamos si el mensaje que hemos generado no esta vacio.
        if(msg != "") {
            // Mostramos el mensaje generado en una ventana emergente.
            msg = "ERRORES DEL FORMULARIO\n" +
                  "=============================\n" +
                  msg;
            window.alert(msg);
        }

        else {
            // De estarlo, mostraremos en una ventana emergenete que ha habido un error interno.
            window.alert("ERROR INTERNO: Ha sucedido un error al comprobar los datos enviados, por favor informa de este mensaje he inténtalo más tarde.");
        }
    }
}


/** 
 * Dada una cadena de texto, se devolvera la misma cadena sin espacios tanto al principio como
 * al final.
 * 
 * @param str : Cadena de texto original.
 * @return La cadena "str" sin espacios tanto al principio como al final.
 * */
function eliminarEspacios(str) {
    // Comprobamos si la cadena "str" equivale a un String.
    if(typeof(str) == "string") {
         // Si lo es eliminamos todos los espacios que haya tanto al principio como al final.
        str = str.trimStart();
        str = str.trimEnd();
    }

    // Devolvemos la cadena "str" sin espacios tanto al principio como al final.
    return str;
}