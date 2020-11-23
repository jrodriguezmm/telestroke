<?php

include "../db.php"; 
	
$tiempoI = ($_POST['tiempoI']);
$tiempoF = ($_POST['tiempoF']);
$tipo = ($_POST['tipo']);

$resultado="Error";

if ($tipo == 'dias') {
	$sql = "SELECT DATEDIFF('$tiempoF','$tiempoI') as diferencia";
	$result = mysqli_query($con, $sql) or die("Error getTimeDiff: " . $sql . " : " . mysqli_error($con));
	$row = mysqli_fetch_array($result);
	$resultado = $row['diferencia'];
}

if ($tipo == 'horas') {
	$sql = "SELECT TIMEDIFF('$tiempoF', '$tiempoI') as diferencia";
	$result = mysqli_query($con, $sql) or die("Error getTimeDiff: " . $sql . " : " . mysqli_error($con));
	$row = mysqli_fetch_array($result);
	$resultado  = $row['diferencia'];
}

echo $resultado;

mysqli_close($con);

?>