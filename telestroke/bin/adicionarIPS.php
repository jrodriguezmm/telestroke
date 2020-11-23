<?php

include "../db.php";  
	
$CODDPTO= blancoSiVacioONotSet($_POST['CODDPTO']);
$CODMPIO= blancoSiVacioONotSet($_POST['CODMPIO']);
$IdTipoEscenario= blancoSiVacioONotSet($_POST['IdTipoEscenario']);
$CodigoPrestador= blancoSiVacioONotSet($_POST['CodigoPrestador']);
$Prestador= blancoSiVacioONotSet($_POST['Prestador']);
$Direccion= blancoSiVacioONotSet($_POST['Direccion']);
$Telefono= blancoSiVacioONotSet($_POST['Telefono']);


$sql = "SELECT * FROM ips WHERE (CodigoPrestador  = $CodigoPrestador)";

$result = mysqli_query($con, $sql) or die("Error al leer ips. sql: " . $sql . "; " . mysqli_error($con));
$numrows = mysqli_num_rows($result);

if ($numrows == 0) {

	$sqlInsert = "INSERT INTO ips(CODDPTO,CODMPIO,IdTipoEscenario,CodigoPrestador,Prestador,Direccion,Telefono) 
			VALUES ('$CODDPTO','$CODMPIO','$IdTipoEscenario','$CodigoPrestador','$Prestador','$Direccion','$Telefono')";	
	
	$result = mysqli_query($con, $sqlInsert);
	
	if ($result) {
		echo "La nueva IPS fue agregada";
	} else {
		echo "Error. La operación falló al insertar nueva IPS. Sql:  " . $sqlInsert . " mysqli_error: " . mysqli_error($con) ;
	}
} else { 
	if ($numrows > 0) {
		echo "Error al crear IPS. El código del nuevo prestador ya existe: " . $sql;
	}
}

mysqli_close($con);

?>
