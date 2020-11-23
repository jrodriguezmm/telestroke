<?php

include "../db.php"; 
	
$formatoFecha = ($_POST['formatoFecha']);

$sql = "SELECT NOW() as fechahora, CURDATE() as fecha, CURTIME() as hora";
$result = mysqli_query($con, $sql) or die("Error en getDate: " . mysqli_error($con));
$row = mysqli_fetch_array($result);

echo $row[$formatoFecha];

mysqli_close($con);

?>