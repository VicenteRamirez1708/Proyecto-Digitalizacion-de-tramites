<?php

require("conexion.php");

$curp = $_POST['var4'];
$nombre = $_POST['var1'];
$apePat = $_POST['var2'];
$apeMat = $_POST['var3'];
$fechaNac = $_POST['var5'];
$lugarNac = $_POST['var6'];
$nacion = $_POST['var9'];
$rfc = $_POST['var10'];
$correo = $_POST['var11'];
$correo1 = strtolower($correo); // Convertir a minúsculas
$pass = $_POST['var12'];
$sexo = $_POST['var13'];

if (filter_var($correo1, FILTER_VALIDATE_EMAIL)){
    $buscar = $mysqli -> query("select * from usuario where correo ='".$correo1."'");
    if($buscar!=null){
        while($registro = $buscar->fetch_array()){
            $correoBD = $registro[10];
        }
        if($correo1 == $correoBD){
            $mensaje = "CORREO YA REGISTRADO";
            $opc = 2;
        }else{
            $cont2 = hash('ripemd160',$pass);
            $insertar = $mysqli -> query("insert into usuario values('', 
            '".$curp."', 
            '".$nombre."',
            '".$apePat."', 
            '".$apeMat."', 
            '".$sexo."', 
            '".$fechaNac."', 
            '".$lugarNac."', 
            '".$nacion."', 
            '".$rfc."', 
            '".$correo1."', 
            '".$cont2."')");
            $mensaje = "USUARIO REGISTRADO";
            $opc = 1;
        }

    }else{
        $mensaje = "Revisar la consulta";
    }
}else{
    $mensaje = "CORREO NO VALIDO";
}
$variables = "1".$sexo."1";
$areglo = '[{"v0":"'.$variables.'","v1":"'.$mensaje.'","v2":"'.$opc.'"}]';
echo($areglo);

?>