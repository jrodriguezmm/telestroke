<?php

session_start();

include "../../db.php"; 
	
if ( (!isset($_POST['IdCaso'])) || (!isset($_POST['UsuarioID'])) || (!isset($_POST['IdIPSEscenario'])) || (!isset($_POST['ConsecutivoAdmision']))  ){
	echo -2;
} else {
		
	$sqlInsert = "INSERT INTO escenario3(
		IdCaso,
		IdIPSEscenario,
		EstadoEdicion,
		EscenarioCerrado,
		FechaHoraInicioEscenario,
		ConsecutivoAdmision,
		UsuarioID
	) 
	VALUES (" . 
		nullSiVacioONotSet($_POST['IdCaso']) . "," .
		nullSiVacioONotSet($_POST['IdIPSEscenario']) . "," .
		'0' . "," .
		'0' . "," .
		nullSiVacioONotSet($_POST['FechaHoraInicioEscenario']) . "," .
		nullSiVacioONotSet($_POST['ConsecutivoAdmision']) . "," .
		nullSiVacioONotSet($_POST['UsuarioID']) . ")";

	$resultado = mysqli_query($con, $sqlInsert) or die("Error al insertar Escenario 3: " . mysqli_error($con) );
			
		if ($resultado <> 1){
			echo "Fallo insertar Caso:" . $sqlInsert;
		} else
		{
			$sql = "SELECT * FROM escenario3 WHERE UsuarioID='" . $_POST['UsuarioID'] . "' AND IdCaso = '" . $_POST['IdCaso'] . "' ORDER BY IdEscenario DESC LIMIT 1";
			$resultado = mysqli_query($con, $sql) or die("Error al leer caso general: " . mysqli_error($con) . " sql= " . $sql);
			
			if ($resultado) {
				$numfilas = mysqli_num_rows($resultado);
				
				if ($numfilas == 1) {
					$row = mysqli_fetch_array($resultado);
					$IdCaso = $row['IdEscenario'];
					echo $IdCaso;
				} else {
					echo "Falló insertar Escenario 3. numfilas=" . $numfilas . " sql: " . $sql ;
				}
				
			} else {
				echo "Falló insertar Escenario 3. No se verificó el insert:" . $sql;
			}
		}
}



