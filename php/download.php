<?php
require("conexion.php");

if (!$mysqli->connect_errno) {
    $buscar = $mysqli->query("select * from registro reg inner join usuario user on reg.idUser = user.idUser INNER JOIN archivo archi ON reg.idArchivo = archi.idArchivo;");
    if ($buscar != null) {
        $cadena = "[{";
        $c = 0;
        while ($datos = $buscar->fetch_array()) {
            $c++;
            $clave = 'clave' . $c;
            $fecha = 'fecha' . $c;
            $estado = 'estado' . $c;
            $idUser = 'idUser' . $c;
            $nombre = 'nombre' . $c;
            $apePat = 'apePat' . $c;
            $apeMat = 'apeMat' . $c;
            $correo = 'correo' . $c;
            $archivo = 'archivo' . $c;
            $tipoTramite = 'tipoTramite' . $c;
            $tipo = 'tipo' . $c;

            $cadena .= '"' . $clave . '":' . $datos[0] . ',"'
                . $fecha . '":"' . $datos[1] . '","'
                . $estado . '":"' . $datos[2] . '","'
                . $idUser . '":' . $datos[3] . ',"'
                . $nombre . '":"' . $datos[7] . '","'
                . $apePat . '":"' . $datos[8] . '","'
                . $apeMat . '":"' . $datos[9] . '","'
                . $correo . '":"' . $datos[15] . '","'
                . $archivo . '":"' . $datos[18] . '","'
                . $tipoTramite . '":"' . $datos[19] . '","'
                . $tipo . '":"' . $datos[20] . '",';
        }
        $cadena .= '"tam":' . $c . ',';
        $largo = strlen($cadena);
        $cadena2 = substr($cadena, 0, ($largo - 1));
        $cadena2 .= "}]";
        $mysqli->close();
        echo $cadena2;
    } else {
        $mensaje = "Revisar la consulta";
    }
} else {
    $mensaje = "no hay conexion";
}
/*
$areglo = '[{"v0":"'.$clave.'","v1":"'.$modelo.'","v2":"'.$precio.'"}]';
echo($areglo);
*/
?>
