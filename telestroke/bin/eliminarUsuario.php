<?php

include "../db.php"; 
	
$UsuarioID = ($_POST['UsuarioID']);

$result = mysqli_query($con, "SELECT * FROM usuariosacv WHERE UsuarioID = '" . $UsuarioID."'");

if (mysqli_num_rows($result) > 0) {

       $result = mysqli_query($con, "DELETE FROM usuariosacv WHERE UsuarioID= '" . $UsuarioID."'");
       
		if ($result){
			echo "El usuario $UsuarioID fue satisfactoriamente eliminado.";
		} else {
			echo "Error. La operación falló al eliminar al usuario $UsuarioID.";
		}
} else {
	echo "Error. El usuario $UsuarioID no se encuentra.";
}

mysqli_close($con);
?>