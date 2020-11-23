

function ActualizarControlesYEstado(EstadoEdicion){
	
	var esok = true;
	var ultimomodulo = '';
	
	if (EstadoEdicion == 0) {
		return;
	}
	
	var EscenarioCerrado = setMenos1SiNulo($('#EscenarioCerrado').val()); 
	
	if (EscenarioCerrado == 1) {
		alert("Este escenario esta cerrado y no se puede editar.");
		$("#Escenario").find("input, button, textarea, select").each(
			function(){			
				$(this).attr('disabled','disabled');
			}
		);
		$("#Escenario").find("input.Boton").each(
			function(){			
				$(this).attr('hidden','hidden');
			}
		);	
		
		$("#tableIdTipoAntecedente").attr('hidden','hidden');		
	}	
		
	var listaCampos = $('#listaCampos').val();
	var camposlista = listaCampos.split(";");
	var listaLen = camposlista.length;
		
	if (listaLen > 0) {
		$("div, table").each(
			function(){			
				var campo = setMenos1SiNulo($(this).attr('id')); 
				if (campo != -1){
					$('#'+campo).show();
				}
			}	
	    );	
		
		$("#tableIdTipoAntecedente").hide();
		$("#tableIdTipoAntecedente").attr('hidden','hidden');	
		
		for (i = 0; i < listaLen; i++) {
			var campo = camposlista[i];
			$('#'+campo).hide();
			$('#'+campo).attr('hidden','hidden');
			$('#'+campo).html("");
		}
	
		if (EscenarioCerrado == 0) {
			ultimomodulo = $('#ultimomodulo').val();
			scrollTopModulo(ultimomodulo);
		}
	
		return;
	}
		
		
	// TRIAGE

	var TriageBreveHC = setMenos1SiNulo($('#TriageBreveHC').val()); 
	if (TriageBreveHC == -1) {alert("Falta diligenciar la historia en el triage.");scrollTopModulo('TriageBreveHC');return;}		
	
	var NivelTriage = setMenos1SiNulo($('#NivelTriage').val()); 
	if (NivelTriage == -1) {alert("Falta seleccionar el Nivel de Triage.");scrollTopModulo('NivelTriage');return;}
		
	var TriageMedioIngreso = setMenos1SiNulo($('#TriageMedioIngreso').val()); 
	if (TriageMedioIngreso == -1) {alert("Falta seleccionar el Medio de Ingreso a Triage.");scrollTopModulo('TriageMedioIngreso');return;}	
	
	$('#mudulo_tiempoevento').show();
	ultimomodulo = 'mudulo_tiempoevento';
	
	// TIEMPO EVENTO

	var FechaLlegadaPuertaUrgencias = setMenos1SiNulo($('#FechaLlegadaPuertaUrgencias').val());
	if (FechaLlegadaPuertaUrgencias == -1){alert("Atención: Ingrese Fecha Llegada Puerta Urgencias.");scrollTopModulo('FechaLlegadaPuertaUrgencias');return;}	

	var HoraLlegadaPuertaUrgencias = setMenos1SiNulo($('#HoraLlegadaPuertaUrgencias').val());
	if (HoraLlegadaPuertaUrgencias == -1){alert("Atención: Ingrese Hora Llegada Puerta Urgencias.");scrollTopModulo('HoraLlegadaPuertaUrgencias');return;}	
	
	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no presenciado.");scrollTopModulo('WakeUpStroke');return;}	
	
	if (WakeUpStroke == 0){
		
		$('#tableInicioSintomas').show();	
		
		var IdTipoTiempo = setMenos1SiNulo($('#IdTipoTiempo').val());
		if (IdTipoTiempo == -1){alert("Seleccione el tipo de ventana de tiempo o ingrese el tiempo de evolución del evento.");scrollTopModulo('IdTipoTiempo');return;}	
	}
			
	$('#mudulo_activacioncodigoacv').show();
	ultimomodulo = 'mudulo_activacioncodigoacv';

	    
    // BEFAST Y ACTIVAR CODIGO ACV
    
	var EscalaBEFAST = setMenos1SiNulo($('#EscalaBEFAST').val());
	if (EscalaBEFAST == -1){alert("Calcular Escala BE-FAST.");scrollTopModulo('EscalaBEFAST');return;}	

	var CodigoACVActivado = setMenos1SiNulo($('#CodigoACVActivado').val());
	if (CodigoACVActivado == -1){alert("CodigoACVActivado: seleccione una opción.");scrollTopModulo('CodigoACVActivado');return;}	
	
	if (EscalaBEFAST > 0){
		$('#mudulo_historiaclinica').show();	
		ultimomodulo = 'mudulo_historiaclinica';
	} else
	if (EscalaBEFAST == 0){
		var sugerencia = "Manejo local de stroke mimic. Terminar.";
		alert(sugerencia);
		revisarSugerenciaOutcome(sugerencia, 0);	
		return;		
	}
	
	$('#mudulo_historiaclinica').show();
	ultimomodulo = 'mudulo_historiaclinica';
	
    $('html, body').animate({
        scrollTop: $('#mudulo_historiaclinica').offset().top
    }, 1000);
	
	// MODULO HISTORIA CLINICA
	
	var Edad = setMenos1SiNulo($('#Edad').val()); 
	if (Edad == -1) {alert("Falta llenar el campo Edad.");scrollTopModulo('Edad');return;}
	
	var campo = setMenos1SiNulo($('#AntecedenteAnticoagulantesOrales').val()); 
	if (campo == -1) {alert("Responda la pregunta ¿Tiene antecedente de uso de nuevos anticoagulantes orales?");scrollTopModulo('AntecedenteAnticoagulantesOrales');return;
	} else {
		if ((campo == 1) && (setMenos1SiNulo($('#IdAnticoagulanteOral').val()) == -1) ){alert("Seleccione el anticoagulante oral.");scrollTopModulo('IdAnticoagulanteOral');return;		}
	}
 
	$('#mudulo_laboratorio').show();
	ultimomodulo = 'mudulo_laboratorio';


	// LABORATORIO
	
	var LabGlucometria = setMenos1SiNulo($('#LabGlucometria').val()); 
	if (LabGlucometria == -1) {alert("Introduzca el valor de la Glucometría");scrollTopModulo('LabGlucometria');return;}
		
	if (LabGlucometria >= 50){		
		$('#mudulo_examenfisico').show();	
		ultimomodulo = 'mudulo_examenfisico';	
	} else {
	
		var PersistenSintomasLuegoDextrosa = setMenos1SiNulo($('#PersistenSintomasLuegoDextrosa').val()); 
		if (PersistenSintomasLuegoDextrosa == -1) {alert("Responda si persisten los síntomas luego de aplicar dextrosa.");scrollTopModulo('PersistenSintomasLuegoDextrosa');return;}	

		if (PersistenSintomasLuegoDextrosa == 0){	 			
 			var sugerencia = "Manejo local de stroke mimic por Hipoglicemia. Terminar.";
			revisarSugerenciaOutcome(sugerencia, 0);
			return;
		} else {				
			$('#mudulo_examenfisico').show();	
			ultimomodulo = 'mudulo_examenfisico';		
		}	
	}	
	
	// MODULO EXAMEN FISICO
			
	var ExamenNeurologico = setMenos1SiNulo($('#ExamenNeurologico').val());
	if (ExamenNeurologico == -1){alert("Favor completar el Examen Neurológico.");scrollTopModulo('ExamenNeurologico');scrollTopModulo('ExamenNeurologico');return;}	

	var campo = setMenos1SiNulo($('#HuboReanimacionCardiopulmonar').val()); 
	if (campo == -1) {alert("Responda la pregunta ¿Hubo necesidad de reanimación cardiopulmonar?");scrollTopModulo('HuboReanimacionCardiopulmonar');return;}
		
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());	
	if (EscalaGlasgow == -1){alert("IdTipoTiempo: seleccione la Escala Coma Glasgow.");scrollTopModulo('EscalaGlasgow');scrollTopModulo('EscalaGlasgow');return;}

	$('#mudulo_tiempoevento').show();	
	ultimomodulo = 'mudulo_tiempoevento';


// MODULO  EVALUACION VENTANA

// INICIO ESCENARIO 1 -ANALISIS DE VENTANA DE TIEMPO	

	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return;}	

	if (WakeUpStroke == 1){ // Despertar: remitir URGENTE E3
		revisarSugerenciaOutcome("URGENTE A E3.", 3);
		return;
			
	} else {
			
		var tipotiempo = setMenos1SiNulo($('#IdTipoTiempo').val());
		if (tipotiempo == -1){alert("IdTipoTiempo: seleccione la Ventana de Tiempo.");scrollTopModulo('IdTipoTiempo');return;}	
		
		switch (tipotiempo){
			case '1':	// Dentro de Ventana
									
					if (EscalaGlasgow <= 8){				
						revisarSugerenciaOutcome("URGENTE A E3", 3);
						return;

					} else if (EscalaGlasgow > 8){
						
						$('#mudulo_evaluacionventana').show();					
						$('#tabla_persistensintomasGlasgowMayor8').show();
						ultimomodulo = 'tabla_persistensintomasGlasgowMayor8'; 					
						
						var PersistenSintomasGlasgowMayor8 = setMenos1SiNulo($('#PersistenSintomasGlasgowMayor8').val()); 
						if (PersistenSintomasGlasgowMayor8 == -1) {alert("Falta llenar la Persisten Síntomas con Glasgow > 8.");scrollTopModulo('PersistenSintomasGlasgowMayor8');return;}
						
						if (PersistenSintomasGlasgowMayor8 == 0){
						
							$('#mudulo_tiaomimic').show();
							ultimomodulo = 'mudulo_tiaomimic'; 
							
							var AsemejaACVoMimic = setMenos1SiNulo($('#AsemejaACVoMimic').val());			
							if (AsemejaACVoMimic == -1) {alert("Asemeja AIT o Mimic sin responder.");scrollTopModulo('AsemejaACVoMimic');return;}
							
							if (AsemejaACVoMimic == 1){
								revisarSugerenciaOutcome("Tratamiento de MIMIC o Evaluación por neurología.", 0);
								return;
							} else {
								$('#tableEscalaABCD2').show();	
								ultimomodulo = 'tableEscalaABCD2'; 
								
								var EscalaABCD2 = setMenos1SiNulo($('#EscalaABCD2').val());			
								if (EscalaABCD2 == -1) {alert("Falta llenar la Escala ABCD2.");scrollTopModulo('EscalaABCD2');return;}
								
								revisarSugerenciaOutcome("PRIORITARIO A E2", 2);							
								return;							
							}
														
						} else if (PersistenSintomasGlasgowMayor8 == 1){
						
							$('#tableMatrizEscalaFASTED').show(); 
							ultimomodulo = 'tableMatrizEscalaFASTED'; 
							
							var EscalaFASTED = setMenos1SiNulo($('#EscalaFASTED').val());
							if (EscalaFASTED == -1){alert("Seleccione la Escala FASTED.");scrollTopModulo('EscalaFASTED');return;}

							if (EscalaFASTED >= LIMITE_FASTED) { // Oclusión. URGENTE A E3
								
								revisarSugerenciaOutcome("URGENTE A E3.", 3);
								return;
																
							} else 	if (EscalaFASTED < LIMITE_FASTED) { // Sin Oclusión: ir a Predictor circ. Isque.
							
								$('#tablaPredictorACVIsquemicoCircPosterior').show(); 							
								$('#tableIdTipoCircIsque').show();
								ultimomodulo = 'tablaPredictorACVIsquemicoCircPosterior'; 	
								
								var PredictorACVIsquemicoCircPosterior = setMenos1SiNulo($('#PredictorACVIsquemicoCircPosterior').val());
								if (PredictorACVIsquemicoCircPosterior == -1){alert("seleccione Predictor ACV Isquémico Circ. Posterior.");scrollTopModulo('PredictorACVIsquemicoCircPosterior');return;}						
								
								var IdTipoCircIsque = setMenos1SiNulo($('#IdTipoCircIsque').val());
								if (IdTipoCircIsque == -1){alert("IdTipoCircIsque: seleccione el Tipo Circ. Isque.");scrollTopModulo('IdTipoCircIsque');return;}
								
								if (IdTipoCircIsque == 1) { // Anterior: URGENTE A E2 O E3, EL MAS CERCANO									
									revisarSugerenciaOutcome("URGENTE A E2 o E3, EL MAS CERCANO.", 23);
								} else 	if (IdTipoCircIsque == 2) { // Posterior: URGENTE A E3.
									revisarSugerenciaOutcome("URGENTE A E3.", 3);
								}
								return;
							}						
						}	
					} 
					break;	
					
			case '2':	// Fuera de Ventana
											
					var horas = setMenos1SiNulo($('#TiempoEvolucionHoras').val());
					if (horas == -1){alert("Ingrese el tiempo de evolución");scrollTopModulo('TiempoEvolucionHoras');return;}
					
					if ((horas > 6) && (horas <= 24)){			
						revisarSugerenciaOutcome("URGENTE A E3.", 3);
					} else if (horas > 24){
						revisarSugerenciaOutcome("PRIORITARIO A E2.", 2);				
					}
					ultimomodulo = 'mudulo_sugerenciaremision'; 
					break;	
		}  
	}

	scrollTopModulo(ultimomodulo);	

    return;
}


function revisarSugerenciaOutcome(sugerencia, tipo){

	var SugerenciaRemision = setMenos1SiNulo($('#SugerenciaRemision').val());	
	if (SugerenciaRemision == -1){alert("Asignar Sugerencia de Remisión/Salida");return;}
	
	alert($('#SugerenciaRemision').val());
	
	scrollTopModulo('mudulo_sugerenciaremision');	
	
	var IdTipoEscenarioReferencia = setMenos1SiNulo($('#IdTipoEscenarioReferencia').val());	
	if (IdTipoEscenarioReferencia == -1){alert("Asignar IdTipoEscenarioReferencia");return;}
				
	if (IdTipoEscenarioReferencia == 0){		
		var FechaHoraRemisionAIPSReferencia = setMenos1SiNulo($('#FechaHoraRemisionAIPSReferencia').val());	
		if (FechaHoraRemisionAIPSReferencia == -1){alert("Asignar FechaHoraRemisionAIPSReferencia");return;}
		
		$('#tableIdIPSReferencia').hide();
		
		$('#divCerrarEscenario').show();
			
	} else {
		if (setMenos1SiNulo($('#IdIPSReferencia').val()) == -1) {alert("Seleccione la IPS de Referencia.");return;}
		
		var temp = $('#IdIPSReferencia').val();
		filtrarIPSreferenciaTipoEscenario(IdTipoEscenarioReferencia);
		$('#IdIPSReferencia').val(temp);			
		$('#tableIdIPSReferencia').show();	

		$('#divCerrarEscenario').show();		
	}
		
	return;
}
