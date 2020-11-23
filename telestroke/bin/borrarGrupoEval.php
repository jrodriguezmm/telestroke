<?php
include "../db.php";

$sql = "SELECT * FROM matricesevalgrupos WHERE IdMatricesEvalGrupos = " . $_POST['idBorrar'];
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0){
    
    $sqlDelete = "DELETE FROM matricesevalgrupos WHERE IdMatricesEvalGrupos = " . $_POST['idBorrar'];
    $result = mysqli_query($con, $sqlDelete) or die('Error. La operación falló al borrar el Grupo.');
    
		if ($result <> 1){
			echo "Fallo borrar Grupo:" . $sqlDelete;
		} else
		{
			echo "Grupo borrado.";
		}    
}
else {
    echo "Error: No existe el Grupo a borrar: " . $sql;
}
mysqli_close($con);
?>
