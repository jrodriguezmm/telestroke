<?php

//Usuario db

$db_user = "root";

//Pass db

$db_pass = "";

//Base de datos

$db = "dbtelestroke";

//Host de la db

$db_host = "localhost";

$con = mysqli_connect($db_host, $db_user, $db_pass, $db) or die("Telestroke - Falló en mysqli_connect(): " . mysqli_error($con));

mysqli_query($con,"SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
	
function myutf8_decode($dato){
  //  return utf8_decode($dato);
    return $dato;
}

function blancoSiVacioONotSet($q){
	if (!isset($q)){
		return "";
	} else {
		if (trim($q) ===''){
			return "";
		} else {
			return $q;
		}
	}
}  

function nullSiVacioONotSet($q){
	if (!isset($q)){
		return "NULL";
	} else {
		if (trim($q) ===''){
			return "NULL";
		} else {
			return " \"$q\" ";
		}
	}
} 

function esVacioONull($q){
    return (!isset($q) || trim($q)==='');
}

function optionSelected($valorLista, $valorEscenario){

	if (esVacioONull($valorEscenario) && ($valorLista == '-1')){
			return " selected ";
	}
	
	if ( esVacioONull($valorLista) || esVacioONull($valorEscenario) ){
		return "";
	} else {
		if ($valorLista == $valorEscenario){
			return " selected ";
		} else {
			return "";
		}
	}
}

function campoDefaultSiNoEsNumerico($q, $defecto){
	if (!isset($q)){
		return '$defecto';
	} else {
		if (trim($q) ===''){
			return '$defecto';
		} else {
			if (is_nan($q)){
				return '$defecto';
			} else {
				return $q;
			}
		}
	}
}
	
?>
