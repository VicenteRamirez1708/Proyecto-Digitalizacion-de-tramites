<?php
session_start();

// Verificar si la sesión está activa
$sesionActiva = isset($_SESSION['id']);

// Crear un arreglo asociativo con la respuesta
$respuesta = array('sesionActiva' => $sesionActiva);

// Enviar la respuesta JSON
header('Content-Type: application/json');
echo json_encode($respuesta);
?>
