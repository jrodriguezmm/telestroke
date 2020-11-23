<?php

include "../db.php";
include "../cripto.php";

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);

$UsuarioID = $_POST['UsuarioID'];
$UsuarioNombre = blancoSiVacioONotSet($_POST['UsuarioNombre']);
$IdUsuarioTipo = blancoSiVacioONotSet($_POST['IdUsuarioTipo']);
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

$PrimerNombre = $telecypher->encrypt($PrimerNombre, $somekey);
$SegundoNombre = $telecypher->encrypt($SegundoNombre, $somekey);
$PrimerApellido = $telecypher->encrypt($PrimerApellido, $somekey);
$SegundoApellido = $telecypher->encrypt($SegundoApellido, $somekey);
$NumeroDocIdentidad = $telecypher->encrypt($NumeroDocIdentidad, $somekey);

	$sql = "UPDATE usuariosacv SET 
				UsuarioNombre = '$UsuarioNombre',
				IdUsuarioTipo = '$IdUsuarioTipo',
				PrimerNombre = '$PrimerNombre',
				SegundoNombre = '$SegundoNombre',
				PrimerApellido = '$PrimerApellido',
				SegundoApellido = '$SegundoApellido',
				IdTipoDocIdent = '$IdTipoDocIdent',
				NumeroDocIdentidad = '$NumeroDocIdentidad',
				Sexo = '$Sexo',
				h_NumeroDocIdentidad = '$h_NumeroDocIdentidad',
				h_PrimerNombre = '$h_PrimerNombre',
				h_PrimerApellido = '$h_PrimerApellido'
					 
			WHERE UsuarioID = '$UsuarioID'";
			
	$result = mysqli_query($con, $sql) or die(mysqli_error($con). "sql=". $sql);
	echo $result;

mysqli_close($con);
?>
