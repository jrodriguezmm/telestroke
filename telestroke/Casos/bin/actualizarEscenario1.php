<?php

session_start();

// print_r($_POST);

include "../../db.php";    

if ( (!isset($_POST['IdEscenario'])) || (!isset($_POST['IdCaso'])) || (!isset($_POST['UsuarioID']))  || (!isset($_POST['IdIPSEscenario']))  || (!isset($_POST['FechaHoraInicioEscenario'])) ) {
	echo -2;
} else {

	$sql = "UPDATE escenario1 SET 
				
			listaCampos  = " . nullSiVacioONotSet($_POST['listaCampos']) . ",
			ultimomodulo  = " . nullSiVacioONotSet($_POST['ultimomodulo']) . ",
			
			TimeFinTriage = " . nullSiVacioONotSet($_POST['TimeFinTriage']) . ",
			TimeFinTiempoEvento = " . nullSiVacioONotSet($_POST['TimeFinTiempoEvento']) . ",
			TimeFinActivacionCodigoACV = " . nullSiVacioONotSet($_POST['TimeFinActivacionCodigoACV']) . ",
			TimeFinHistoriaClinica = " . nullSiVacioONotSet($_POST['TimeFinHistoriaClinica']) . ",
			TimeFinLaboratorio = " . nullSiVacioONotSet($_POST['TimeFinLaboratorio']) . ",
			TimeFinExamenFisico = " . nullSiVacioONotSet($_POST['TimeFinExamenFisico']) . ",
			
			TimeFinEscalaABCD2 = " . nullSiVacioONotSet($_POST['TimeFinEscalaABCD2']) . ",
			TimeFinEscalaFASTED = " . nullSiVacioONotSet($_POST['TimeFinEscalaFASTED']) . ",
			TimeFinCircPosterior = " . nullSiVacioONotSet($_POST['TimeFinCircPosterior']) . ",
			
			UsuarioID = " . nullSiVacioONotSet($_POST['UsuarioID']) . ",
			IdCaso = " . nullSiVacioONotSet($_POST['IdCaso']) . ",	
			EstadoEdicion  =  " .  nullSiVacioONotSet($_POST['EstadoEdicion'])  . ",				
							
			IdIPSEscenario = " . nullSiVacioONotSet($_POST['IdIPSEscenario']) . ",
			FechaHoraInicioEscenario = " . nullSiVacioONotSet($_POST['FechaHoraInicioEscenario']) . ",
			ConsecutivoAdmision = " . nullSiVacioONotSet($_POST['ConsecutivoAdmision']) . ",	
			EscenarioCerrado = " . nullSiVacioONotSet($_POST['EscenarioCerrado']) . ",
			FechaHoraCierreEscenario = " . nullSiVacioONotSet($_POST['FechaHoraCierreEscenario']) . ",
							
			NivelTriage  =  " .  nullSiVacioONotSet($_POST['NivelTriage'])  . ",
			TriageBreveHC  =  " .  nullSiVacioONotSet($_POST['TriageBreveHC'])  . ",
			TriageMedioIngreso  =  " .  nullSiVacioONotSet($_POST['TriageMedioIngreso'])  . ",
			EscalaBEFAST  =  " .  nullSiVacioONotSet($_POST['EscalaBEFAST'])  . ", 
			CodigoACVActivado  =  " .  nullSiVacioONotSet($_POST['CodigoACVActivado'])  . ",				
							
			Edad = " . nullSiVacioONotSet($_POST['Edad']) . ",
			SignosSintomasNeurologicos = " . nullSiVacioONotSet($_POST['SignosSintomasNeurologicos']) . ",
			AntecedentesMedicosRelevantes = " . nullSiVacioONotSet($_POST['AntecedentesMedicosRelevantes']) . ",						
			HallazgosRelevantes = " . nullSiVacioONotSet($_POST['HallazgosRelevantes']) . ",								
			AntecedenteAnticoagulantesOrales = " . nullSiVacioONotSet($_POST['AntecedenteAnticoagulantesOrales']) . ",
			IdAnticoagulanteOral = " . nullSiVacioONotSet($_POST['IdAnticoagulanteOral']) . ",
							
			LabGlucometria = " . nullSiVacioONotSet($_POST['LabGlucometria']) . ",	
			
			PersistenSintomasLuegoDextrosa = " . nullSiVacioONotSet($_POST['PersistenSintomasLuegoDextrosa']) . ",	
			PersistenSintomasGlasgowMayor8 = " . nullSiVacioONotSet($_POST['PersistenSintomasGlasgowMayor8']) . ",	
			
			ExamenNeurologico = " . nullSiVacioONotSet($_POST['ExamenNeurologico']) . ",
			HuboReanimacionCardiopulmonar = " . nullSiVacioONotSet($_POST['HuboReanimacionCardiopulmonar']) . ",
			EscalaGlasgow = " . nullSiVacioONotSet($_POST['EscalaGlasgow']) . ",
			
			FechaLlegadaPuertaUrgencias = " . nullSiVacioONotSet($_POST['FechaLlegadaPuertaUrgencias']) . ",
			HoraLlegadaPuertaUrgencias = " . nullSiVacioONotSet($_POST['HoraLlegadaPuertaUrgencias']) . ",		
			WakeUpStroke = " . nullSiVacioONotSet($_POST['WakeUpStroke']) . ",		
			FechaInicioSintomas = " . nullSiVacioONotSet($_POST['FechaInicioSintomas']) . ",
			HoraInicioSintomas = " . nullSiVacioONotSet($_POST['HoraInicioSintomas']) . ",
			TiempoEvolucionHoras = " . nullSiVacioONotSet($_POST['TiempoEvolucionHoras']) . ",
			IdTipoTiempo = " . nullSiVacioONotSet($_POST['IdTipoTiempo']) . ",				
																							
			AsemejaACVoMimic = " . nullSiVacioONotSet($_POST['AsemejaACVoMimic']) . ",
			EscalaABCD2 = " . nullSiVacioONotSet($_POST['EscalaABCD2']) . ",
			RiesgoACVa2dias = " . nullSiVacioONotSet($_POST['RiesgoACVa2dias']) . ",
			RiesgoACVa7dias = " . nullSiVacioONotSet($_POST['RiesgoACVa7dias']) . ",
			RiesgoACVa90dias = " . nullSiVacioONotSet($_POST['RiesgoACVa90dias']) . ",
			InicioEstatina = " . nullSiVacioONotSet($_POST['InicioEstatina']) . ",
							
			EscalaFASTED = " . nullSiVacioONotSet($_POST['EscalaFASTED']) . ",
			PredictorACVIsquemicoCircPosterior = " . nullSiVacioONotSet($_POST['PredictorACVIsquemicoCircPosterior']) . ",
			IdTipoCircIsque = " . nullSiVacioONotSet($_POST['IdTipoCircIsque']) . ",
			
			SugerenciaRemision = " . nullSiVacioONotSet($_POST['SugerenciaRemision']) . ",
			IdIPSReferencia = " . nullSiVacioONotSet($_POST['IdIPSReferencia']) . ",
			IdTipoEscenarioReferencia = " . nullSiVacioONotSet($_POST['IdTipoEscenarioReferencia']) . ",				
			FechaHoraRemisionAIPSReferencia = " . nullSiVacioONotSet($_POST['FechaHoraRemisionAIPSReferencia']) . "
							 
		WHERE IdEscenario = " . nullSiVacioONotSet($_POST['IdEscenario']);
		
		
	$resultado = mysqli_query($con, $sql) or die("Error al actualizar el escenario: " . mysqli_error($con) . " sql= " . $sql);
		
	if ($resultado <> 1){
		echo "Fallo actualizar el escenario:" . $sql;
	} else 	{
		echo 1;
	}
}
 
mysqli_close($con);
?>



