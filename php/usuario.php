<?php
session_start();
require("conexion.php");

$idUser = $_SESSION['id'];
$mensaje = ""; // Inicializa la variable $mensaje

if (!$mysqli->connect_errno) {
    $buscar = $mysqli->query("SELECT archivo.idArchivo, archivo.nombre, registro.idArchivo, registro.estado
                              FROM archivo
                              JOIN registro ON archivo.idArchivo = registro.idArchivo 
                              WHERE registro.idUser='".$idUser."';");
    if ($buscar) {
        $cadena = "[{";
        $c = 0;
        while ($datos = $buscar->fetch_array()) {
            $c++;
            $clave = 'clave'.$c;
            $archivo = 'archivo'.$c;
            $estado = 'estado'.$c;

            // Ajusta el nombre de las variables si es necesario
            $cadena .= '"'.$clave.'":'.$datos[0].',"'
                          .$archivo.'":"'.$datos[1].'","'
                          .$estado.'":"'.$datos[3].'",';
            // echo($areglo); // ¿Necesitas esto aquí?
        }
        $cadena.='"tam":'.$c.',';
        $largo = strlen($cadena);
        $cadena2 = substr($cadena, 0, ($largo - 1));
        $cadena2 .="}]";
        $mysqli -> close();
        echo $cadena2;
        // Puedes establecer aquí un mensaje en caso de que no se hayan encontrado resultados
        // if (empty($urlBD)) {
        //     $mensaje = "No tienes ningun archivo " . $idUser;
        // }
    } else {
        $mensaje = "Error en la consulta: " . $mysqli->error;
    }
} else {
    // Usa die o alguna otra forma de manejar errores de manera más explícita
    die("Error de conexión a la base de datos: " . $mysqli->connect_error);
}
?>
