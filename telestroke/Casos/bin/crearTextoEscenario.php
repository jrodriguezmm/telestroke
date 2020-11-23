<?php

session_start();

// print_r($_GET); 
	
if ((!isset($_GET['listaCampos'])) || (!isset($_GET['IdCaso'])) || (!isset($_GET['IdEscenario'])) ) {
	echo -2;
} else {

	$listaCampos = $_GET['listaCampos'];
	$IdCaso = $_GET['IdCaso'];
	$IdEscenario = $_GET['IdEscenario'];

	$filename = 'CasoEscenario-' . $IdCaso . '-' . $IdEscenario . '.txt';
	$contentDispositionField = 'Content-Disposition: attachment; ' . sprintf('filename="%s"; ', $filename);

	$listaCampos = utf8_decode($listaCampos);
	$lineas = explode("|", $listaCampos);
	$lineasLen=count($lineas);
	
	header('Content-Type: application/text/plain');
    header($contentDispositionField);
    header('Cache-Control: max-age=0');
	
	for($i=0; $i<$lineasLen; $i++){
	  echo $lineas[$i];
	  echo "\n";
	}
	
	exit;
}

?>