<?php
include "../db.php";

$sql = "SELECT * FROM matricesevalgruposopciones WHERE IdMatricesEvalGruposOpciones = " . $_POST['idBorrar'];
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0){

    $sqlDelete = "DELETE FROM matricesevalgruposopciones WHERE IdMatricesEvalGruposOpciones = " . $_POST['idBorrar'];
    $result = mysqli_query($con, $sqlDelete) or die('Error: La operación falló al borrar: ' . mysqli_error($con));
    
		if ($result <> 1){
			echo "Falló borrar Opción:" . $sqlDelete;
		} else
		{
			echo "Opción borrada.";
		}       
}
else{
    echo "Error: No existe la opción a borrar.";
}
mysqli_close($con);
?>
