<?php

session_start();
require("conexion.php");

$correo = $_POST['correo'];
$pass = $_POST['pass'];
$cont2 = hash('ripemd160',$pass);

    $buscar = $mysqli -> query("select * from usuario where correo = '".$correo."'");
    if($buscar!=null){
        while($registro = $buscar->fetch_array()){
            $idBD = $registro[0];
            $userBD = $registro[2];
            $apePat = $registro[3];
            $apeMat = $registro[4];
            $correoBD = $registro[10];
            $passBD = $registro[11];
        }
        
        if($correo == $correoBD){
            if($cont2 == $passBD){
                $error = "USUARIO LOGEADO";
                $_SESSION['id'] = $idBD;
                $_SESSION['usuario'] = $userBD." ".$apePat." ".$apeMat;
                $res = 1;

            }else{
                $error = "CONTRASEÑA INCORRECTA";    
            }
        }else{
            $error = "CORREO NO REGISTRADO";
        }
    }
    else{
        $error = "revisar consulta";
    }
    
$variables = $correo." ".$pass;
$areglo = '[{"var":"'.$variables.'","error":"'.$error.'","res":"'.$res.'"}]';
echo($areglo);

?>