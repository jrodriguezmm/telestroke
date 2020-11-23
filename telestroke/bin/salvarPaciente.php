<?php

include "../db.php";
include "../cripto.php";

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);

$IdPaciente = $_POST['IdPaciente'];

$PrimerNombre= blancoSiVacioONotSet($_POST['PrimerNombre']);
$SegundoNombre= blancoSiVacioONotSet($_POST['SegundoNombre']);
$PrimerApellido= blancoSiVacioONotSet($_POST['PrimerApellido']);
$SegundoApellido= blancoSiVacioONotSet($_POST['SegundoApellido']);
$IdTipoDocIdent= blancoSiVacioONotSet($_POST['IdTipoDocIdent']);
$NumeroDocIdentidad= blancoSiVacioONotSet($_POST['NumeroDocIdentidad']);
$Sexo= blancoSiVacioONotSet($_POST['Sexo']);
$FechaNacimiento= blancoSiVacioONotSet($_POST['FechaNacimiento']);
$CODDPTONacimiento= blancoSiVacioONotSet($_POST['CODDPTONacimiento']);
$CODMPIONacimiento= blancoSiVacioONotSet($_POST['CODMPIONacimiento']);
$CODDPTOResidencia= blancoSiVacioONotSet($_POST['CODDPTOResidencia']);
$CODMPIOResidencia= blancoSiVacioONotSet($_POST['CODMPIOResidencia']);
$DireccionResidencia= blancoSiVacioONotSet($_POST['DireccionResidencia']);
$TelefonoResidencia= blancoSiVacioONotSet($_POST['TelefonoResidencia']);
$TelefonoCelular= blancoSiVacioONotSet($_POST['TelefonoCelular']);
$Aseguradora = blancoSiVacioONotSet($_POST['Aseguradora']);

$h_NumeroDocIdentidad = get_hash($NumeroDocIdentidad);
$h_PrimerNombre = get_hash($PrimerNombre);
$h_PrimerApellido = get_hash($PrimerApellido);

$PrimerNombre = $telecypher->encrypt($PrimerNombre, $somekey);
$SegundoNombre = $telecypher->encrypt($SegundoNombre, $somekey);
$PrimerApellido = $telecypher->encrypt($PrimerApellido, $somekey);
$SegundoApellido = $telecypher->encrypt($SegundoApellido, $somekey);
$NumeroDocIdentidad = $telecypher->encrypt($NumeroDocIdentidad, $somekey);

$DireccionResidencia= $telecypher->encrypt($_POST['DireccionResidencia'], $somekey);
$TelefonoResidencia= $telecypher->encrypt($_POST['TelefonoResidencia'], $somekey);
$TelefonoCelular= $telecypher->encrypt($_POST['TelefonoCelular'], $somekey);


	$sql = "UPDATE pacientes SET 
				PrimerNombre = '$PrimerNombre',
				SegundoNombre = '$SegundoNombre',
				PrimerApellido = '$PrimerApellido',
				SegundoApellido = '$SegundoApellido',
				IdTipoDocIdent = '$IdTipoDocIdent',
				NumeroDocIdentidad = '$NumeroDocIdentidad',
				Sexo = '$Sexo',
				FechaNacimiento = '$FechaNacimiento',
				CODDPTONacimiento = '$CODDPTONacimiento',
				CODMPIONacimiento = '$CODMPIONacimiento',
				CODDPTOResidencia = '$CODDPTOResidencia',
				CODMPIOResidencia = '$CODMPIOResidencia',
				DireccionResidencia = '$DireccionResidencia',
				TelefonoResidencia = '$TelefonoResidencia',
				TelefonoCelular = '$TelefonoCelular',
				Aseguradora = '$Aseguradora',
				h_NumeroDocIdentidad = '$h_NumeroDocIdentidad',
				h_PrimerNombre = '$h_PrimerNombre',
				h_PrimerApellido = '$h_PrimerApellido'				
								 
			WHERE IdPaciente = '$IdPaciente'";
					
	$result = mysqli_query($con, ($sql)) or die("Error al salvar usuario. sql= " . $sql . ". " . mysqli_error($con));
		
	echo $result;

mysqli_close($con);
?>
