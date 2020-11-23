<?php

session_start();

include "../../db.php";
	
if ( (!isset($_POST['IdEscenario'])) || (!isset($_POST['IdMatricesEvalGruposOpciones'])) ){
	echo -2;
} else {

	$IdTipoEscenario = ($_POST['IdTipoEscenario']);
	$IdEscenario = ($_POST['IdEscenario']);
	
	$IdMatricesEvalGruposOpciones = ($_POST['IdMatricesEvalGruposOpciones']);
			
	$sqlInsert = "INSERT INTO casosmatriceseval(IdTipoEscenario,IdEscenario,IdMatricesEvalGruposOpciones) VALUES ('$IdTipoEscenario','$IdEscenario','$IdMatricesEvalGruposOpciones')";
	$resultado = mysqli_query($con, $sqlInsert) or die("Error al insertar escenario e1: " . mysqli_error($con) . " sql= " . $sqlInsert);
			
	if ($resultado <> 1){
		echo "Falló insertar opción de matriz:" . $sqlInsert;
	} else {
		echo 1;
	}
	
}
 
mysqli_close($con);
?>



