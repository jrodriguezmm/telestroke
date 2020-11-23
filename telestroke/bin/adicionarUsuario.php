<?php

include "../db.php";
include "../cripto.php";

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);

$UsuarioNombre= blancoSiVacioONotSet($_POST['UsuarioNombre']);
$UsuarioID= blancoSiVacioONotSet($_POST['UsuarioID']);
$UsuarioClave= blancoSiVacioONotSet($_POST['UsuarioClave']);
$IdUsuarioTipo= blancoSiVacioONotSet($_POST['IdUsuarioTipo']);
$PrimerNombre = blancoSiVacioONotSet($_POST['PrimerNombre']);
$SegundoNombre = blancoSiVacioONotSet($_POST['SegundoNombre']);
$PrimerApellido = blancoSiVacioONotSet($_POST['PrimerApellido']);
$SegundoApellido = blancoSiVacioONotSet($_POST['SegundoApellido']);
$IdTipoDocIdent = blancoSiVacioONotSet($_POST['IdTipoDocIdent']);
$NumeroDocIdentidad = blancoSiVacioONotSet($_POST['NumeroDocIdentidad']);
$Sexo = blancoSiVacioONotSet($_POST['Sexo']);

$h_NumeroDocIdentidad = get_hash($NumeroDocIdentidad);
$h_PrimerNombre = get_hash($PrimerNombre);
$h_PrimerApellido = get_hash($PrimerApellido);

$options = ['cost' => 12,];  		
$UsuarioClave =  password_hash($UsuarioClave, PASSWORD_BCRYPT, $options);  
				
$PrimerNombre = $telecypher->encrypt($PrimerNombre, $somekey);
$SegundoNombre = $telecypher->encrypt($SegundoNombre, $somekey);
$PrimerApellido = $telecypher->encrypt($PrimerApellido, $somekey);
$SegundoApellido = $telecypher->encrypt($SegundoApellido, $somekey);
$NumeroDocIdentidad = $telecypher->encrypt($NumeroDocIdentidad, $somekey);

$sql = "SELECT * FROM usuariosacv WHERE (UsuarioID = '$UsuarioID')";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) == 0)
{
	$sqlInsert = "INSERT INTO usuariosacv(UsuarioNombre,UsuarioID,UsuarioClave,IdUsuarioTipo,PrimerNombre,SegundoNombre,PrimerApellido,SegundoApellido,IdTipoDocIdent,NumeroDocIdentidad,Sexo,h_NumeroDocIdentidad,h_PrimerNombre,h_PrimerApellido)
	 VALUES ('$UsuarioNombre','$UsuarioID','$UsuarioClave','$IdUsuarioTipo','$PrimerNombre','$SegundoNombre','$PrimerApellido','$SegundoApellido','$IdTipoDocIdent','$NumeroDocIdentidad','$Sexo','$h_NumeroDocIdentidad','$h_PrimerNombre','$h_PrimerApellido')";
	$result = mysqli_query($con, $sqlInsert);
    
	if ($result){
		echo $sqlInsert="El nuevo usuario($UsuarioID) fue agregado.";
	} else {
		echo $sqlInsert = "Error. La operación falló al insertar un nuevo usuario($UsuarioID).";
	}
} else { 
	echo $sqlInsert = "Error. El UsuarioID del nuevo usuario($UsuarioID) no se encuentra disponible.";
}

mysqli_close($con);

?>