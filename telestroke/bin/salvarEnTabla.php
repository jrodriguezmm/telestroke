<?php

include "../db.php";

$NombreTabla = ($_POST['NombreTabla']);
$NombreId = ($_POST['NombreId']);
$NombreCampo = ($_POST['NombreCampo']);

$IdCampo = ($_POST['IdCampo']);
$Campo = blancoSiVacioONotSet($_POST['Campo']);

	$sql = "UPDATE $NombreTabla SET $NombreCampo = '$Campo' WHERE $NombreId = '$IdCampo'";
	$result = mysqli_query($con, $sql);
	echo $result;

mysqli_close($con);
?>
