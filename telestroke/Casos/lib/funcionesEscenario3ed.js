

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
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return scrollTopModulo('WakeUpStroke');}
	
	if (WakeUpStroke == 1){ // Despertar															
		$('#tableIdRMcontraindicacion').show();	
		ultimomodulo = revisarIdRMcontraindicacion(ultimomodulo);			
			
	} else if (WakeUpStroke == 0){			
		
		var IdTipoTiempo = $('#IdTipoTiempo').val();
		if (IdTipoTiempo == -1){alert("Seleccione la Ventana de Tiempo.");}
		
		switch (IdTipoTiempo){
	
			case '1':	// Dentro Ventana (<= 6h)
	
					if (EscalaGlasgow <= 8){
						
						if (SugiereTACCraneoSimple != 1){
							$('#SugiereTACCraneoSimple').val(1);
							alert("Sugiere TAC de Cráneo Simple.");
						}
								
						ultimomodulo = 'tableIdTipoACVEnTACGmenor8';
						$('#tableIdTipoACVEnTACGmenor8').show();															
						ultimomodulo = revisarIdTipoACVEnTACGmenor8(ultimomodulo);						
																				
					} else if (EscalaGlasgow > 8){
					
							if ((EscalaNIHSS >= 0) && (EscalaNIHSS <= 6)) {
						
								$('#tableIdRMcontraindicacion').show();	
								ultimomodulo = 'tableIdRMcontraindicacion';
								ultimomodulo = revisarIdRMcontraindicacion(ultimomodulo);																							
							
							} else 	if (EscalaNIHSS > 6){
														
								ultimomodulo = 'tableIdTipoACVEnImagenes';
								$('#tableIdTipoACVEnImagenes').show();
								ultimomodulo = revisarIdTipoACVEnImagenes(ultimomodulo);																																		
							}														
					} 
					break;	
					
			case '2':	// Fuera de Ventana ( > 6 horas)	
				
					ultimomodulo = 'tableIdRMcontraindicacion';
					$('#tableIdRMcontraindicacion').show();							
					ultimomodulo = revisarIdRMcontraindicacion(ultimomodulo);
					break;	
						
			case '3':	// Fuera de Ventana > 24h					
					
					ultimomodulo = 'tableIdTipoACVEnImagenes';
					$('#tableIdTipoACVEnImagenes').show();
					ultimomodulo = revisarIdTipoACVEnImagenes(ultimomodulo);																																		
					break;					
		}
	}

	scrollTopModulo(modulo);
	
    return ultimomodulo;
}

function revisarIdTipoACVEnTACGmenor8(modulo) {
	
	var ultimomodulo = modulo;
	
	var tipoacv = setMenos1SiNulo($('#IdTipoACVEnTACGmenor8').val());
	if (tipoacv == -1){alert("Tipo ACV: seleccione el tipo de ACV en TAC (Glasgow <= 8).");return scrollTopModulo(ultimomodulo);}
	
	switch (tipoacv){
	
		case '0': // NORMAL
					$('#tableIdRMcontraindicacion').show();
					ultimomodulo = revisarIdRMcontraindicacion(ultimomodulo);	
					break;	
		case '1'://HEMORRAGICO
					ultimomodulo = revisarHemo(ultimomodulo);
					break;	
		case '2'://ISQUEMICO
					ultimomodulo = revisarIsque(ultimomodulo);
					break;	
	}
	return ultimomodulo;
}

function revisarIdTipoACVEnImagenes(modulo) {
					
	var ultimomodulo = modulo;
	
	var tipoacv = setMenos1SiNulo($('#IdTipoACVEnImagenes').val());
	if (tipoacv == -1){alert("TipoACV: seleccione el tipo de ACV en imágenes.");return scrollTopModulo(ultimomodulo);}
	
	switch (tipoacv){
	
		case '0': // NORMAL
					ultimomodulo= revisarNormal(ultimomodulo);	
					break;	
		case '1'://HEMORRAGICO
					ultimomodulo= revisarHemo(ultimomodulo);
					break;	
		case '2'://ISQUEMICO
					ultimomodulo= revisarIsque(ultimomodulo);
					break;	
	}
	return ultimomodulo;
}

function revisarIdRMcontraindicacion(modulo) {

	var ultimomodulo = modulo;
	
	var IdRMcontraindicacion = setMenos1SiNulo($('#IdRMcontraindicacion').val());
	if (IdRMcontraindicacion == -1) {alert("Responda ¿RM contraindicada?");return scrollTopModulo(ultimomodulo);}

	$('#tableIdTipoACVEnImagenes').show();	
	ultimomodulo = revisarIdTipoACVEnImagenes(ultimomodulo);
	
	return ultimomodulo;
}


function revisarNormal(modulo){
	
	var ultimomodulo = modulo;

	$('#mudulo_tiaomimic').show();
	$('#tableAsemejaACVoMimic').show();			

	var AsemejaACVoMimic = setMenos1SiNulo($('#AsemejaACVoMimic').val());
	if (AsemejaACVoMimic == -1) {alert("Responda ¿Asemeja AIT o Mimic?");return scrollTopModulo(ultimomodulo);}
	
	if (AsemejaACVoMimic == 0) {
	
		$('#tableEscalaABCD2').show();
	
		var EscalaABCD2 = setMenos1SiNulo($('#EscalaABCD2').val());
		if (EscalaABCD2 == -1){alert("Calcular Escala ABCD2");return scrollTopModulo(ultimomodulo);}							
		
		var RiesgoACVa2dias = setMenos1SiNulo($('#RiesgoACVa2dias').val());
		if (RiesgoACVa2dias == -1){alert("Asignar Riesgo ACV a 2 días");return scrollTopModulo(ultimomodulo);}																		
		
		var RiesgoACVa7dias = setMenos1SiNulo($('#RiesgoACVa7dias').val());
		if (RiesgoACVa7dias == -1){alert("Asignar Riesgo ACV a 7 días");return scrollTopModulo(ultimomodulo);}																		
		
		var RiesgoACVa90dias = setMenos1SiNulo($('#RiesgoACVa90dias').val());
		if (RiesgoACVa90dias == -1){alert("Asignar Riesgo ACV a 90 días");return scrollTopModulo(ultimomodulo);}																											
	}

	var SugerenciaRemision = setMenos1SiNulo($('#SugerenciaRemision').val());
	if (SugerenciaRemision == -1){
		EscalaABCD2_OnChange();
	}
	
	ultimomodulo = revisarSugerenciaOutcome("",0);
	
	$('#divCerrarEscenario').show();

	return ultimomodulo;											
}

function revisarEndovenosa(modulo) {
	
	var ultimomodulo = modulo;
	
	var RiesgoTromboEndovenosaAbsoluta =  setMenos1SiNulo($('#RiesgoTromboEndovenosaAbsoluta').val());
	var RiesgoTromboEndovenosaRelativa =  setMenos1SiNulo($('#RiesgoTromboEndovenosaRelativa').val());
	
	if (RiesgoTromboEndovenosaAbsoluta == -1){alert("Calcular Mitigación Riesgo Endovascular Absoluta");return scrollTopModulo(ultimomodulo);}													
	if (RiesgoTromboEndovenosaRelativa == -1){alert("Calcular Mitigación Riesgo Endovascular Relativa");return scrollTopModulo(ultimomodulo);}
	
	if (RiesgoTromboEndovenosaRelativa > 0){
	
		$('#tableTrombolizarConRelMayor0').show();	
		
		if (TrombolizarConRelMayor0 == -1){alert("Asignar Decisión Médica Trombolizar");return scrollTopModulo(ultimomodulo);}
		
		if (TrombolizarConRelMayor0 == 0){
			$('#tableJustificacionTrombolizarConRelMayor0').hide();	
		}
		if (TrombolizarConRelMayor0 == 1) {
			$('#tableJustificacionTrombolizarConRelMayor0').show();														
			if (JustificacionTrombolizarConRelMayor0 == -1){alert("Asignar Decisión Médica Trombolizar");return scrollTopModulo(ultimomodulo);}
		}																				
	} else {
		$('#tableTrombolizarConRelMayor0').hide();	
		$('#tableJustificacionTrombolizarConRelMayor0').hide();	
	}

	$('#tableHayOclusionVasosGrandes').show();
	ultimomodulo = 'tableHayOclusionVasosGrandes';
	
	ultimomodulo = revisarHayOclusionVasosGrandes(ultimomodulo);
	
	return ultimomodulo;
}

function revisarHemo(modulo) {

	var ultimomodulo = modulo;
	
	$('#mudulo_hemorragico').show();
	$('#tableIdTipoHemo').show();
							
	var IdTipoHemo = setMenos1SiNulo($('#IdTipoHemo').val());
	if (IdTipoHemo == -1) {alert("Seleccionar tipo de hemorragia."); return scrollTopModulo('tableIdTipoHemo');}	
	
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
	
	if (!revisarEscalasHemoCompletas()) {return ultimomodulo;}
	
	var SugiereAngioTACCraneo = setMenos1SiNulo($('#SugiereAngioTACCraneo').val());
	if (SugiereAngioTACCraneo != 1){ 
		alert("Realizar AngioTACoRM de Cráneo");
		$('#SugiereAngioTACCraneo').val(1);
	}	
			
	$('#tableHayHemorragiaActiva').show();
	var HayHemorragiaActiva = setMenos1SiNulo($('#HayHemorragiaActiva').val());
	if (HayHemorragiaActiva == -1) {alert("Seleccionar si hay hemorragia activa."); return scrollTopModulo('tableHayHemorragiaActiva');}

	HayHemorragiaActiva_OnChange();
															
	ultimomodulo = revisarSugerenciaOutcome("", 0);
	
	return ultimomodulo;
}

function revisarIsque(modulo) {

	var ultimomodulo = modulo;
	
	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Seleccionar ¿ACV del despertar o no presenciado?"); return ultimomodulo;}		

	if (WakeUpStroke == 1){ // Despertar - Modulo ACV Isquémico	
	
		$('#mudulo_acvisquemico').show();
		ultimomodulo = 'mudulo_acvisquemico';
		ultimomodulo = revisartableIdTipoCircIsque(ultimomodulo);	
	
	} else 	if (WakeUpStroke == 0){
		
		var IdTipoTiempo = $('#IdTipoTiempo').val();
		if (IdTipoTiempo == -1){alert("Seleccione la Ventana de Tiempo.");return scrollTopModulo(ultimomodulo);}
		
		switch (IdTipoTiempo){
		
			case '1': // En ventana <= 6h
				
					var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());
					if (EscalaGlasgow == -1){alert("Seleccione la Escala Glasgow.");return scrollTopModulo(ultimomodulo);}
				
					var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());
					if (EscalaNIHSS == -1){alert("Seleccione la Escala NIHSS.");return scrollTopModulo(ultimomodulo);}
					
					if (EscalaGlasgow <= 8) {
						
						$('#mudulo_acvisquemico').show();
						ultimomodulo = 'mudulo_acvisquemico';
						ultimomodulo = revisartableIdTipoCircIsque(ultimomodulo);	
					
					} else if (EscalaGlasgow > 8){					
						
						if (EscalaNIHSS == 0){
							// estatina
							var InicioEstatina = setMenos1SiNulo($('#InicioEstatina').val());
							if (InicioEstatina != 1){
								alert("Recordar Inicio Prevención con Antiplaquetario y Estatina");
								$('#InicioEstatina').val(1); 
							}			
							ultimomodulo = revisarTerminar(ultimomodulo);
							
						} else if ((EscalaNIHSS >= 1)  && (EscalaNIHSS <= 6)) {
							
							$('#mudulo_acvisquemico').show();
							ultimomodulo = 'mudulo_acvisquemico';
							ultimomodulo = revisartableIdTipoCircIsque(ultimomodulo);
						}
					}
					break;
						
			case '2': // // Fuera de ventana 6-24h. Ischemic Out of Window Module

					$('#tableMedidaInfarto').show();
					ultimomodulo = 'tableMedidaInfarto';
					ultimomodulo = revisarMedidaInfarto(ultimomodulo);					
					break;
						
			case '3':	 // Fuera de ventana > 24h.
					var InicioEstatina = setMenos1SiNulo($('#InicioEstatina').val());
					if (InicioEstatina != 1){
						alert("Recuerdar Inicio Prevención con Antiplaquetario y Estatina");
						$('#InicioEstatina').val(1); 
					}			
					ultimomodulo = revisarTerminar(ultimomodulo);	
					break;
		}
	}	
	
	return ultimomodulo;
}

function revisartableIdTipoCircIsque(modulo){
	
	var ultimomodulo = modulo;
	
	$('#tableIdTipoCircIsque').show();
	var IdTipoCircIsque = setMenos1SiNulo($('#IdTipoCircIsque').val());
	if (IdTipoCircIsque == -1){alert("seleccionar tipo Circ. Isquémica anterior o posterior.");return scrollTopModulo(ultimomodulo);}
	
	$('#tableIdTiempoInfarto').show();
	var IdTiempoInfarto = setMenos1SiNulo($('#IdTiempoInfarto').val());
	if (IdTiempoInfarto == -1){alert("seleccionar Tiempo del Infarto.");return scrollTopModulo(ultimomodulo);}
	
	if (IdTiempoInfarto == 0) { // agudo
		
		$('#tableASPECTS').show();
		var aspects = setMenos1SiNulo($('#ASPECTS').val());
		if (aspects == -1){alert("ASPECTS: seleccione el valor.");return scrollTopModulo(ultimomodulo);}
		
		if (aspects >= 6){
			$('#tableRiesgoTromboEndovenosaAbsoluta').show();
			$('#tableRiesgoTromboEndovenosaRelativa').show();
			ultimomodulo = 'tableRiesgoTromboEndovenosaAbsoluta';
			ultimomodulo = revisarEndovenosa(ultimomodulo);									
			
		} else	if (aspects < 6) {
			ultimomodulo = revisarTerminar(ultimomodulo);
		}
	} else { // subagudo o crónico
		$('#tableEstableHemodinamicamente').show();
		ultimomodulo = 'tableEstableHemodinamicamente';
		ultimomodulo = revisarEstableHemodinamicamente(ultimomodulo);
	}	
	
	return ultimomodulo;
}	

function revisarMedidaInfarto(modulo) {

	var ultimomodulo = modulo;
	
	var MedidaInfarto = setMenos1SiNulo($('#MedidaInfarto').val());
	if (MedidaInfarto == -1){alert("Debe Medir el Infarto");return scrollTopModulo(ultimomodulo);}

	var IdRMcontraindicacion = setMenos1SiNulo($('#IdRMcontraindicacion').val());
	if (IdRMcontraindicacion == -1){alert("Seleccione RM contraindicada.");return scrollTopModulo(ultimomodulo);}
	
	var BeneficioEndovascularFueraVentana = setMenos1SiNulo($('#BeneficioEndovascularFueraVentana').val());

	var beneficio = true;
	var razon ="";
	
	 if (IdRMcontraindicacion > 0) { // TAC perfusión	
		
		var SugiereTACdePerfusion = setMenos1SiNulo($('#SugiereTACdePerfusion').val());
		if (SugiereTACdePerfusion == -1){alert("¿SugiereTACdePerfusion?. Ingresar valor.");return scrollTopModulo(ultimomodulo);}

		if (BeneficioEndovascularFueraVentana == 1){
			
			alert("El paciente cumple condiciones de beneficio endovascular fuera de ventana: infarto < 70 mL; Vol. penumbra > 15 mL; y la tasa > 1.8");

			$('#tableHayOclusionVasosGrandes').show();
			ultimomodulo = 'tableHayOclusionVasosGrandes';
			ultimomodulo = revisarHayOclusionVasosGrandes(ultimomodulo);
			return ultimomodulo;
				
		} else {
			beneficio = false;
			razon = "El paciente NO tiene beneficio endovascular fuera de ventana (no cumple Vol. penumbra > 15 mL y la tasa >1.8)";			
		}	
		
	} else if (IdRMcontraindicacion == 0) { // RM
				
		if (BeneficioEndovascularFueraVentana == 1){
			
			alert("El paciente cumple condiciones de beneficio endovascular fuera de ventana.");							
						
			$('#tableHayOclusionVasosGrandes').show();
			ultimomodulo = 'tableHayOclusionVasosGrandes';
			ultimomodulo = revisarHayOclusionVasosGrandes(ultimomodulo);
			return ultimomodulo;

		} else {
			beneficio = false;
			razon = "El paciente NO tiene beneficio endovascular fuera de ventana.";			
		}
	}
	
	if (beneficio == false){
		alert(razon);							
		ultimomodulo = revisarTerminar(ultimomodulo);
	} 	
			
	return ultimomodulo;
}


function revisarHayOclusionVasosGrandes(modulo) {

	var ultimomodulo = modulo;


	
	var HayOclusionVasosGrandes = setMenos1SiNulo($('#HayOclusionVasosGrandes').val());
	if (HayOclusionVasosGrandes == -1){alert("¿Hay Oclusión Vasos Grandes?");return scrollTopModulo(ultimomodulo);}
	
	if (HayOclusionVasosGrandes == 1) {
		
		$('#mudulo_endovascular').show();
		ultimomodulo = 'mudulo_endovascular';
		
		$('#tableRiesgoTrombolisisEndovascular').show();
		ultimomodulo = 'tableRiesgoTrombolisisEndovascular';
		ultimomodulo = revisarEndovascular(ultimomodulo);	
		
	} else if (HayOclusionVasosGrandes == 0) {	
		
		var AdminTrombolisisEndovenosa = setToSiNulo($('#AdminTrombolisisEndovenosa').val(), 0);
		$('#AdminTrombolisisEndovenosa').val(AdminTrombolisisEndovenosa);
							
		if (AdminTrombolisisEndovenosa == 1) {
			var sugerencia = "Traslado a UCI.";
			ultimomodulo = revisarSugerenciaOutcome(sugerencia, 0);
			return ultimomodulo;
			
		} else if (AdminTrombolisisEndovenosa == 0) {		
			$('#tableEstableHemodinamicamente').show(); 
			ultimomodulo = 'tableEstableHemodinamicamente';
			ultimomodulo = revisarEstableHemodinamicamente(ultimomodulo);	
		}
	}
			
	return ultimomodulo;
}

function revisarEndovascular(modulo) {

	var ultimomodulo = modulo;
	
	var riesgo = setMenos1SiNulo($('#RiesgoTrombolisisEndovascular').val());
	if (riesgo == -1) {alert("Realice la Mitigación del Riesgo de Trombólisis Endovascular.");return scrollTopModulo(ultimomodulo);}
	
	if (riesgo == 0) {
	
		$('#AdminTrombolisisEndovascular').val(1);
		var sugerencia = "REALIZAR TERAPIA ENDOVASCULAR.";
		alert(sugerencia);
		sugerencia = "Traslado a UCI.";
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);

		$('#tableFechasHorasTIV').show();
		$('#tableTasaReperfusionPuntajeTICI').show();
		ultimomodulo = 'tableFechasHorasTIV';		
		ultimomodulo = revisarTerminar(ultimomodulo);
		
	} else if (riesgo > 0) {	
			
		$('#AdminTrombolisisEndovascular').val(0);		
		var sugerencia = "¡ATENCION: NO SE PUEDE REALIZAR TERAPIA ENDOVASCULAR !";
		alert(sugerencia);
		
		$('#tableFechasHorasTIV').hide();
		$('#tableTasaReperfusionPuntajeTICI').hide();
		
		var AdminTrombolisisEndovenosa = setToSiNulo($('#AdminTrombolisisEndovenosa').val(), 0);
		$('#AdminTrombolisisEndovenosa').val(AdminTrombolisisEndovenosa);
				
		if (AdminTrombolisisEndovenosa == 0) {
			$('#tableEstableHemodinamicamente').show();
			ultimomodulo = 'tableEstableHemodinamicamente';	
			ultimomodulo = revisarEstableHemodinamicamente(ultimomodulo);
		}		
	}	
	return ultimomodulo;
}

function revisarEstableHemodinamicamente(modulo) {
	
	var ultimomodulo = modulo;

	var estable = setMenos1SiNulo($('#EstableHemodinamicamente').val());
	if (estable == -1){alert("Estable Hemodinamicamente: seleccione el valor.");return scrollTopModulo(ultimomodulo);}
	
	ultimomodulo = revisarTerminar(ultimomodulo);
	
	return ultimomodulo;
}



function revisarTerminar(modulo) {

	var ultimomodulo = modulo;
	
	var SugerenciaRemision = setMenos1SiNulo($('#SugerenciaRemision').val());
	if (SugerenciaRemision == -1){alert("Asignar Sugerencia de Salida");return scrollTopModulo(ultimomodulo);}

	alert($('#SugerenciaRemision').val());
	
	$('#divCerrarEscenario').show();
	
	return scrollTopModulo('mudulo_sugerenciaremision');	
}

function revisarSugerenciaOutcome(sugerencia, tipo){

	var SugerenciaRemision = setMenos1SiNulo($('#SugerenciaRemision').val());	
	if (SugerenciaRemision == -1){alert("Asignar Sugerencia de Remisión/Salida");return scrollTopModulo('mudulo_sugerenciaremision');}
	
	alert($('#SugerenciaRemision').val());
	
	var FechaHoraSugerenciaSalida = setMenos1SiNulo($('#FechaHoraSugerenciaSalida').val());	
	if (FechaHoraSugerenciaSalida == -1){alert("Asignar Fecha Hora Sugerencia Salida");return scrollTopModulo('mudulo_sugerenciaremision');}
		
	scrollTopModulo('mudulo_sugerenciaremision');	
	
	$('#divCerrarEscenario').show();
		
	return scrollTopModulo('mudulo_sugerenciaremision');	
}