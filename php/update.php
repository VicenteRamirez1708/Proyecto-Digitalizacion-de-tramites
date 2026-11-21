<?php
require("conexion.php");

session_start();

$idUsuario = $_SESSION['id'];

$archivo = $_FILES['archivo'];

// Define los formatos válidos
$formatos = array('.docx', '.doc', '.pdf');
$tramite = "Apoyo para el registro de becas escolares";
$tipo = "solicitud";

// Verificar si se han enviado archivos
if (isset($archivo)) {
    $file_name = $archivo['name'];
    $file_temp = $archivo['tmp_name'];

    // Verifica si la extensión de los archivos está en la lista de formatos válidos
    $extension = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    if (in_array('.' . $extension, $formatos)) {
        $dir = '../files/'; // Directorio donde se guardarán los archivos
        if (!file_exists($dir)) { // Comprueba si el directorio no existe y lo crea
            mkdir($dir, 0777, true);
        }

        $nuevoNombreArchivo = "new" . $tramite . "_". $tipo . "_" . $idUsuario . "." . $extension;

        $route = $dir . $nuevoNombreArchivo;

        if (move_uploaded_file($file_temp, $route)) {
                $sql = ("UPDATE archivo SET nombre = '".$nuevoNombreArchivo."', url= '".$route."' WHERE idUser =".$idUsuario.";");
                if ($mysqli->query($sql)){
                    // Inserción exitosa
                    
                    $sqlUpdates = array(); // Crear un array para almacenar las consultas SQL
                
                    // Obtener el ID del primer archivo insertado
                    $result = $mysqli->query("SELECT LAST_INSERT_ID() as last_id");
                    if ($result) {
                        $row = $result->fetch_assoc();
                        $idArchivoBD = $row['last_id'];
                
                        // Fecha actual
                        $fecha = date("Y-m-d");
                
                        // Generar la consulta SQL para insertar en la tabla registro y agregarla al array
                        $sqlI = ("UPDATE registro SET fecha = '".$fecha."' , estado= NULL WHERE idUser =".$idUsuario.";");
                        $sqlUpdates[] = $sqlI;
                    } else {
                        $mensaje = "Error al obtener el ID del primer archivo insertado: " . $mysqli->error;
                        $opc = 2;
                    }
                    // Ejecutar todas las consultas almacenadas en el array
                    foreach ($sqlUpdates as $sqlUpdates) {
                        if (!$mysqli->query($sqlUpdates)) {
                            $mensaje = "Error al actualizar datos en la tabla registro: " . $mysqli->error;
                            $opc = 2;
                            break; // Si hay un error, salir del bucle
                        }
                    }
                
                    // Si no hubo errores en la inserción de los registros
                    if ($opc != 2) {
                        $mensaje = "Archivo actualizado con exito";
                        $opc = 1;
                    }
                } else {
                    // Error en la inserción de archivo
                    $mensaje = "Error al insertar datos en la tabla archivo: " . $mysqli->error;
                    $opc = 2;
                }
            
        } else {
            // Error en la carga de los archivos
            $mensaje = "Error al subir los archivos.";
            $opc = 2;
        }
    } else {
        // Error en el formato
        $mensaje = "El formato de los archivos no es válido. Solo se permiten archivos .docx, .doc y .pdf.";
        $opc = 2;
    }
} else {
    // No se han enviado archivos
    $mensaje = "No se ha seleccionado ningún archivo para subir.";
    $opc = 2;
}
//$res = $nuevoNombreArchivo;
$areglo = '[{"v0":"'.$res.'","v1":"' . $mensaje . '","v2":"' . $opc . '"}]';
echo ($areglo);
?>


