

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

	
	// PRE ACTIVACION
	
	var CodigoACVActivadoPrehospitalario = setMenos1SiNulo($('#CodigoACVActivadoPrehospitalario').val()); 
	if (CodigoACVActivadoPrehospitalario == -1) {alert("Falta responder: ¿Activación  Código ACV prehospitalaria?"); return scrollTopModulo('CodigoACVActivadoPrehospitalario');}	
	
    if (CodigoACVActivadoPrehospitalario == 0){
	
		// TRIAGE		
		
		$('#mudulo_triage').show();
		ultimomodulo = 'mudulo_triage';
		
	    var TriageBreveHC = setMenos1SiNulo($('#TriageBreveHC').val()); 
	    if (TriageBreveHC == -1) {alert("Falta diligenciar la historia en el triage."); return scrollTopModulo('TriageBreveHC');}		
		
	    var NivelTriage = setMenos1SiNulo($('#NivelTriage').val()); 
	    if (NivelTriage == -1) {alert("Falta seleccionar el Nivel de Triage."); return scrollTopModulo('NivelTriage');}	
	
	    var TriageMedioIngreso = setMenos1SiNulo($('#TriageMedioIngreso').val()); 	
	    if (TriageMedioIngreso == -1) {alert("Falta seleccionar el Medio de Ingreso a Triage."); return scrollTopModulo('TriageMedioIngreso');}			
	}
	
    // TIEMPO EVENTO
		
	$('#mudulo_tiempoevento').show();
    ultimomodulo = 'mudulo_tiempoevento';
    
    var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
    if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no."); return scrollTopModulo('WakeUpStroke');}	

	if (WakeUpStroke == 0){
		
		$('#tableInicioSintomas').show();
		ultimomodulo = 'tableInicioSintomas';
		
		var IdTipoTiempo = setMenos1SiNulo($('#IdTipoTiempo').val());
		if (IdTipoTiempo == -1){alert("Seleccione el tipo de ventana de tiempo o ingrese el tiempo de evolución del evento."); return scrollTopModulo('IdTipoTiempo');}	
	}
			
	$('#mudulo_activacioncodigoacv').show();
	ultimomodulo = 'mudulo_activacioncodigoacv';

    
	// BEFAST Y ACTIVAR CODIGO ACV
        
    var EscalaBEFAST = setMenos1SiNulo($('#EscalaBEFAST').val());
    if (EscalaBEFAST == -1){alert("Calcular Escala BE-FAST."); return scrollTopModulo('EscalaBEFAST');}	

    if (EscalaBEFAST == 0){

        $('#tableEmergenciologoActivaCodigoACV').show();
		ultimomodulo = 'tableEmergenciologoActivaCodigoACV';
        
        var EmergenciologoActivaCodigoACV = setMenos1SiNulo($('#EmergenciologoActivaCodigoACV').val());
	    if (EmergenciologoActivaCodigoACV == -1){alert("Emergenciólogo Activa Código ACV: seleccione una opción."); return scrollTopModulo('EmergenciologoActivaCodigoACV');}	
    
        if (EmergenciologoActivaCodigoACV == 0){
            ultimomodulo = revisarSugerenciaOutcome("Manejo local de stroke mimic. Terminar.", 0);
			return ultimomodulo;
        } 
    }	    
	    
	
	var CodigoACVActivado = setMenos1SiNulo($('#CodigoACVActivado').val());
	if (CodigoACVActivado == -1){alert("CodigoACVActivado: seleccione una opción."); return scrollTopModulo('CodigoACVActivado');}	
	    
	$('#mudulo_historiaclinica').show();
	ultimomodulo = 'mudulo_historiaclinica';
	
	// MODULO HISTORIA CLINICA
	
	var Edad = setMenos1SiNulo($('#Edad').val()); 
	if (Edad == -1) {alert("Falta llenar el campo Edad."); return scrollTopModulo(ultimomodulo);}
	
	var SignosSintomasNeurologicos = setMenos1SiNulo($('#SignosSintomasNeurologicos').val()); 
	if (SignosSintomasNeurologicos == -1) {alert("Falta Signos y síntomas neurológicos.");return scrollTopModulo(ultimomodulo);}	
	
	var campo = setMenos1SiNulo($('#AntecedenteAnticoagulantesOrales').val()); 
	if (campo == -1) {alert("Responda la pregunta ¿Antecedente de uso de nuevos anticoagulantes orales?"); return scrollTopModulo('AntecedenteAnticoagulantesOrales');
	} else {
		if (campo == 1){
			$('#TableIdAnticoagulanteOral').show();
			ultimomodulo = 'TableIdAnticoagulanteOral';
			
			if (setMenos1SiNulo($('#IdAnticoagulanteOral').val()) == -1){alert("Seleccione el anticoagulante oral."); return scrollTopModulo('IdAnticoagulanteOral');}
		}
	}
 
	$('#mudulo_laboratorio').show();
	ultimomodulo = 'mudulo_laboratorio';


	// LABORATORIO
	
	var LabGlucometria = setMenos1SiNulo($('#LabGlucometria').val()); 
	if (LabGlucometria == -1) {alert("Introduzca el valor de la Glucometría"); return scrollTopModulo('mudulo_laboratorio');}
		
	if (LabGlucometria >= 50){		
		$('#mudulo_examenfisico').show();	
		ultimomodulo = 'mudulo_examenfisico';	
	} else {
	
    	$('#tablePersistenSintomasLuegoDextrosa').show();
		ultimomodulo = 'tablePersistenSintomasLuegoDextrosa';

		var PersistenSintomasLuegoDextrosa = setMenos1SiNulo($('#PersistenSintomasLuegoDextrosa').val()); 
		if (PersistenSintomasLuegoDextrosa == -1) {alert("Responda si persisten los síntomas luego de aplicar dextrosa."); return scrollTopModulo('PersistenSintomasLuegoDextrosa');}	

		if (PersistenSintomasLuegoDextrosa == 0){	 			
 			var sugerencia = "Manejo local de stroke mimic por Hipoglicemia. Terminar.";
			ultimomodulo = revisarSugerenciaOutcome(sugerencia, 0);
			return ultimomodulo;
		} else {				
			$('#mudulo_examenfisico').show();	
			ultimomodulo = 'mudulo_examenfisico';		
		}	
	}	
	
	ultimomodulo = 'mudulo_examenfisico';	
	
	// MODULO EXAMEN FISICO
			
	var ExamenNeurologico = setMenos1SiNulo($('#ExamenNeurologico').val());
	if (ExamenNeurologico == -1){alert("Favor completar el Examen Neurológico."); return scrollTopModulo('mudulo_examenfisico');}	

	var campo = setMenos1SiNulo($('#HuboReanimacionCardiopulmonar').val()); 
	if (campo == -1) {alert("Responda la pregunta ¿Hubo necesidad de reanimación cardiopulmonar?"); return scrollTopModulo('HuboReanimacionCardiopulmonar');}
		
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());	
	if (EscalaGlasgow == -1){alert("Seleccione la Escala Coma Glasgow."); return scrollTopModulo('EscalaGlasgow');}

	var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());	
	if (EscalaNIHSS == -1){alert("Seleccione la Escala NIHSS."); return scrollTopModulo('EscalaNIHSS');}
	

// MODULO  EVALUACION VENTANA

	$('#mudulo_evaluacionventana').show();
	ultimomodulo = 'mudulo_evaluacionventana';	

	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return scrollTopModulo(ultimomodulo);}	

	if (WakeUpStroke == 1){ // Despertar: remitir URGENTE E3
	    $('#SugiereTACCraneoSimple').val(0);
		ultimomodulo = revisarSugerenciaOutcome("URGENTE A E3.", 3); 
		return ultimomodulo;
			
	} else {
						
			$('#mudulo_evaluacionventana').show();
			$('#tableIdTipoACVenTAC').show();			
			ultimomodulo = 'tableIdTipoACVenTAC';
			$('#SugiereTACCraneoSimple').val(1);

			
			var tipoacv = setMenos1SiNulo($('#IdTipoACVenTAC').val());
			if (tipoacv == -1){alert("Seleccione el tipo de ACV (hemo./isque.).");return scrollTopModulo('tableIdTipoACVenTAC');}
				
			if (tipoacv == 1) {// hemorragico	
						
				ultimomodulo = revisarHemo(ultimomodulo);
				return;
				
			} else { // no es hemorragico
			
				var tipotiempo = $('#IdTipoTiempo').val();
				if (tipotiempo == -1){alert("IdTipoCircIsque: seleccione la Ventana de Tiempo.");return scrollTopModulo('tableIdTipoACVenTAC');}		
				
				if (tipotiempo == 1){ // en ventana <6 horas
				
					if (tipoacv == 0) {	// acv no visible-normal
					
						$('#tablePersistenSintomasTACnormal').show();
						ultimomodulo = 'tablePersistenSintomasTACnormal'; 
						
						var PersistenSintomasTACnormal = setMenos1SiNulo($('#PersistenSintomasTACnormal').val());
						if (PersistenSintomasTACnormal == -1){alert("¿Persisten los síntomas con ACV no visible en TAC (normal)?");scrollTopModulo('tablePersistenSintomasTACnormal');return;}
						
						if (PersistenSintomasTACnormal == 0){ // AIT o MIMIC
						
							$('#mudulo_tiaomimic').show();
							ultimomodulo = 'mudulo_tiaomimic'; 
																			
							return revisarTIAoMIMIC(ultimomodulo);
							
						} else if (PersistenSintomasTACnormal == 1){ // Beneficio de trombólisis si no hay riesgo

							$('#mudulo_acvisquemico').show();
							$('#tableIdTipoCircIsque').hide();
							$('#tableIdTiempoInfarto').hide();	
							
							$('#tableRiesgoTromboEndovenosaAbsoluta').show();							
							$('#tableRiesgoTromboEndovenosaRelativa').show();
							ultimomodulo = 'tableRiesgoTromboEndovenosaAbsoluta'; 
														
							return revisarEndovenosa(ultimomodulo);
						}
						return;				
						
					} else if (tipoacv == 2) { //acv isquémico
					
						$('#mudulo_acvisquemico').show();
						$('#tableIdTipoCircIsque').show();
						ultimomodulo = 'tableIdTipoCircIsque'; 
						
						return revisarIsqueEnVentana(ultimomodulo);	
					}					
				} else if (tipotiempo == 2){ //FUERA DE VENTANA 6 a 24 horas				
					ultimomodulo = revisarSugerenciaOutcome("URGENTE A E3.", 3);
					return ultimomodulo;
					
				} else if (tipotiempo == 3){ //FUERA DE VENTANA > 24 horas		
					ultimomodulo = revisarSugerenciaOutcome("Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología.", 0);
					return ultimomodulo;
				} 
			}						

	}
	
	scrollTopModulo(ultimomodulo);	
			
    return;
}

function revisarEndovenosa(modulo) { 
	
	var ultimomodulo = modulo;
	
	var RiesgoTromboEndovenosaAbsoluta =  setMenos1SiNulo($('#RiesgoTromboEndovenosaAbsoluta').val());
	var RiesgoTromboEndovenosaRelativa =  setMenos1SiNulo($('#RiesgoTromboEndovenosaRelativa').val());
	
	if (RiesgoTromboEndovenosaAbsoluta == -1){alert("Calcular Mitigación Riesgo Endovascular Absoluta");return scrollTopModulo(ultimomodulo);}													
	if (RiesgoTromboEndovenosaRelativa == -1){alert("Calcular Mitigación Riesgo Endovascular Relativa");return scrollTopModulo(ultimomodulo);}
	
	if (RiesgoTromboEndovenosaRelativa > 0){
	
		$('#tableTrombolizarConRelMayor0').show();
		ultimomodulo = 'tableTrombolizarConRelMayor0';
		
		if (TrombolizarConRelMayor0 == -1){alert("Asignar Decisión Médica Trombolizar");return scrollTopModulo(ultimomodulo);}
		
		if (TrombolizarConRelMayor0 == 0){
			$('#tableJustificacionTrombolizarConRelMayor0').hide();	
		}
		if (TrombolizarConRelMayor0 == 1) {
			$('#tableJustificacionTrombolizarConRelMayor0').show();	
			ultimomodulo = 'tableJustificacionTrombolizarConRelMayor0';
			
			if (JustificacionTrombolizarConRelMayor0 == -1){alert("Asignar Decisión Médica Trombolizar");return scrollTopModulo(ultimomodulo);}
		}																				
	} else {
		$('#tableTrombolizarConRelMayor0').hide();	
		$('#tableJustificacionTrombolizarConRelMayor0').hide();	
	}
	
	var SugiereAngioTACCraneo = setMenos1SiNulo($('#SugiereAngioTACCraneo').val());			
	if ($('#SugiereAngioTACCraneo').val() != 1){			
		var sugerencia = "Realizar AngioTAC/RM.";
		alert(sugerencia);
		$('#SugiereAngioTACCraneo').val(1);
	}

	$('#tableHayOclusionVasosGrandes').show();
	ultimomodulo = 'tableHayOclusionVasosGrandes';
	
	ultimomodulo = revisarHayOclusionVasosGrandes(ultimomodulo);
	
	return ultimomodulo;
}


function revisarHayOclusionVasosGrandes(modulo) { 
	
	var ultimomodulo = modulo;

	var HayOclusionVasosGrandes = setMenos1SiNulo($('#HayOclusionVasosGrandes').val());
	if (HayOclusionVasosGrandes == -1){alert("¿Hay Oclusión Vasos Grandes?");return scrollTopModulo(ultimomodulo);}
											
	ultimomodulo = revisarSugerenciaOutcome("", 0);
							
	return ultimomodulo;
}

function revisarTIAoMIMIC(modulo) {
	
	var ultimomodulo = modulo;
	
	$('#tableAsemejaACVoMimic').show();	
	ultimomodulo = 'tableAsemejaACVoMimic';

	var AsemejaACVoMimic = setMenos1SiNulo($('#AsemejaACVoMimic').val());
	if (AsemejaACVoMimic == -1){alert("¿Asemeja a ACV o Mimic? (epilepsia, migraña, trastorno conversivo...)");return scrollTopModulo('tableAsemejaACVoMimic');}
								
	if (AsemejaACVoMimic == 1){

		ultimomodulo = revisarSugerenciaOutcome("Tratamiento de MIMIC o Evaluación por neurología.", 0);				
		return ultimomodulo;
		
	} else if (AsemejaACVoMimic == 0){								

		$('#tableEscalaABCD2').show();	
		ultimomodulo = 'tableEscalaABCD2';

		var EscalaABCD2 = setMenos1SiNulo($('#EscalaABCD2').val());
		if (EscalaABCD2 == -1){alert("Calcular Escala ABCD2");scrollTopModulo('tableEscalaABCD2');return scrollTopModulo(ultimomodulo);}							
		
		var RiesgoACVa2dias = setMenos1SiNulo($('#RiesgoACVa2dias').val());
		if (RiesgoACVa2dias == -1){alert("Asignar Riesgo ACV a 2 días");return scrollTopModulo(ultimomodulo);}																		
		
		var RiesgoACVa7dias = setMenos1SiNulo($('#RiesgoACVa7dias').val());
		if (RiesgoACVa7dias == -1){alert("Asignar Riesgo ACV a 7 días");return scrollTopModulo(ultimomodulo);}																		
		
		var RiesgoACVa90dias = setMenos1SiNulo($('#RiesgoACVa90dias').val());
		if (RiesgoACVa90dias == -1){alert("Asignar Riesgo ACV a 90 días");return scrollTopModulo(ultimomodulo);}																											
		
		if (SugerenciaRemision == -1){
			EscalaABCD2_OnChange();
		}	
		ultimomodulo = revisarSugerenciaOutcome("Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología.", 0);
		return ultimomodulo;
	}	
	
	return ultimomodulo;											
}


function revisarHemo(modulo) { 
	
	var ultimomodulo = modulo;

	$('#tableIdTipoHemo').show();
	ultimomodulo = 'tableIdTipoHemo';
							
	var IdTipoHemo = setMenos1SiNulo($('#IdTipoHemo').val());
	if (IdTipoHemo == -1) {alert("Seleccionar tipo de hemorragia.");return scrollTopModulo('tableIdTipoHemo');}	
	
	if (IdTipoHemo == 1) { //subaracnoidea		
		$('#tableEscalaFisher').show();	
		$('#tableEscalaWFNS').show();
		$('#tableEscalaICH').hide();	
	}	
	if (IdTipoHemo == 2) { //intracerebral		
		$('#tableEscalaICH').show();	
		$('#tableEscalaFisher').hide();	
		$('#tableEscalaWFNS').hide();	
	}
	
	if (!revisarEscalasHemoCompletas()) {return;}
	
	var SugiereAngioTACCraneo = setMenos1SiNulo($('#SugiereAngioTACCraneo').val());
	if (SugiereAngioTACCraneo != 1){ 
		alert("Realizar AngioTACoRM de Cráneo");
		$('#SugiereAngioTACCraneo').val(1);
	}	
			
	$('#tableHayHemorragiaActiva').show();
	ultimomodulo = 'tableHayHemorragiaActiva';
	
	var HayHemorragiaActiva = setMenos1SiNulo($('#HayHemorragiaActiva').val());
	if (HayHemorragiaActiva == -1) {alert("Seleccionar si hay hemorragia activa.");return scrollTopModulo('tableHayHemorragiaActiva');}

	var SugerenciaRemision = setMenos1SiNulo($('#SugerenciaRemision').val());
	if (SugerenciaRemision == -1){
		HayHemorragiaActiva_OnChange();
	}
															
	ultimomodulo = revisarSugerenciaOutcome("", 0);
	
	return ultimomodulo;
}

function revisarIsqueEnVentana(modulo) { 
	
	var ultimomodulo = modulo;

	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());
	if (EscalaGlasgow == -1){alert("Seleccione la Escala Coma Glasgow.");return scrollTopModulo("tableEscalaGlasgow");}

	var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());	
	if (EscalaNIHSS == -1){alert("Seleccione la Escala NIHSS.");return scrollTopModulo("tableEscalaNIHSS");}
	
	$('#tableIdTipoCircIsque').show();
	ultimomodulo = 'tableIdTipoCircIsque';
	
	var IdTipoCircIsque = setMenos1SiNulo($('#IdTipoCircIsque').val());
	if (IdTipoCircIsque == -1){alert("seleccionar tipo Circ. Isquémica anterior o posterior.");return scrollTopModulo("tableIdTipoCircIsque");}
		
	if ((EscalaGlasgow <= 8) || ((EscalaGlasgow > 8) && (EscalaNIHSS > 0))) { // MODULO ISQUEMICO

		$('#tableIdTiempoInfarto').show();
		ultimomodulo = 'tableIdTiempoInfarto';
		
		var IdTiempoInfarto = setMenos1SiNulo($('#IdTiempoInfarto').val());
		if (IdTiempoInfarto == -1){alert("seleccionar Tiempo del Infarto.");return scrollTopModulo("tableIdTiempoInfarto");}
		
		if (IdTiempoInfarto == 0) { // agudo
			
			$('#tableASPECTS').show();
			ultimomodulo = 'tableASPECTS';
			
			var ASPECTS = setMenos1SiNulo($('#ASPECTS').val());
			if (ASPECTS == -1){alert("ASPECTS: seleccione el valor.");return scrollTopModulo("tableASPECTS");}
			
			if (ASPECTS >= 6){
			
				$('#tableRiesgoTromboEndovenosaAbsoluta').show();
				$('#tableRiesgoTromboEndovenosaRelativa').show();
				ultimomodulo = 'tableRiesgoTromboEndovenosaAbsoluta';
				
				return revisarEndovenosa(ultimomodulo);								
				
			} else	if (ASPECTS < 6) {
				ultimomodulo = revisarSugerenciaOutcome("UCI", 0);
				return ultimomodulo;
			}
			
		} else { // subagudo o crónico
		
			$('#tableEstableHemodinamicamente').show();
			ultimomodulo = 'tableEstableHemodinamicamente';
			
			var EstableHemodinamicamente = setMenos1SiNulo($('#EstableHemodinamicamente').val());
			if (EstableHemodinamicamente == -1){alert("¿Estable Hemodinamicamente?");return scrollTopModulo("tableEstableHemodinamicamente");}
		
			if (EstableHemodinamicamente == 1) {							
				sugerencia = "Enviar a Sala de Reanimación.";
				ultimomodulo = revisarSugerenciaOutcome(sugerencia, 0);
				return ultimomodulo;
					
			} else if (EstableHemodinamicamente == 0){
			
				$('#InicioEstatina').val(1);
				var sugerencia ="Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología.";
				ultimomodulo =  revisarSugerenciaOutcome(sugerencia, 0);
				return ultimomodulo;
			}
		}
	}
					
	if ((EscalaGlasgow > 8) && (EscalaNIHSS == 0)) {
	
		$('#InicioEstatina').val(1); 
		var sugerencia ="Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología.";
		ultimomodulo =  revisarSugerenciaOutcome(sugerencia, 0);
		return ultimomodulo;
	}					
					
	return ultimomodulo;
} 


function revisarSugerenciaOutcome(sugerencia, tipo){

	var SugerenciaRemision = setMenos1SiNulo($('#SugerenciaRemision').val());	
	if (SugerenciaRemision == -1){alert("Asignar Sugerencia de Remisión/Salida");return scrollTopModulo('mudulo_sugerenciaremision');}
	
	alert($('#SugerenciaRemision').val());
	
	var IdTipoEscenarioReferencia = setMenos1SiNulo($('#IdTipoEscenarioReferencia').val());	
	if (IdTipoEscenarioReferencia == -1){alert("Asignar IdTipoEscenarioReferencia");return scrollTopModulo('mudulo_sugerenciaremision');}
				
	if (IdTipoEscenarioReferencia == 0){		
		var FechaHoraRemisionAIPSReferencia = setMenos1SiNulo($('#FechaHoraRemisionAIPSReferencia').val());	
		if (FechaHoraRemisionAIPSReferencia == -1){alert("Asignar FechaHoraRemisionAIPSReferencia");return scrollTopModulo('mudulo_sugerenciaremision');}
		
		$('#tableIdIPSReferencia').hide();
		
		$('#divCerrarEscenario').show();
			
	} else {
		if (setMenos1SiNulo($('#IdIPSReferencia').val()) == -1) {alert("Seleccione la IPS de Referencia.");return scrollTopModulo('mudulo_sugerenciaremision');}
		
		var temp = $('#IdIPSReferencia').val();
		filtrarIPSreferenciaTipoEscenario(IdTipoEscenarioReferencia);
		$('#IdIPSReferencia').val(temp);			
		$('#tableIdIPSReferencia').show();	

		$('#divCerrarEscenario').show();		
	}
	
	scrollTopModulo('mudulo_sugerenciaremision');
	ultimomodulo = 'mudulo_sugerenciaremision';
	
	return ultimomodulo;
}
