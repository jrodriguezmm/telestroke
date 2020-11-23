<?php

session_start();

include "../db.php";
 
	
$AgregadosMatriz = 0;
$resultadoFinal = 0;
$errorCrear = 0;
$idMatrizEvalNew = -10;
	
if ( (!isset($_POST['nombreNuevaMatrizEval']))  || (!isset($_POST['descripcionMatEval'])) ){
	$resultadoFinal = -2;
	$errorCrear = 1;
} else {

	$nombreNuevaMatrizEval = blancoSiVacioONotSet($_POST['nombreNuevaMatrizEval']);
	$descripcionMatEval = blancoSiVacioONotSet($_POST['descripcionMatEval']);

	$sqlInsert = "INSERT INTO matriceseval (MatEval, DescripcionMatEval) VALUES ('$nombreNuevaMatrizEval', '$descripcionMatEval')";
	$resultInsert = mysqli_query($con, $sqlInsert) or die("Error Insert:"  . mysqli_error($con) . " sqlInsert" . $sqlInsert);	
	
	if ($resultInsert <> 1){
		$errorCrear = 1;
		$resultadoFinal = -3;
	
	} else {
	
		$AgregadosMatriz = 1;											
					
		$sqlMatrices = 'SELECT * FROM matriceseval WHERE MatEval = "' . $nombreNuevaMatrizEval . '"';
		$resultMatrices = mysqli_query($con, $sqlMatrices) or die("Error select:"  . mysqli_error($con) . " sqlMatrices" . $sqlMatrices);
			
		if(!(mysqli_num_rows($resultMatrices) > 0)) {
			$errorCrear = 1;
			$resultadoFinal = -4;
			$AgregadosMatriz = 0;
			$idMatrizEvalNew = -3;
		} else {
			$AgregadosMatriz = 1;
			$errorCrear = 0;
			
			// Traer ID de la nueva matriz adicionada
			$row = mysqli_fetch_array($resultMatrices);
			$idMatrizEvalNew = $row['IdMatrizEval'];
		}	
	}
}

if ($errorCrear == 0){
	$resultadoFinal = $idMatrizEvalNew;
}
echo $resultadoFinal;

mysqli_close($con);

?>
