var dato;
var opcBtn;
var claveBtn;

addEvent(window, 'load', cargar, false);

function addEvent(ele, eve, fun, cap) {
    if (window.attachEvent)
        addAttachEvent('on' + eve, fun);
    else
        ele.addEventListener(eve, fun, cap);
}

function cargar() {
    recibirDatos();
}

function recibirDatos() {
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuesta;
    conexion.open("POST", "php/download.php", true);
    conexion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    conexion.send();   
}

function esperaRespuesta() {
    if (conexion.readyState == 4 && conexion.status == 200) {
        try {
            dato = JSON.parse(conexion.responseText);
            //alert(JSON.stringify(dato));
            agregarOpciones();
        } catch (error) {
            console.error("Error al analizar JSON: " + error);
        }    
    }
}

function agregarOpciones() {
    // AGREGA CAMPOS A LAS TABLAS 
    var tabla = document.getElementById('slt_datos');

    let fragment1 = document.createDocumentFragment();
    
    for (let i = 1; i <= dato[0]["tam"]; i++) {
        let fila = document.createElement('tr');

        let celda1 = document.createElement('td');
        celda1.setAttribute('value', dato[0]["idUser" + i]);
        var user = dato[0]["idUser" + i] +" "+ dato[0]["nombre" + i] +" "+ dato[0]["apePat" + i] +" "+ dato[0]["apeMat" + i];
        celda1.textContent = user;
        fila.appendChild(celda1);

        let celda2 = document.createElement('td');
        celda2.setAttribute('value', dato[0]["clave" + i]);
        celda2.textContent = dato[0]["correo" + i];
        fila.appendChild(celda2);        

        let celda3 = document.createElement('td');
        celda3.setAttribute('value', dato[0]["clave" + i]);
        celda3.textContent = dato[0]["fecha" + i];
        fila.appendChild(celda3);

        let celda4 = document.createElement('td');
        celda4.setAttribute('value', dato[0]["clave" + i]);
        celda4.textContent = dato[0]["tipoTramite" + i];
        fila.appendChild(celda4);

        let celda5 = document.createElement('td');
        celda5.setAttribute('value', dato[0]["clave" + i]);
        celda5.textContent = dato[0]["tipo" + i];
        fila.appendChild(celda5);

        let celda6 = document.createElement('td');
        celda6.setAttribute('value', dato[0]["clave" + i]);
        var enlace = "files/" + dato[0]["archivo" + i];
        
        // Crear un enlace (<a>) y configurar sus atributos
        let enlaceElement = document.createElement('a');
        enlaceElement.href = enlace;
        enlaceElement.textContent = dato[0]["archivo" + i];
        enlaceElement.classList.add('linkArchivo');
        enlaceElement.target = "_blank"; // Abrir enlace en una nueva ventana/tabla
        
        // Agregar el enlace a la celda
        celda6.appendChild(enlaceElement);
        
        // Agregar la celda a la fila
        fila.appendChild(celda6);

        let estado = dato[0]["estado" + i];
        let valor = "";
        
        switch (estado) {
            case "1":
                valor = "aceptado";
                break;
            case "0":
                valor = "rechazado";
                break;
            case "":
                valor = "en proceso";
                break;
            default:
                alert("El estado es de un tipo diferente.");
                continue;
        }
        
        let opcion5 = document.createElement('td');
        opcion5.setAttribute('value', dato[0]["clave" + i]);
        opcion5.classList.add('estadoCelda'); // Agregar la clase
        opcion5.textContent = valor;
        fila.appendChild(opcion5);
        
        // Crear el botón de Aceptar
        let botonAceptar = document.createElement('button');
        let claveAceptar = dato[0]["clave" + i]; // Capturar la clave en este momento
        botonAceptar.setAttribute('value', dato[0]["clave" + i]);
        botonAceptar.textContent = 'Aceptar';
        botonAceptar.classList.add('botonAceptar'); // Puedes agregar clases para estilos CSS
        botonAceptar.addEventListener('click', function() {
            opcBtn = 1;
            accionBoton(claveAceptar); // Pasar la clave como parámetro
        });
        
        // Crear el botón de Rechazar
        let botonRechazar = document.createElement('button');
        let claveRechazar = dato[0]["clave" + i]; // Capturar la clave en este momento
        botonRechazar.setAttribute('value', dato[0]["clave" + i]);
        botonRechazar.textContent = 'Devolver';
        botonRechazar.classList.add('botonRechazar'); // Puedes agregar clases para estilos CSS
        botonRechazar.addEventListener('click', function() {
            opcBtn = 0;
            accionBoton(claveRechazar); // Pasar la clave como parámetro
        });
        
        // Crear una celda para los botones y agregarlos a la celda
        let celdaBotones = document.createElement('td');
        celdaBotones.appendChild(botonAceptar);
        celdaBotones.appendChild(botonRechazar);
        
        // Agregar la celda de botones a la fila
        fila.appendChild(celdaBotones);
        
        // Agregar la fila al fragmento
        fragment1.appendChild(fila);
    }

    // Agrega las filas al cuerpo de la tabla
    tabla.appendChild(fragment1);
}

function accionBoton(clave) {
    conexion = xmlhttprequest();
    conexion.onreadystatechange = esperaRespuestaBoton;
    conexion.open("POST", "php/botones.php", true);
    conexion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    conexion.send("opc=" + opcBtn + "&clave=" + clave);   
}

function esperaRespuestaBoton() {
    if (conexion.readyState == 4) {
        var trad = eval(conexion.responseText);
        window.location.reload();
    }
}

function xmlhttprequest() {
    return new XMLHttpRequest();
}
