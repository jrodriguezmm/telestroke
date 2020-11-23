<?php 

session_start();

	function blancoSiVacioONotSet($q){
		if (isset($q)){
			return $q;
		} else {
			return "";
		}
	}   
	
if ( (!isset($_POST['campo']))  || (!isset($_POST['valor'])) ){
	echo "setPHPVariables: error en parámetros.";
} else {
	$campo = blancoSiVacioONotSet($_POST['campo']);
	$valor = blancoSiVacioONotSet($_POST['valor']);
	$_SESSION[$campo] = $valor;
	echo 0;
}

?>