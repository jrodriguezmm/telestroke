<?php

session_start();

include "../../db.php";
	
if ( (!isset($_POST['IdEscenario'])) || (!isset($_POST['IdMatrizEval'])) ){
	echo -2;
} else {

	$IdTipoEscenario = ($_POST['IdTipoEscenario']);
	$IdEscenario = ($_POST['IdEscenario']);
	$IdMatrizEval = ($_POST['IdMatrizEval']);
		
	$sqlDelete = "DELETE casosmatriceseval.*
					FROM (casosmatriceseval INNER JOIN matricesevalgruposopciones ON casosmatriceseval.IdMatricesEvalGruposOpciones = matricesevalgruposopciones.IdMatricesEvalGruposOpciones) INNER JOIN matricesevalgrupos ON matricesevalgruposopciones.IdMatricesEvalGrupos = matricesevalgrupos.IdMatricesEvalGrupos
					WHERE (((casosmatriceseval.IdEscenario)='$IdEscenario') AND ((casosmatriceseval.IdTipoEscenario)='$IdTipoEscenario') AND ((matricesevalgrupos.IdMatrizEval)='$IdMatrizEval'))";
	
	
	$resultado = mysqli_query($con, $sqlDelete) or die("Error al borrar opción de matriz: " . mysqli_error($con) . " sql= " . $sqlDelete);
	
	if ($resultado <> 1){
		echo "Fallo borrar opción de matriz:" . $sqlDelete;
	} else {
		echo 1;
	}
	
}
 
mysqli_close($con);
?>



