var pass;
var opc;
var error;
var cajas;
var parametros;
var cadena;
var correo;

addEvent(window, 'load', cargar, false);

// Función que agrega un evento a un elemento
function addEvent(ele, eve, fun, cap){
    if(window.attachEvent)
        addAttachEvent('on' + eve, fun);
    else
        ele.addEventListener(eve, fun, cap);
}

// Función que se ejecuta al cargar la página
function cargar(){
    cajas = document.getElementsByTagName("input");
    //addEvent(cajas_radios[1],'keypress',filtraNumeros,false); 
    addEvent(cajas[2],"click", recibirDatos, false);
}

// Función para validar los campos
function validar(){
    var dc;
    correo = document.getElementById("txtCorreo").value;
    correo = correo.toLowerCase(); // Asigna el valor en minúsculas
    pass = document.getElementById("txtPass").value;
    if (pass == "" || correo == "") {
        dc = false;
    } else {
        dc = true;
    }
    return dc;
}

// Función para enviar datos al servidor
function recibirDatos() {
    let x = validar();
    if (x == true) {
        conexion = xmlhttprequest();
        conexion.onreadystatechange = esperaRespuesta;
        conexion.open("POST", "php/login.php", true);
        conexion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        conexion.send("correo=" + correo + "&pass=" + pass);
    } else {
        swal("Error", "Rellene todos los campos", "error");
    }
}

// Función que se ejecuta cuando se recibe una respuesta del servidor
function esperaRespuesta() {
    if (conexion.readyState == 4) {
        var trad = eval(conexion.responseText);
        parametros = trad[0]["var"];
        opc = trad[0]["res"];
        trad = trad[0]["error"];
        if (opc == 1) {
            window.location.href = "index.html"; // Redireccionar si la opción es 1
        } else {
            swal(trad, " ", "error");
        }
    }
}

// Función para filtrar números
function filtraNumeros() {
    if ((event.keyCode >= 48 && event.keyCode <= 57)) {
        event.returnValue = true;
    } else {
        event.returnValue = false;
    }
}

// Función para crear una instancia de XMLHttpRequest
function xmlhttprequest() {
    return new XMLHttpRequest(); // Objeto de JavaScript para realizar solicitudes HTTP
}
