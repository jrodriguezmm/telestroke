<?php
include "../db.php";

if ( (!isset($_POST['UsuarioID']) || !isset($_POST['IdIPS']))  ){
	echo -2;
} else {

	$sql = "SELECT * FROM ipsusuarios WHERE UsuarioID = '" . $_POST['UsuarioID'] . "' AND IdIPS = ". $_POST['IdIPS'];
	$result = mysqli_query($con, $sql);

	if (mysqli_num_rows($result) <> 0){
		echo "El Usuario ya tiene esta IPS.";
	} else {
		$sqlInsert = "INSERT INTO ipsusuarios(UsuarioID,IdIPS) VALUES ('". $_POST['UsuarioID'] ."','" . $_POST['IdIPS'] . "')";
		$resultInsert = mysqli_query($con, $sqlInsert);
		
		if ($resultInsert <> 1){
			echo "Fallo insertar IPS:" . $sqlInsert;
		} else {
			echo 1;
		}									
	}
}

mysqli_close($con);
?>
