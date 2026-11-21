<?php

$host = "localhost";
$usuario = "root";
$contrasena = "mysql123";
$base_datos = "isidrofabelabd";

// Crear una nueva instancia de MySQLi
$mysqli = new mysqli($host, $usuario, $contrasena, $base_datos);

// Verificar si hay errores de conexión
if ($mysqli->connect_errno) {
    die("Fallo la conexión a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

// Configurar el juego de caracteres para evitar problemas con caracteres especiales
$mysqli->set_charset("utf8");

?>