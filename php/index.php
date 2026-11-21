<?php
session_start();

$clave = "id"; // Nombre de la clave
$sesion = $_SESSION['usuario']; // Valor de la sesión

if (isset($_SESSION['usuario'])) {
	$opc = 1;
}
else{
	$opc = 2;
}

// Crear un arreglo asociativo en formato JSON con las claves y valores
$areglo = '[{"v0":"' . $clave . '","v1":"' . $sesion . '","v3":"' . $opc . '"}]';

echo $areglo;
?>
