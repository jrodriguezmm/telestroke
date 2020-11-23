<?php

include "../db.php";
include "../cripto.php";

// print_r($_POST);

if ( (!isset($_POST['PrimerNombre'])) || (!isset($_POST['PrimerApellido'])) || (!isset($_POST['IdTipoDocIdent'])) || (!isset($_POST['NumeroDocIdentidad'])) ){
	echo "-1: Faltan campos obligatorios.";
	exit();
}

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);


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

$DireccionResidencia= $telecypher->encrypt($DireccionResidencia, $somekey);
$TelefonoResidencia= $telecypher->encrypt($TelefonoResidencia, $somekey);
$TelefonoCelular= $telecypher->encrypt($TelefonoCelular, $somekey);

$sql = "SELECT * FROM pacientes WHERE (IdTipoDocIdent  = '$IdTipoDocIdent' AND NumeroDocIdentidad = '$NumeroDocIdentidad')";
$result = mysqli_query($con, $sql) or die("Error al leer pacientes. sql: " . $sql . "; " . mysqli_error($con));
$numrows = mysqli_num_rows($result);

if ($numrows == 0) {

	$sqlInsert = "INSERT INTO pacientes(
		PrimerNombre,
		SegundoNombre,
		PrimerApellido,
		SegundoApellido,
		IdTipoDocIdent,
		NumeroDocIdentidad,
		Sexo,
		FechaNacimiento,
		CODDPTONacimiento,
		CODMPIONacimiento,
		CODDPTOResidencia,
		CODMPIOResidencia,
		DireccionResidencia,
		TelefonoResidencia,
		TelefonoCelular,
		Aseguradora,
		h_NumeroDocIdentidad,
		h_PrimerNombre,
		h_PrimerApellido
	) 
	VALUES (" .
		nullSiVacioONotSet($PrimerNombre) . "," .
		nullSiVacioONotSet($SegundoNombre) . "," .
		nullSiVacioONotSet($PrimerApellido) . "," .
		nullSiVacioONotSet($SegundoApellido) . "," .
		nullSiVacioONotSet($IdTipoDocIdent) . "," .
		nullSiVacioONotSet($NumeroDocIdentidad) . "," .
		nullSiVacioONotSet($Sexo) . "," .
		nullSiVacioONotSet($FechaNacimiento) . "," .
		nullSiVacioONotSet($CODDPTONacimiento) . "," .
		nullSiVacioONotSet($CODMPIONacimiento) . "," .
		nullSiVacioONotSet($CODDPTOResidencia) . "," .
		nullSiVacioONotSet($CODMPIOResidencia) . "," .
		nullSiVacioONotSet($DireccionResidencia) . "," .
		nullSiVacioONotSet($TelefonoResidencia) . "," .
		nullSiVacioONotSet($TelefonoCelular) . "," .
		nullSiVacioONotSet($Aseguradora) . "," .
		nullSiVacioONotSet($h_NumeroDocIdentidad) . "," .
		nullSiVacioONotSet($h_PrimerNombre) . "," .
		nullSiVacioONotSet($h_PrimerApellido) . 
	")";	
	
	$resultInsert = mysqli_query($con, $sqlInsert);
	
	if ($resultInsert <> 1){
		echo "-3:Fallo INSERT Paciente:" . $sqlInsert;
	} else {		
		$sql = "SELECT * FROM pacientes WHERE (IdTipoDocIdent = '$IdTipoDocIdent' AND NumeroDocIdentidad = '$NumeroDocIdentidad') ORDER BY IdPaciente DESC LIMIT 1";
		
		$resultado = mysqli_query($con, $sql) or die("Error al leer paciente: " . mysqli_error($con) . " sql= " . $sql);
		
		if ($resultado) {
			$numfilas = mysqli_num_rows($resultado);
			
			if ($numfilas == 1) {
				$row = mysqli_fetch_array($resultado);
				$IdPaciente = $row['IdPaciente'];
				echo $IdPaciente . ":Insertado OK.";
			} else {
				echo "-3:Fallo comprabobar el nuevo INSERT Paciente. Coincidencias encontradas=" . $numfilas . " sql: " . $sql ;
			}
			
		} else {
			echo "-4:Fallo insertar Paciente. No se verificó el insert:" . $sql;
		}
	} 
	
} else { 
	if ($numrows > 0) {
		echo "-2:Error crear paciente. El NumeroDocIdentidad del nuevo paciente ya existe: " . $sql;
	}
}
	
mysqli_close($con);

?>
