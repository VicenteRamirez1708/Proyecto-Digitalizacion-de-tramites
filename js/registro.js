var curp;
var pass1;
var pass2;
var error;
var rad1;
var rad2;
var sexo;
var opc;
var msg;
var res;
var boton;
var cajas;

// Cuando la ventana se carga, se ejecuta la función "cargar"
addEvent(window, 'load', cargar, false);

// Función para agregar un evento a un elemento (manejando la diferencia entre attachEvent y addEventListener)
function addEvent(ele, eve, fun, cap) {
    if (window.attachEvent)
        addAttachEvent('on' + eve, fun);
    else
        ele.addEventListener(eve, fun, cap);
}

// Función que se ejecuta cuando la ventana se carga
function cargar() {
    cajas = document.getElementsByTagName("input"); // Obtiene todos los elementos de entrada
    boton = document.getElementById("btnReg"); // Obtiene el botón de registro
    rad1 = document.getElementById("txtMasculino"); // Obtiene el primer radio button
    rad2 = document.getElementById("txtFemenino"); // Obtiene el segundo radio button
    // Asigna eventos a los elementos

    addEvent(boton, 'click', recibirDatos, false);
    addEvent(rad1, 'click', asignarSexo, false);
    addEvent(rad2, 'click', asignarSexo, false);
}

// Función para validar los campos del formulario
function validar() {
    var dc = true; // Inicializamos dc como true

    for (var elemento of cajas) {
        if (elemento.id === "txtRFC") {
            continue;
        }
        if (elemento.value === "") {
            error = "Rellene todos los campos";
            dc = false; // Cambiamos dc a false si un campo está vacío
            break; // Detenemos la validación
        }
    }

    if (dc) {
        curp = document.getElementById("txtCurp").value;
        pass1 = document.getElementById("txtPass1").value;
        pass2 = document.getElementById("txtPass2").value;

        if (curp.length !== 18) {
            dc = false;
            error = "CURP no válido";
        } else if (pass1.length < 8 || pass1.length > 15) {
            dc = false;
            error = "Las contraseñas deben tener entre 8 y 15 caracteres";
        } else if (pass1 !== pass2) {
            dc = false;
            error = "Las contraseñas deben ser iguales";
        }
    }

    return dc;
}

// Función para asignar el valor del campo "sexo" en función de qué radio button está seleccionado
function asignarSexo() {
    alert(rad1.value);
    if (rad1.checked) {
        sexo = "masculino";
    } else if (rad2.checked) {
        sexo = "femenino";
    }
}

// Función que se ejecuta cuando se hace clic en el botón de registro
function recibirDatos() {
    var c = 0;
    var cadena;
    let x = validar();
    if (x) {
        cadena = 'var';
        for (var elemento of cajas){
            c++;
            if(c<=12)
            cadena += c+'='+elemento.value+'&var'
        }
        cadena += c+'='+sexo; 
        conexion = xmlhttprequest();
        conexion.onreadystatechange = esperaRespuesta;
        conexion.open("POST", "php/registro.php", true);
        conexion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        conexion.send(cadena);
    } else {
        swal("Error", error, "error");
    }
}

// Función que se ejecuta cuando la solicitud AJAX está completa
function esperaRespuesta() {
    if (conexion.readyState == 4) {
        var trad = eval(conexion.responseText);
        res = trad[0]["v0"];
        opc = trad[0]["v2"];
        msg = trad[0]["v1"];
        if (opc == 1) {
            swal(msg, res, "success");
            //window.location.href = "index.html";
        } else {
            swal(msg, res, "error");
        }
    }
}

// Función para filtrar números
function filtraNumeros() {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        event.returnValue = true;
    } else {
        event.returnValue = false;
    }
}

// Función para crear una instancia de XMLHttpRequest
function xmlhttprequest() {
    return new XMLHttpRequest(); // Objeto de JavaScript, tiene varios métodos, por ejemplo, send()
}
