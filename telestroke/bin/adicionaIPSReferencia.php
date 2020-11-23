<?php
include "../db.php";

if ( (!isset($_POST['IdIPSRemitente']) || !isset($_POST['IdIPSReferencia']))  ){
	echo -2;
} else {

	$sql = "SELECT * FROM ipsreferencias WHERE (IdIPSRemitente = '" . $_POST['IdIPSRemitente'] . "' AND IdIPSReferencia = '". $_POST['IdIPSReferencia'] . "')";
	$result = mysqli_query($con, $sql);

	if (mysqli_num_rows($result) <> 0){
		echo "La IPS ya tiene esta Referencia.";
	} else {
		$sqlInsert = "INSERT INTO ipsreferencias(IdIPSRemitente,IdIPSReferencia) VALUES ('" . $_POST['IdIPSRemitente'] . "','" . $_POST['IdIPSReferencia']. "')";
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
