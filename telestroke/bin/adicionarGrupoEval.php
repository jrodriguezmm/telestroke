<?php
include "../db.php";

if ( (!isset($_POST['idMatrizEvalSelected'])) || (!isset($_POST['nombreNuevoGrupo'])) || (!isset($_POST['ordenNuevoGrupo']))  ){
	echo -2;
} else {

	$sql = "SELECT * FROM matricesevalgrupos WHERE (MatrizEvalGrupo = '" . $_POST['nombreNuevoGrupo'] . "' AND IdMatrizEval = '" . $_POST['idMatrizEvalSelected'] . "')";
	$result = mysqli_query($con, $sql);

	if (mysqli_num_rows($result) <> 0){
		echo "El Grupo ya existe.";
	} else {
		$sqlInsert = "INSERT INTO matricesevalgrupos(IdMatrizEval,Orden,MatrizEvalGrupo) VALUES ('" . $_POST['idMatrizEvalSelected'] . "','" . $_POST['ordenNuevoGrupo'] . "','" . $_POST['nombreNuevoGrupo']. "')";
		$resultInsert = mysqli_query($con, $sqlInsert);
		
		if ($resultInsert <> 1){
			echo "Fallo insertar Grupo:" . $sqlInsert;
		} else {
			echo 1;
		}									
	}
}

mysqli_close($con);
?>
