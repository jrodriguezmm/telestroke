<?php
session_start();

include "../db.php";
	
$tipo = blancoSiVacioONotSet($_POST['tipo']);
                            
if ($tipo == "opcion") {
	
	$IdMatricesEvalGruposOpciones = blancoSiVacioONotSet($_POST['IdMatricesEvalGruposOpciones']);
	
	$Orden = blancoSiVacioONotSet($_POST['Orden']);
	$MatrizEvalOpcion = blancoSiVacioONotSet($_POST['MatrizEvalOpcion']);
	$Puntaje = blancoSiVacioONotSet($_POST['Puntaje']);

    $sql = "UPDATE matricesevalgruposopciones SET MatrizEvalOpcion = '$MatrizEvalOpcion', Orden = '$Orden', Puntaje = '$Puntaje' WHERE IdMatricesEvalGruposOpciones = '$IdMatricesEvalGruposOpciones'";
    $result = mysqli_query($con, $sql) or die("Error al actualizar opción: " . mysqli_error($con) . " sql=" . $sql);
    echo $result;

} else if ($tipo == "grupo") {

	$IdMatricesEvalGrupos  = blancoSiVacioONotSet($_POST['IdMatricesEvalGrupos']);

	$Orden = blancoSiVacioONotSet($_POST['Orden']);
	$MatrizEvalGrupo = blancoSiVacioONotSet($_POST['MatrizEvalGrupo']);

    $sql = "UPDATE matricesevalgrupos SET MatrizEvalGrupo = '$MatrizEvalGrupo', Orden = '$Orden' WHERE IdMatricesEvalGrupos = '$IdMatricesEvalGrupos'";
    $result = mysqli_query($con, $sql) or die("Error al actualizar grupo: " . mysqli_error($con) . " sql=" . $sql);
    echo $result;
}

mysqli_close($con);

?>
