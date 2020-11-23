<?php
session_start();

// filtrarMunicipios.php

include "../../db.php";
	
$CODDPTO = ($_POST['CODDPTO']);	


	$sqlLista = "SELECT * FROM municipios WHERE CODDPTO = '$CODDPTO' ORDER BY MUNICIPIO";
	$municipios_options = "<option value=-1 disabled selected >Seleccionar...</option>";

	$resultLista = mysqli_query($con, $sqlLista) or die("Error. Sql= " . $sqlLista . "; " . mysqli_error($con));
	$numfilas = mysqli_num_rows($resultLista);
	
	if ($numfilas > 0) {
		while ($rowLista = mysqli_fetch_array($resultLista)) {
			$value = $rowLista['CODMPIO'];
			$municipios_options .='<option value=' .$value . '>' . myutf8_decode($rowLista['MUNICIPIO']) . '</option>';			
		}
		echo $municipios_options;
	} else {
		echo '';
	}
	
mysqli_close($con);        
?>

