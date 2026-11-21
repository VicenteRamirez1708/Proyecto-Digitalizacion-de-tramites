var dato;
var archivo;
var archivo2;
var enviar;

addEvent(window, 'load', cargar, false);

function addEvent(ele, eve, fun, cap) {
    if (window.attachEvent)
        addAttachEvent('on' + eve, fun);
    else
        ele.addEventListener(eve, fun, cap);
}

function cargar() {
    archivo = document.getElementById("archivo");
    enviar = document.getElementById("btnEnviar");
    addEvent(enviar, 'click', recibirDatos, false);
    recibirDatos2();
}

function recibirDatos() {
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta;
    conexion.open("POST", "php/upload.php", true);

    var formData = new FormData();

    if (archivo.files.length > 0) {
        formData.append("archivo", archivo.files[0]);
        conexion.send(formData);
    } else {
        swal("rellena los campos", "", "error");
    }
}

function esperaRespuesta() {
    if (conexion.readyState == 4) {
        var data = JSON.parse(conexion.responseText);
        res = data[0]["v0"];
        opc = data[0]["v2"];
        msg = data[0]["v1"];
        if (opc == 1) {
            swal(msg, res, "success");
            //window.location.href = "index.html";
        } else if(opc == 2){
            swal(msg, res, "error");
        }else{
            swal({
                title: msg,
                text: "¿Quieres actualizarlo?",
                icon: "warning",
                dangerMode: true,
                buttons: {
                    cancel: "No",
                    confirm: "Si",
                },
            })
            .then((willDelete) => {
                if (willDelete) {
                    recibirDatos3();
                }
            });
        }
    }
}

function recibirDatos2(){     
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta2;
    conexion.open("POST","php/index.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");	
    conexion.send();        
} 

function esperaRespuesta2(){
    if(conexion.readyState == 4){   
        var trad = eval(conexion.responseText);
        opc = trad[0]["v3"];//trae la opcion.
        if (opc == 1) { // Si la opción es 1, hay una sesión.
            var clave = trad[0]["v0"]; // Trae el ID.
            var valor = trad[0]["v1"]; // Nombre del usuario.
        
            let languages = [{clave: valor}]; // Arreglo clave-valor
            let langEl1 = document.querySelector('#objetivo'); // Elemento del HTML para el enlace a usuario.html
            let langEl2 = document.querySelector('#objetivo2'); // Elemento del HTML para el enlace "Cerrar sesión"
            
            // Crear un fragment para el enlace a usuario.html
            let fragment1 = new DocumentFragment();
            for (var key in languages[0]) {
                let text = languages[0][key]; // Almacena el texto en una variable
                let usuarioLink = document.createElement('a');//crea elemnto a en el html
                usuarioLink.href = 'usuario.html'; // Reemplaza con la URL de usuario.html
                usuarioLink.textContent = text; // Utiliza el mismo texto del fragment
                fragment1.appendChild(usuarioLink);
            }
        
            // Crear el enlace "Cerrar sesión"
            let cerrarSesionLink = document.createElement('a');//crea elemnto a en el html
            cerrarSesionLink.href = 'php/desconexion.php'; // Reemplaza con la URL para cerrar sesión
            cerrarSesionLink.textContent = 'Cerrar sesión';
        
            // Agregar el fragment del enlace a usuario.html al elemento #objetivo
            langEl1.appendChild(fragment1);
            // Agregar el enlace "Cerrar sesión" al elemento #objetivo2
            langEl2.appendChild(cerrarSesionLink);

        }else {
            var clave = trad[0]["v0"];//trae el id.

            let langEl = document.querySelector('#objetivo2');//trae el id del html.

            // Agregar enlace "Iniciar sesión"
            let iniciarSesionLink = document.createElement('a');
            iniciarSesionLink.href = 'login.html'; // Reemplaza con la URL para iniciar sesión
            iniciarSesionLink.textContent = 'iniciar sesión';
 
            langEl.appendChild(iniciarSesionLink); // Agrega el enlace "Iniciar sesión"
        }    
    }
}

function recibirDatos3() {
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta3;
    conexion.open("POST", "php/update.php", true);
    var newArchivo = document.getElementById("archivo");
    var formData = new FormData();

    if (newArchivo.files.length > 0) {
        formData.append("archivo", newArchivo.files[0]);
        conexion.send(formData);
    } else {
        swal("ocurrio un error", "intentalo mas tarde", "error");
    }
}

function esperaRespuesta3() {
    if (conexion.readyState == 4) {
        var data = JSON.parse(conexion.responseText);
        res = data[0]["v0"];
        opc = data[0]["v2"];
        msg = data[0]["v1"];
        if (opc == 1) {
            swal(msg, res, "success");
        }else{
            swal(msg, res, "error");
        }
    }
}

function xmlhttprequest() {
    return new XMLHttpRequest();
}
