<?php
session_start();

// filtrarMunicipios.php

include "../../db.php";

$IdIPSEscenario = ($_POST['IdIPSEscenario']);		
$IdTipoEscenarioReferencia = ($_POST['IdTipoEscenarioReferencia']);	

	$ips_options = "<option value=-1 disabled selected >Seleccionar...</option>";
	
	if ($IdTipoEscenarioReferencia == 23){	
		$sqlLista = "SELECT * FROM ipsreferencias INNER JOIN ips ON ipsreferencias.IdIPSReferencia = ips.IdIPS WHERE (ipsreferencias.IdIPSRemitente = '$IdIPSEscenario' AND ips.IdTipoEscenario > 1)";
	} else if (($IdTipoEscenarioReferencia == 2) || ($IdTipoEscenarioReferencia == 3)) {
		$sqlLista = "SELECT * FROM ipsreferencias INNER JOIN ips ON ipsreferencias.IdIPSReferencia = ips.IdIPS WHERE (ipsreferencias.IdIPSRemitente = '$IdIPSEscenario' AND ips.IdTipoEscenario = '$IdTipoEscenarioReferencia')";
	} else {
		echo $ips_options;
		mysqli_close($con); 
		exit(0);
	}
	
	$resultLista = mysqli_query($con, $sqlLista) or die("Error. ipsreferencias Sql= " . $sqlLista . "; " . mysqli_error($con));
	$numfilas = mysqli_num_rows($resultLista);
	
	if ($numfilas > 0) {
		while ($rowOption = mysqli_fetch_array($resultLista)) {
			$value = $rowOption['IdIPS'];
			$ips_options .='<option value=' . $value . '>' . myutf8_decode($rowOption['IdTipoEscenario']) . ":" . myutf8_decode($rowOption['Prestador']) . '</option>';
		}	
	}
	echo $ips_options;
	
mysqli_close($con);        
?>