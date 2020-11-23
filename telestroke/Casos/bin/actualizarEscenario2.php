<?php

session_start();

//  print_r($_POST);

include "../../db.php";
           

if ( (!isset($_POST['IdEscenario'])) || (!isset($_POST['IdCaso'])) || (!isset($_POST['UsuarioID']))  || (!isset($_POST['IdIPSEscenario']))  || (!isset($_POST['FechaHoraInicioEscenario'])) ) {
	echo -2;
} else {

	$sql = "UPDATE escenario2 SET 

		listaCampos  = " . nullSiVacioONotSet($_POST['listaCampos']) . ",
		ultimomodulo  = " . nullSiVacioONotSet($_POST['ultimomodulo']) . ",
			
		TimeFinTriage = " . nullSiVacioONotSet($_POST['TimeFinTriage']) . ",
		TimeFinTiempoEvento = " . nullSiVacioONotSet($_POST['TimeFinTiempoEvento']) . ",
		TimeFinActivacionCodigoACV = " . nullSiVacioONotSet($_POST['TimeFinActivacionCodigoACV']) . ",
		TimeFinHistoriaClinica = " . nullSiVacioONotSet($_POST['TimeFinHistoriaClinica']) . ",
		TimeFinLaboratorio = " . nullSiVacioONotSet($_POST['TimeFinLaboratorio']) . ",
		TimeFinExamenFisico = " . nullSiVacioONotSet($_POST['TimeFinExamenFisico']) . ",
		
		TimeFinEscalaABCD2 = " . nullSiVacioONotSet($_POST['TimeFinEscalaABCD2']) . ",
		
		TimeSugiereTACCraneoSimple = " . nullSiVacioONotSet($_POST['TimeSugiereTACCraneoSimple']) . ",
		TimeFinTipoACVenTAC = " . nullSiVacioONotSet($_POST['TimeFinTipoACVenTAC']) . ",
		TimeFinASPECTS = " . nullSiVacioONotSet($_POST['TimeFinASPECTS']) . ",
		TimeFinRiesgoTromboEndovenosa = " . nullSiVacioONotSet($_POST['TimeFinRiesgoTromboEndovenosa']) . ",
		TimeFinOclusionVasosGrandes = " . nullSiVacioONotSet($_POST['TimeFinOclusionVasosGrandes']) . ",
								
		UsuarioID = " . nullSiVacioONotSet($_POST['UsuarioID']) . ",
		IdCaso = " . nullSiVacioONotSet($_POST['IdCaso']) . ",
		EstadoEdicion = " . nullSiVacioONotSet($_POST['EstadoEdicion']) . ",

		IdIPSEscenario = " . nullSiVacioONotSet($_POST['IdIPSEscenario']) . ",
		FechaHoraInicioEscenario = " . nullSiVacioONotSet($_POST['FechaHoraInicioEscenario']) . ",
		ConsecutivoAdmision = " . nullSiVacioONotSet($_POST['ConsecutivoAdmision']) . ",
		EscenarioCerrado = " . nullSiVacioONotSet($_POST['EscenarioCerrado']) . ",
		FechaHoraCierreEscenario = " . nullSiVacioONotSet($_POST['FechaHoraCierreEscenario']) . ",

		CodigoACVActivadoPrehospitalario = " . nullSiVacioONotSet($_POST['CodigoACVActivadoPrehospitalario']) . ",
		
		NivelTriage = " . nullSiVacioONotSet($_POST['NivelTriage']) . ",
		TriageBreveHC = " . nullSiVacioONotSet($_POST['TriageBreveHC']) . ",
		TriageMedioIngreso = " . nullSiVacioONotSet($_POST['TriageMedioIngreso']) . ",
		EscalaBEFAST = " . nullSiVacioONotSet($_POST['EscalaBEFAST']) . ",
		EmergenciologoActivaCodigoACV = " . nullSiVacioONotSet($_POST['EmergenciologoActivaCodigoACV']) . ",
		CodigoACVActivado = " . nullSiVacioONotSet($_POST['CodigoACVActivado']) . ",

		FechaLlegadaPuertaUrgencias = " . nullSiVacioONotSet($_POST['FechaLlegadaPuertaUrgencias']) . ",
		HoraLlegadaPuertaUrgencias = " . nullSiVacioONotSet($_POST['HoraLlegadaPuertaUrgencias']) . ",
		WakeUpStroke = " . nullSiVacioONotSet($_POST['WakeUpStroke']) . ",
		FechaInicioSintomas = " . nullSiVacioONotSet($_POST['FechaInicioSintomas']) . ",
		HoraInicioSintomas = " . nullSiVacioONotSet($_POST['HoraInicioSintomas']) . ",
		TiempoEvolucionHoras = " . nullSiVacioONotSet($_POST['TiempoEvolucionHoras']) . ",
		IdTipoTiempo = " . nullSiVacioONotSet($_POST['IdTipoTiempo']) . ",

		Edad = " . nullSiVacioONotSet($_POST['Edad']) . ",
		SignosSintomasNeurologicos = " . nullSiVacioONotSet($_POST['SignosSintomasNeurologicos']) . ",
		AntecedentesMedicosRelevantes = " . nullSiVacioONotSet($_POST['AntecedentesMedicosRelevantes']) . ",
		HallazgosRelevantes = " . nullSiVacioONotSet($_POST['HallazgosRelevantes']) . ",
		AntecedenteAnticoagulantesOrales = " . nullSiVacioONotSet($_POST['AntecedenteAnticoagulantesOrales']) . ",
		IdAnticoagulanteOral = " . nullSiVacioONotSet($_POST['IdAnticoagulanteOral']) . ",

		LabGlucometria = " . nullSiVacioONotSet($_POST['LabGlucometria']) . ",
		LabHemograma = " . nullSiVacioONotSet($_POST['LabHemograma']) . ",
		LabINR = " . nullSiVacioONotSet($_POST['LabINR']) . ",
		LabPT = " . nullSiVacioONotSet($_POST['LabPT']) . ",
		LabTPT = " . nullSiVacioONotSet($_POST['LabTPT']) . ",
		LabPlaquetas = " . nullSiVacioONotSet($_POST['LabPlaquetas']) . ",
			
		PersistenSintomasLuegoDextrosa = " . nullSiVacioONotSet($_POST['PersistenSintomasLuegoDextrosa']) . ",

		ExamenNeurologico = " . nullSiVacioONotSet($_POST['ExamenNeurologico']) . ",
		HuboReanimacionCardiopulmonar = " . nullSiVacioONotSet($_POST['HuboReanimacionCardiopulmonar']) . ",
		EscalaGlasgow = " . nullSiVacioONotSet($_POST['EscalaGlasgow']) . ",
		EscalaNIHSS = " . nullSiVacioONotSet($_POST['EscalaNIHSS']) . ",	
			
		SugiereTACCraneoSimple = " . nullSiVacioONotSet($_POST['SugiereTACCraneoSimple']) . ",
		SugiereAngioTACCraneo = " . nullSiVacioONotSet($_POST['SugiereAngioTACCraneo']) . ",
		InicioEstatina = " . nullSiVacioONotSet($_POST['InicioEstatina']) . ",
		
		IdTipoACVenTAC = " . nullSiVacioONotSet($_POST['IdTipoACVenTAC']) . ",
		
		IdTipoHemo = " . nullSiVacioONotSet($_POST['IdTipoHemo']) . ",			
		EscalaFisher = " . nullSiVacioONotSet($_POST['EscalaFisher']) . ",
		EscalaWFNS = " . nullSiVacioONotSet($_POST['EscalaWFNS']) . ",
		EscalaICH = " . nullSiVacioONotSet($_POST['EscalaICH']) . ",
		HayHemorragiaActiva = " . nullSiVacioONotSet($_POST['HayHemorragiaActiva']) . ",
				
		IdTipoCircIsque = " . nullSiVacioONotSet($_POST['IdTipoCircIsque']) . ",
		IdTiempoInfarto = " . nullSiVacioONotSet($_POST['IdTiempoInfarto']) . ",
		EstableHemodinamicamente = " . nullSiVacioONotSet($_POST['EstableHemodinamicamente']) . ",
					
		ASPECTS = " . nullSiVacioONotSet($_POST['ASPECTS']) . ",				
		RiesgoTromboEndovenosaAbsoluta = " . nullSiVacioONotSet($_POST['RiesgoTromboEndovenosaAbsoluta']) . ",
		RiesgoTromboEndovenosaRelativa = " . nullSiVacioONotSet($_POST['RiesgoTromboEndovenosaRelativa']) . ",	
		TrombolizarConRelMayor0 = " . nullSiVacioONotSet($_POST['TrombolizarConRelMayor0']) . ",
		JustificacionTrombolizarConRelMayor0 = " . nullSiVacioONotSet($_POST['JustificacionTrombolizarConRelMayor0']) . ",	
		AdminTrombolisisEndovenosa = " . nullSiVacioONotSet($_POST['AdminTrombolisisEndovenosa']) . ",
			
		HayOclusionVasosGrandes = " . nullSiVacioONotSet($_POST['HayOclusionVasosGrandes']) . ",	

		PersistenSintomasTACnormal = " . nullSiVacioONotSet($_POST['PersistenSintomasTACnormal']) . ",
		AsemejaACVoMimic = " . nullSiVacioONotSet($_POST['AsemejaACVoMimic']) . ",
		
		EscalaABCD2 = " . nullSiVacioONotSet($_POST['EscalaABCD2']) . ",
		RiesgoACVa2dias = " . nullSiVacioONotSet($_POST['RiesgoACVa2dias']) . ",
		RiesgoACVa7dias = " . nullSiVacioONotSet($_POST['RiesgoACVa7dias']) . ",
		RiesgoACVa90dias = " . nullSiVacioONotSet($_POST['RiesgoACVa90dias']) . ",
		InicioEstatina = " . nullSiVacioONotSet($_POST['InicioEstatina']) . ",
			
		SugerenciaRemision = " . nullSiVacioONotSet($_POST['SugerenciaRemision']) . ",
		IdIPSReferencia = " . nullSiVacioONotSet($_POST['IdIPSReferencia']) . ",
		IdTipoEscenarioReferencia = " . nullSiVacioONotSet($_POST['IdTipoEscenarioReferencia']) . ",
		FechaHoraRemisionAIPSReferencia = " . nullSiVacioONotSet($_POST['FechaHoraRemisionAIPSReferencia']) . "
												 
			WHERE IdEscenario = " . nullSiVacioONotSet($_POST['IdEscenario']);
			
			
		$resultado = mysqli_query($con, $sql) or die("Error al actualizar el escenario 2. mysqli_error: " . mysqli_error($con) . " sql= " . $sql);
			
		if ($resultado <> 1){
			echo "Fallo actualizar el escenario:" . $sql;
		} else 	{
			echo 1;
		}
}
 
mysqli_close($con);
?>



