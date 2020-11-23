<?php
 
include "../db.php";	

$NombreTabla= ($_POST['NombreTabla']);
$NombreId= ($_POST['NombreId']);
$IdCampo= ($_POST['IdCampo']);



$result = mysqli_query($con, "SELECT * FROM $NombreTabla WHERE $NombreId = '" . $IdCampo."'");

if (mysqli_num_rows($result) > 0) {

       $result = mysqli_query($con, "DELETE FROM $NombreTabla WHERE $NombreId = '" . $IdCampo."'");
       
		if ($result){
			echo "El registro $IdCampo fue satisfactoriamente eliminado.";
		} else {
			echo "Error. La operación falló al eliminar el registro $IdCampo.";
		}
} else {
	echo "Error. El escenario $IdTipoEscenario no se encuentra.";
}

mysqli_close($con);
?>