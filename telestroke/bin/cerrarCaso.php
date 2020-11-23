<?php

include "../db.php";

if ( (!isset($_POST['IdCaso'])) || (!isset($_POST['Terminado'])) ) {
	echo -2;
} else {

	$sql = "UPDATE casos SET 
				Terminado = " . nullSiVacioONotSet($_POST['Terminado']) . ",
				FechaHoraCierreCaso = " . nullSiVacioONotSet($_POST['FechaHoraCierreCaso']) . "
			WHERE IdCaso = " . nullSiVacioONotSet($_POST['IdCaso']);
			
	$result = mysqli_query($con, $sql) or die("Error al cerrar IdCaso:". $IdCaso . mysqli_error($con) . " sql=". $sql);
	echo $result;
}

mysqli_close($con);
?>
