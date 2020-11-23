<?php

include "../db.php";

$IdIPS= $_POST['IdIPS'];
$CODDPTO= blancoSiVacioONotSet($_POST['CODDPTO']);
$CODMPIO= blancoSiVacioONotSet($_POST['CODMPIO']);
$IdTipoEscenario= blancoSiVacioONotSet($_POST['IdTipoEscenario']);
$CodigoPrestador= blancoSiVacioONotSet($_POST['CodigoPrestador']);
$Prestador= blancoSiVacioONotSet($_POST['Prestador']);
$Direccion= blancoSiVacioONotSet($_POST['Direccion']);
$Telefono= blancoSiVacioONotSet($_POST['Telefono']);

	$sql = "UPDATE ips SET 
				CODDPTO = '$CODDPTO',
				CODMPIO = '$CODMPIO',
				IdTipoEscenario = '$IdTipoEscenario',
				CodigoPrestador = '$CodigoPrestador',
				Prestador = '$Prestador',
				Direccion = '$Direccion',
				Telefono = '$Telefono'
			WHERE IdIPS = '$IdIPS'";
			
	$result = mysqli_query($con, $sql) or die("Error al salvar IPS" . mysqli_error($con) . " sql=". $sql);
	echo $result;

mysqli_close($con);
?>
