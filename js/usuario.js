var dato;
var lista_datos;
var caja_precio;
addEvent(window,'load',cargar, false);
function addEvent(ele,eve,fun,cap){
    if(window.attachEvent)
        addAttachEvent('on'+eve,fun);
    else
        ele.addEventListener(eve,fun,cap);
}

agregaBotones()

function cargar(){ 
    lista_datos = document.getElementById("slt_datos");
    caja_precio = document.getElementById("txt_precio");
    //addEvent(lista_datos,'change',recibirDatos2,false);
    recibirDatos()
}

function recibirDatos(){        
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta;
    conexion.open("POST","php/usuario.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");	
    conexion.send();        
} 

function agregaBotones(){        
    conexion = xmlhttprequest();
    conexion.onreadystatechange = mandarRespuesta;
    conexion.open("POST","php/index.php",true);
    conexion.setRequestHeader("Content-type","application/x-www-form-urlencoded");	
    conexion.send();        
} 

function esperaRespuesta() {
    if (conexion.readyState == 4) {
        dato = eval(conexion.responseText);

        // Limpiar todos los elementos antes de agregar nuevos

        document.querySelector('#obj1').innerHTML = 'No hay archivo aun';
        document.querySelector('#obj2').innerHTML = 'No hay archivo aun';
        document.querySelector('#obj3').innerHTML = 'No hay archivo aun';


        for (let i = 1; i <= dato[0]["tam"]; i++) {
            let clave = dato[0]["clave" + i]; // Trae el ID.
            let valor = dato[0]["archivo" + i];
            let estado = dato[0]["estado" + i];

            let langEl;

            switch (estado) {
                case "1":
                    langEl = document.querySelector('#obj3');
                    if(document.querySelector('#obj3').innerHTML === 'No hay archivo aun'){
                        document.querySelector('#obj3').innerHTML = '';
                    } 
                    break;
                case "0":
                    langEl = document.querySelector('#obj2');
                    if(document.querySelector('#obj2').innerHTML === 'No hay archivo aun'){
                        document.querySelector('#obj2').innerHTML = '';
                    }                     
                    break;
                case "":
                    langEl = document.querySelector('#obj1');
                    if(document.querySelector('#obj1').innerHTML === 'No hay archivo aun'){
                        document.querySelector('#obj1').innerHTML = '';
                    }                    
                    break;
                default:
                    alert("El estado es de un tipo diferente.");
                    continue;
            }

            let languages = [{ clave: valor }];
            let fragment1 = new DocumentFragment();

            for (let key in languages[0]) {
                let text = languages[0][key];
                let urlLink = document.createElement('a');
                urlLink.href = "files/" + valor;
                urlLink.textContent = text;
                urlLink.classList.add('linkArchivo');
                urlLink.target = "_blank"; // Establecer el atributo target
                fragment1.appendChild(urlLink);
                
            }

            // Agregar el fragmento al elemento
            langEl.appendChild(fragment1);

            // Agregar un salto de línea solo si no es el último elemento
            if (i < dato[0]["tam"]) {
                langEl.appendChild(document.createElement('br'));
            }
        }
    }
}

function mandarRespuesta(){
    if(conexion.readyState == 4){   
        var trad = eval(conexion.responseText);
        var opc = trad[0]["v3"];//trae la opcion.
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


function xmlhttprequest(){
    return new XMLHttpRequest();//Objeto de javascript, tiene varios métodos, por ejemplo send()
}