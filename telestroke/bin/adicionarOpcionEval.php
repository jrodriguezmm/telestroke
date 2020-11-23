<?php

include "../db.php";
   
	
$ResultadoFinal = 0;
			
if ( (!isset($_POST['IdMatricesEvalGrupos'])) || (!isset($_POST['Orden'])) || (!isset($_POST['MatrizEvalOpcion'])) || (!isset($_POST['Puntaje'])) ){
	$ResultadoFinal = -2;
} else
{
	$IdMatricesEvalGrupos = blancoSiVacioONotSet($_POST['IdMatricesEvalGrupos']);
	$Orden = blancoSiVacioONotSet($_POST['Orden']);
	$MatrizEvalOpcion = blancoSiVacioONotSet($_POST['MatrizEvalOpcion']);
	$Puntaje = blancoSiVacioONotSet($_POST['Puntaje']); 

	$sql = "SELECT * FROM matricesevalgruposopciones WHERE (IdMatricesEvalGrupos = '" . $IdMatricesEvalGrupos . "' AND MatrizEvalOpcion = '" . $MatrizEvalOpcion . "')";
	$result = mysqli_query($con, $sql);

	if (mysqli_num_rows($result) > 0){
		$ResultadoFinal =  "Error: La Opción ya existe.";
	} else
	{
		$sqlInsert = "INSERT INTO matricesevalgruposopciones(IdMatricesEvalGrupos,Orden,MatrizEvalOpcion,Puntaje)
		VALUES ('" . $IdMatricesEvalGrupos . "','" . $Orden . "','" . $MatrizEvalOpcion . "','" . $Puntaje . "')";
		$resultInsert = mysqli_query($con, $sqlInsert);
		
		if ($resultInsert <> 1){
			$ResultadoFinal =  "Fallo insertar opción: " . $sqlInsert; 
		} else
		{
			$ResultadoFinal =  "Opción Insertada.";
		}								
	}
}	

echo $ResultadoFinal;

mysqli_close($con);
?>

