<?php
require("conexion.php");

$opc = $_POST['opc'];
$clave = $_POST['clave'];

$sql = "UPDATE registro SET estado = ".$opc." WHERE idRegistro =" . $clave;

if ($mysqli->query($sql)){
    $mensaje = "succes";
}else{
    $mensaje = "Error" . $mysqli->error;
}

$areglo = '[{"v0":"'.$mensaje.'"}]';
echo($areglo);

?>