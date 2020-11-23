<?php
  
include "../db.php";
	
$IdIPS = ($_POST['IdIPS']);

$result = mysqli_query($con, "SELECT * FROM ips WHERE IdIPS = '" . $IdIPS."'");

if (mysqli_num_rows($result) > 0) {

       $result = mysqli_query($con, "DELETE FROM ips WHERE IdIPS= '" . $IdIPS."'");
       
		if ($result){
			echo "La IPS $IdIPS fue satisfactoriamente eliminada.";
		} else {
			echo "Error. La operación falló al eliminar la IPS $IdIPS.";
		}
} else {
	echo "Error. La IPS $IdIPS no se encuentra.";
}

mysqli_close($con);
?>