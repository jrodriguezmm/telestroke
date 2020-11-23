<?php

$IdPaciente = $_POST['IdPaciente'];

include "../db.php";

$result = mysqli_query($con, "SELECT * FROM pacientes WHERE IdPaciente = '$IdPaciente'");

if (mysqli_num_rows($result) > 0) {

       $result = mysqli_query($con, "DELETE FROM pacientes WHERE IdPaciente= '" . $IdPaciente."'");
       
		if ($result){
			echo "El paciente $IdPaciente fue satisfactoriamente eliminado.";
		} else {
			echo "Error. La operación falló al eliminar al paciente $IdPaciente.";
		}
} else {
	echo "Error. El paciente $IdPaciente no se encuentra.";
}

mysqli_close($con);
?>