<?php

session_start();

// print_r($_POST); 

include "../../db.php"; 
	
if ( (!isset($_POST['IdPaciente'])) || (!isset($_POST['FechaHoraInicioCaso'])) || (!isset($_POST['Terminado'])) || (!isset($_POST['UsuarioID'])) || (!isset($_POST['IdIPSCaso'])) ){
	echo -2;
} else {

	$IdPaciente = ($_POST['IdPaciente']);
	$FechaHoraInicioCaso = blancoSiVacioONotSet($_POST['FechaHoraInicioCaso']);
	$Terminado = blancoSiVacioONotSet($_POST['Terminado']);
	$IdIPSCaso = blancoSiVacioONotSet($_POST['IdIPSCaso']);
	$UsuarioID = blancoSiVacioONotSet($_POST['UsuarioID']);
	
	$sqlInsert = "INSERT INTO casos(

	IdPaciente,
	FechaHoraInicioCaso, 
	Terminado,
	IdIPSCaso,
	UsuarioID
	) 
	VALUES ('$IdPaciente','$FechaHoraInicioCaso','$Terminado','$IdIPSCaso','$UsuarioID')";

	$resultado = mysqli_query($con, $sqlInsert) or die("Error al insertar caso general: " . mysqli_error($con) . " sql= " . $sqlInsert);
			
	if ($resultado <> 1){
		echo "Fallo insertar Caso:" . $sqlInsert;
	} else 	{
		$sql = "SELECT * FROM casos WHERE UsuarioID='$UsuarioID' ORDER BY IdCaso DESC LIMIT 1";
		$resultado = mysqli_query($con, $sql) or die("Error al leer caso general: " . mysqli_error($con) . " sql= " . $sql);
		
		if ($resultado) {
			$numfilas = mysqli_num_rows($resultado);
			
			if ($numfilas == 1) {
				$row = mysqli_fetch_array($resultado);
				$IdCaso = $row['IdCaso'];
				echo $IdCaso;
			} else {
				echo "Fallo insertar Caso. numfilas=" . $numfilas . " sql: " . $sql ;
			}
			
		} else {
			echo "Fallo insertar Caso. No se verificó el insert:" . $sql;
		}
	}
}
 
mysqli_close($con);
?>



