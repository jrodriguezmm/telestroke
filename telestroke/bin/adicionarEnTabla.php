<?php
  
include "../db.php";
	
$NombreTabla= ($_POST['NombreTabla']);
$NombreId= ($_POST['NombreId']);
$NombreCampo= ($_POST['NombreCampo']);

$IdCampo= blancoSiVacioONotSet($_POST['IdCampo']);
$Campo= blancoSiVacioONotSet($_POST['Campo']);



$sql = "SELECT * FROM $NombreTabla WHERE ($NombreId = '" . $IdCampo . "')";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) == 0)
{
	$sqlInsert = "INSERT INTO $NombreTabla($NombreId,$NombreCampo) VALUES ('$IdCampo','$Campo')";
	$result = mysqli_query($con, $sqlInsert);
    
	if ($result){
		echo $sqlInsert="El nuevo registro fue agregado.";
	} else {
		echo $sqlInsert = "Error. La operación falló al insertar un nuevo registro con Id($IdCampo).";
	}
} else { 
	echo $sqlInsert = "Error. El Id($IdCampo) del nuevo registro no se encuentra disponible.";
}

mysqli_close($con);

?>