
var LIMITE_PREDICTORCIRCPOSTERIOR = 2;
var LIMITE_FASTED = 4;


function btnBack_OnClick() {
	
	window.history.back();
}

function scrollTopModulo(modulo){
		
	$('#'+modulo).show();	
	$('#ultimomodulo').val(modulo);	
    $('html, body').animate({scrollTop: $("#"+modulo).offset().top}, 500);	

	return modulo;	
} 

function btnGuardarEscenario_OnClick() {
			
	return ActualizarEscenario(0, 1); 
}


function ActualizarEscenario(cerrado, mostrar) {

	var listaCampos="";
	var contador = 0;
	
	$("div:hidden, table:hidden").each(
		function(){			
			var iden = setMenos1SiNulo($(this).attr('id')); 
			if (iden != -1){
				contador += 1;
				if (contador > 1) {
					listaCampos += ";";
				}
				listaCampos += $(this).attr('id');
			}
		}	
    );
	// alert(listaCampos);	
	
	var ultimomodulo = ($('#ultimomodulo').val());	

	var guardadoOk = false;
	

	var EstadoEdicion =  1;
//	var EscenarioCerrado = cerrado;
	
	var IdEscenario = ($('#IdEscenario').val());	
	var UsuarioID =  ($('#UsuarioID').val());
	var IdCaso =  ($('#IdCaso').val());
//	var EstadoEdicion =  ($('#EstadoEdicion').val());

	// ESCENARIO

	var IdIPSEscenario =  ($('#IdIPSEscenario').val());
	var FechaHoraInicioEscenario =  ($('#FechaHoraInicioEscenario').val());
	var ConsecutivoAdmision =  ($('#ConsecutivoAdmision').val());
	var FechaHoraCierreEscenario =  ($('#FechaHoraCierreEscenario').val());
	var EscenarioCerrado =  ($('#EscenarioCerrado').val());
	
	// TRIAGE Y CODIGO ACV

	var NivelTriage =  ($('#NivelTriage').val());
	var TriageBreveHC =  ($('#TriageBreveHC').val());
	var TriageMedioIngreso =  ($('#TriageMedioIngreso').val());
	var EscalaBEFAST =  ($('#EscalaBEFAST').val());
	var CodigoACVActivado =  ($('#CodigoACVActivado').val());

	// TIEMPO DEL EVENTO

	var FechaLlegadaPuertaUrgencias =  ($('#FechaLlegadaPuertaUrgencias').val());
	var HoraLlegadaPuertaUrgencias =  ($('#HoraLlegadaPuertaUrgencias').val());
	var WakeUpStroke =  ($('#WakeUpStroke').val());
	var FechaInicioSintomas =  ($('#FechaInicioSintomas').val());
	var HoraInicioSintomas =  ($('#HoraInicioSintomas').val());
	var TiempoEvolucionHoras =  ($('#TiempoEvolucionHoras').val());
	var IdTipoTiempo =  ($('#IdTipoTiempo').val());

	// HISTORIA CLINICA

	var Edad =  ($('#Edad').val());
	var SignosSintomasNeurologicos =  ($('#SignosSintomasNeurologicos').val());
	var AntecedentesMedicosRelevantes =  ($('#AntecedentesMedicosRelevantes').val());
	var HallazgosRelevantes =  ($('#HallazgosRelevantes').val());
	var AntecedenteAnticoagulantesOrales =  ($('#AntecedenteAnticoagulantesOrales').val());
	var IdAnticoagulanteOral =  ($('#IdAnticoagulanteOral').val());

	// LAB

	var LabGlucometria =  ($('#LabGlucometria').val());

	// PERSISTEN SINTOMAS
	
	var PersistenSintomasLuegoDextrosa =  ($('#PersistenSintomasLuegoDextrosa').val());
	var PersistenSintomasGlasgowMayor8 =  ($('#PersistenSintomasGlasgowMayor8').val());

	// EXAMEN FISICO

	var ExamenNeurologico =  ($('#ExamenNeurologico').val());
	var HuboReanimacionCardiopulmonar =  ($('#HuboReanimacionCardiopulmonar').val());
	var EscalaGlasgow =  ($('#EscalaGlasgow').val());

	// TIA

	var AsemejaACVoMimic =  ($('#AsemejaACVoMimic').val());
	var EscalaABCD2 =  ($('#EscalaABCD2').val());
	var RiesgoACVa2dias =  ($('#RiesgoACVa2dias').val());
	var RiesgoACVa7dias =  ($('#RiesgoACVa7dias').val());
	var RiesgoACVa90dias =  ($('#RiesgoACVa90dias').val());
	var InicioEstatina =  ($('#InicioEstatina').val());

	// SOSPECHA ACV

	var EscalaFASTED =  ($('#EscalaFASTED').val());
	var PredictorACVIsquemicoCircPosterior =  ($('#PredictorACVIsquemicoCircPosterior').val());
	var IdTipoCircIsque =  ($('#IdTipoCircIsque').val());

	// REMISION

	var SugerenciaRemision =  ($('#SugerenciaRemision').val());
	var IdIPSReferencia =  ($('#IdIPSReferencia').val());
	var IdTipoEscenarioReferencia =  ($('#IdTipoEscenarioReferencia').val());
	var FechaHoraRemisionAIPSReferencia =  ($('#FechaHoraRemisionAIPSReferencia').val());
	
	// TIEMPOS
	
	var TimeFinTriage =  ($('#TimeFinTriage').val());
	var TimeFinTiempoEvento =  ($('#TimeFinTiempoEvento').val());
	var TimeFinActivacionCodigoACV =  ($('#TimeFinActivacionCodigoACV').val());
	var TimeFinHistoriaClinica =  ($('#TimeFinHistoriaClinica').val());
	var TimeFinLaboratorio =  ($('#TimeFinLaboratorio').val());
	var TimeFinExamenFisico =  ($('#TimeFinExamenFisico').val());
	
	var TimeFinEscalaABCD2 =  ($('#TimeFinEscalaABCD2').val());
	var TimeFinEscalaFASTED =  ($('#TimeFinEscalaFASTED').val());
	var TimeFinCircPosterior =  ($('#TimeFinCircPosterior').val());	
	
//	alert("ActualizarEscenario TIEMPOS..."+TimeFinTriage);
	
        $.ajax({
			async: false,
            type: "POST",
            url: "./bin/actualizarEscenario1.php",          
            data:{
					listaCampos: listaCampos,
					ultimomodulo: ultimomodulo,
				
					IdEscenario: IdEscenario,				
					UsuarioID: UsuarioID,
					IdCaso: IdCaso,
					EstadoEdicion: EstadoEdicion,
				
					// TIEMPOS
				
					TimeFinTriage: TimeFinTriage,
					TimeFinTiempoEvento: TimeFinTiempoEvento,
					TimeFinActivacionCodigoACV: TimeFinActivacionCodigoACV,
					TimeFinHistoriaClinica: TimeFinHistoriaClinica,
					TimeFinLaboratorio: TimeFinLaboratorio,
					TimeFinExamenFisico: TimeFinExamenFisico,
				
					TimeFinEscalaABCD2: TimeFinEscalaABCD2,
					TimeFinEscalaFASTED: TimeFinEscalaFASTED,
					TimeFinCircPosterior: TimeFinCircPosterior,

					// ESCENARIO

					IdIPSEscenario: IdIPSEscenario,
					FechaHoraInicioEscenario: FechaHoraInicioEscenario,
					ConsecutivoAdmision: ConsecutivoAdmision,
					EscenarioCerrado: EscenarioCerrado,
					FechaHoraCierreEscenario: FechaHoraCierreEscenario,

					// TRIAGE Y CODIGO ACV

					NivelTriage: NivelTriage,
					TriageBreveHC: TriageBreveHC,
					TriageMedioIngreso: TriageMedioIngreso,
					EscalaBEFAST: EscalaBEFAST,
					CodigoACVActivado: CodigoACVActivado,

					// TIEMPO DEL EVENTO
					
					FechaLlegadaPuertaUrgencias: FechaLlegadaPuertaUrgencias,
					HoraLlegadaPuertaUrgencias: HoraLlegadaPuertaUrgencias,
					WakeUpStroke: WakeUpStroke,
					FechaInicioSintomas: FechaInicioSintomas,
					HoraInicioSintomas: HoraInicioSintomas,
					TiempoEvolucionHoras: TiempoEvolucionHoras,
					IdTipoTiempo: IdTipoTiempo,
					
					// HISTORIA CLINICA

					Edad: Edad,
					SignosSintomasNeurologicos: SignosSintomasNeurologicos,
					AntecedentesMedicosRelevantes: AntecedentesMedicosRelevantes,
					HallazgosRelevantes: HallazgosRelevantes,
					AntecedenteAnticoagulantesOrales: AntecedenteAnticoagulantesOrales,
					IdAnticoagulanteOral: IdAnticoagulanteOral,

					// LAB

					LabGlucometria: LabGlucometria,

					// PERSISTEN SINTOMAS

					PersistenSintomasLuegoDextrosa: PersistenSintomasLuegoDextrosa,
					PersistenSintomasGlasgowMayor8: PersistenSintomasGlasgowMayor8,

					// EXAMEN FISICO

					ExamenNeurologico: ExamenNeurologico,
					HuboReanimacionCardiopulmonar: HuboReanimacionCardiopulmonar,
					EscalaGlasgow: EscalaGlasgow,

					// TIA

					AsemejaACVoMimic: AsemejaACVoMimic,
					EscalaABCD2: EscalaABCD2,
					RiesgoACVa2dias: RiesgoACVa2dias,
					RiesgoACVa7dias: RiesgoACVa7dias,
					RiesgoACVa90dias: RiesgoACVa90dias,
					InicioEstatina: InicioEstatina,

					// SOSPECHA ACV

					EscalaFASTED: EscalaFASTED,
					PredictorACVIsquemicoCircPosterior: PredictorACVIsquemicoCircPosterior,
					IdTipoCircIsque: IdTipoCircIsque,

					// REMISION

					SugerenciaRemision: SugerenciaRemision,
					IdIPSReferencia: IdIPSReferencia,
					IdTipoEscenarioReferencia: IdTipoEscenarioReferencia,
					FechaHoraRemisionAIPSReferencia: FechaHoraRemisionAIPSReferencia					
					
			},
            success: function(resp){
            if (resp > 0){  
					guardadoOk = true;            
					if (mostrar){alert("Escenario Guardado.");}					               		               	               	            		
                }
                else{
                    alert("No se pudo guardar el escenario: "+resp);
                }
            },
            error: function(e){
                alert("Error "+e);
            }
        });	
	
	return guardadoOk;
}

// ON CLICK

function calcularTiempoEvolucionHoras_OnClick() {

	var FechaInicioSintomas = setMenos1SiNulo($('#FechaInicioSintomas').val());
	var HoraInicioSintomas = setMenos1SiNulo($('#HoraInicioSintomas').val());
	var FechaLlegadaPuertaUrgencias = setMenos1SiNulo($('#FechaLlegadaPuertaUrgencias').val());
	var HoraLlegadaPuertaUrgencias = setMenos1SiNulo($('#HoraLlegadaPuertaUrgencias').val());

	if ( (FechaInicioSintomas == -1) || (HoraInicioSintomas == -1) || (FechaLlegadaPuertaUrgencias == -1) || (HoraLlegadaPuertaUrgencias == -1)  ) {
		alert("No se puede calcular el tiempo de evolución. Fechas/horas incompletas.\nIntroducir manuelmente o completas los datos.");
		return;
	}

//	alert("FechaInicioSintomas: "+ FechaInicioSintomas + " HoraInicioSintomas: "+ HoraInicioSintomas + " FechaLlegadaPuertaUrgencias: " + FechaLlegadaPuertaUrgencias + " HoraLlegadaPuertaUrgencias: " + HoraLlegadaPuertaUrgencias);
	
	var TiempoEvolucion = calcularHoras(FechaInicioSintomas, HoraInicioSintomas, FechaLlegadaPuertaUrgencias, HoraLlegadaPuertaUrgencias);
	
	$('#TiempoEvolucionHoras').val(TiempoEvolucion.toFixed(1));
	document.getElementById('TiempoEvolucionHoras').onchange();	
	
	return;
}

function calcularEdad_OnClick() {

	var tiempoF = fechaActual();		
	var tiempoI = setMenos1SiNulo($('#FechaNacimiento').val());
	
	if (tiempoI == -1) {
		alert("No se puede calcular la edad. Fecha de naciento vacía.\nIntroducir edad manuelmente.");
		return;
	}
/*			
	var dias = timeDIFF(tiempoI, tiempoF, "dias");	
	var EdadCalc = Number(dias)/365;
*/	

	var EdadCalc = getAge(tiempoI);	
	$('#Edad').val(EdadCalc.toFixed(0));
	
	return;
}

function iniciarEvalVentanaEvento(){
			
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());	
	if (EscalaGlasgow == -1){alert("Seleccione la Escala Coma Glasgow.");return;}
						
//	alert("IdTipoTiempo: " +tipotiempo + " " + EscalaGlasgow + " " +EscalaNIHSS);

	limpiarEvalVentana();
	
	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return;}	

	if (WakeUpStroke == 1){ // Despertar: remitir URGENTE E3
						
		$('#mudulo_evaluacionventana').hide();											
		
		var sugerencia = "URGENTE A E3.";
		alert(sugerencia);
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 3);			
		return;	
			
	} else {

		var tipotiempo = setMenos1SiNulo($('#IdTipoTiempo').val());
		if (tipotiempo == -1){alert("Seleccione la Ventana de Tiempo.");return;}	
		
		switch (tipotiempo){
			case '1':	// Dentro V
									
					if (EscalaGlasgow <= 8){
					
						$('#mudulo_evaluacionventana').hide();
						asignarYMostrarCamposSugerenciaOutcome("URGENTE A E3", 3);
						return;	
														
					} else if (EscalaGlasgow > 8){
						
						$('#mudulo_evaluacionventana').show();					
						$('#tabla_persistensintomasGlasgowMayor8').show(); 		
																	
						$('html, body').animate({
							scrollTop: $('#mudulo_evaluacionventana').offset().top
						}, 1000);				

					} 
					break;	
					
			case '2':	// Fuera de Ventana
					
					$('#mudulo_evaluacionventana').hide();
					
					var horas = setMenos1SiNulo($('#TiempoEvolucionHoras').val());
					if (horas == -1){alert("Ingrese el tiempo de evolución");return;}
					
					if ((horas > 6) && (horas <= 24)){			
						asignarYMostrarCamposSugerenciaOutcome("URGENTE A E3.", 3);
					} else if (horas > 24){
						asignarYMostrarCamposSugerenciaOutcome("PRIORITARIO A E2.", 2);				
					}
					return;	
								
					break;					
		}   
	} 
	
	ActualizarEscenario(0,0);

    return;
}


// LIMPIAR


function limpiarTriage() {

	$('#mudulo_triage').hide();

	$('#TriageBreveHC').val('');
	$('#NivelTriage').val(-1);
	$('#TriageMedioIngreso').val('');
	
	$('#TimeFinTriage').val('');
	
	limpiarTiempoEvento();
}

function limpiarTiempoEvento() {

	$('#mudulo_tiempoevento').hide();	

	$('#WakeUpStroke').val(-1);
	$('#FechaInicioSintomas').val(''); 
	$('#HoraInicioSintomas').val(''); 
	$('#FechaLlegadaPuertaUrgencias').val(''); 
	$('#HoraLlegadaPuertaUrgencias').val(''); 		
	$('#TiempoEvolucionHoras').val(''); 
	$('#IdTipoTiempo').val(-1);
	
	$('#TimeFinTiempoEvento').val('');
	
	limpiarActivacionCodigoACV();
}

function limpiarActivacionCodigoACV() {

	$('#mudulo_activacioncodigoacv').hide();

	$('#EscalaBEFAST').val('');
	$('#CodigoACVActivado').val(-1);
	
	$('#TimeFinActivacionCodigoACV').val('');
	
	limpiarHistoriaClinica();
}

function limpiarHistoriaClinica() {

	$('#mudulo_historiaclinica').hide();

	$('#Edad').val('');
	$('#SignosSintomasNeurologicos').val('');
	$('#AntecedentesMedicosRelevantes').val('');
	$('#HallazgosRelevantes').val('');
	$('#AntecedenteAnticoagulantesOrales').val(-1);
	$('#IdAnticoagulanteOral').val(-1);
	
	$('#TimeFinHistoriaClinica').val('');
	
	limpiarLaboratorio();
}

function limpiarLaboratorio() {

	$('#mudulo_laboratorio').hide();

	$('#LabGlucometria').val('');
	$('#PersistenSintomasLuegoDextrosa').val(-1);
	
	$('#TimeFinLaboratorio').val('');

	limpiarExamenFisico();
}


function limpiarExamenFisico() {

	$('#mudulo_examenfisico').hide();	

	$('#ExamenNeurologico').val('');
	$('#HuboReanimacionCardiopulmonar').val(-1);
	$('#EscalaGlasgow').val('');
	
	$('#TimeFinExamenFisico').val('');
	
	limpiarEvalVentana();
}

function limpiarEvalVentana(){

	$('#mudulo_evaluacionventana').hide();	
	$('#PersistenSintomasGlasgowMayor8').val(-1);
	
	limpiarAsemejaACVoMimic();
	limpiarEscalaFASTED();
	limpiarSugerenciaRemision();	
}

function limpiarAsemejaACVoMimic(){

	$('#mudulo_tiaomimic').hide();	
	$('#AsemejaACVoMimic').val(-1);
		
	limpiarEscalaABCD2();
	limpiarSugerenciaRemision();	
}

function limpiarEscalaABCD2(){

	$('#tableEscalaABCD2').hide(); 
	
	$('#InicioEstatina').val(0);	
	$('#EscalaABCD2').val(''); 
	$('#RiesgoACVa2dias').val(''); 
	$('#RiesgoACVa7dias').val(''); 
	$('#RiesgoACVa90dias').val('');
	
	$('#TimeFinEscalaABCD2').val('');
	
	limpiarSugerenciaRemision();	
}

function limpiarEscalaFASTED(){

	$('#tableMatrizEscalaFASTED').hide();	
	$('#EscalaFASTED').val('');
	
	$('#TimeFinEscalaFASTED').val('');
	
	limpiarPredictorACVIsquemicoCircPosterior();	
}

function limpiarPredictorACVIsquemicoCircPosterior(){

	$('#tablaPredictorACVIsquemicoCircPosterior').hide();
	$('#PredictorACVIsquemicoCircPosterior').val('');
	$('#IdTipoCircIsque').val(-1);	
	
	$('#TimeFinCircPosterior').val('');

	limpiarSugerenciaRemision();	
}

function limpiarSugerenciaRemision(){

	$('#mudulo_sugerenciaremision').hide();	

	$('#SugerenciaRemision').val(''); 
	$('#IdIPSReferencia').val(-1); 
	$('#FechaHoraRemisionAIPSReferencia').val(''); 
	
	$('#divCerrarEscenario').hide();
}


// GUARDAR Y CONTINUAR

function btnContinuarSiguienteModulo_OnClick(modulo){

// alert("modulo: "+modulo);
	ActualizarEscenario(0,0);
		
	$('#'+modulo).show();
	
    $('html, body').animate({
        scrollTop: $("#"+modulo).offset().top
    }, 1000);	

	return;	
}  

function btnContinuarEnTriage_OnClick(){
	
	$('#TimeFinTriage').val(fechahoraActual());
	
	ActualizarEscenario(0,0);
	
	var TriageBreveHC = setMenos1SiNulo($('#TriageBreveHC').val()); 
	if (TriageBreveHC == -1) {alert("Falta diligenciar la historia en el triage.");return;}			

	var NivelTriage = setMenos1SiNulo($('#NivelTriage').val()); 
	if (NivelTriage == -1) {alert("Falta seleccionar el Nivel de Triage.");return;}	

	var TriageMedioIngreso = setMenos1SiNulo($('#TriageMedioIngreso').val()); 	
	if (TriageMedioIngreso == -1) {alert("Falta seleccionar el Medio de Ingreso a Triage.");return;}	
	
	$('#TimeFinTriage').val(fechahoraActual());
		
	limpiarTiempoEvento();
	ActualizarEscenario(0,0);
	
	scrollTopModulo('mudulo_tiempoevento');
		
    return;
}

function btnContinuarEnTiempoEvento_OnClick(){
	
	ActualizarEscenario(0,0);

	var FechaLlegadaPuertaUrgencias = setMenos1SiNulo($('#FechaLlegadaPuertaUrgencias').val());
	if (FechaLlegadaPuertaUrgencias == -1){alert("Atención: Ingrese Fecha Llegada Puerta Urgencias.");return;}	

	var HoraLlegadaPuertaUrgencias = setMenos1SiNulo($('#HoraLlegadaPuertaUrgencias').val());
	if (HoraLlegadaPuertaUrgencias == -1){alert("Atención: Ingrese Hora Llegada Puerta Urgencias.");return;}	
	
	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return;}	
	
	
	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return;}	

	if (WakeUpStroke == 0){
	
		var IdTipoTiempo = setMenos1SiNulo($('#IdTipoTiempo').val());
		if (IdTipoTiempo == -1){alert("Seleccione el tipo de ventana de tiempo o ingrese el tiempo de evolución del evento.");return;}	
		
		var TiempoEvolucionHoras = setMenos1SiNulo($('#TiempoEvolucionHoras').val());
		
		if (TiempoEvolucionHoras > -1) {
			if (TiempoEvolucionHoras <= 6) {
				$('#IdTipoTiempo').val(1);
			} else { 
				if (TiempoEvolucionHoras > 6) {
					$('#IdTipoTiempo').val(2);
				}
			}	
		}
	}
		
	$('#TimeFinTiempoEvento').val(fechahoraActual());
	
	limpiarActivacionCodigoACV();
	ActualizarEscenario(0,0);

	scrollTopModulo('mudulo_activacioncodigoacv');
	
    return;
}

function btnContinuarEnActivacionCodigoACV_OnClick(){
		
	ActualizarEscenario(0,0);
	
	var EscalaBEFAST = setMenos1SiNulo($('#EscalaBEFAST').val());
	if (EscalaBEFAST == -1){alert("Calcular Escala BE-FAST.");return;}	

	$('#TimeFinActivacionCodigoACV').val(fechahoraActual());
	
	var CodigoACVActivado = setMenos1SiNulo($('#CodigoACVActivado').val());
	if (CodigoACVActivado == -1){alert("CodigoACVActivado: seleccione una opción.");return;}	
	
	if (EscalaBEFAST > 0){
 		limpiarHistoriaClinica();
		ActualizarEscenario(0,0);		
		scrollTopModulo('mudulo_historiaclinica');	
	}
	if (EscalaBEFAST == 0){ 		
		var sugerencia = "Manejo local de stroke mimic. Terminar.";
		alert(sugerencia);
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);			
	}
	
    return;
}

function btnContinuarEnHistoriaClinica_OnClick(){

	ActualizarEscenario(0,0);

	var Edad = setMenos1SiNulo($('#Edad').val()); 
	if (Edad == -1) {alert("Falta llenar el campo Edad.");return;}

	var SignosSintomasNeurologicos = setMenos1SiNulo($('#SignosSintomasNeurologicos').val()); 
	if (SignosSintomasNeurologicos == -1) {alert("Falta Signos y síntomas neurológicos.");return;}
	
	var campo = setMenos1SiNulo($('#AntecedenteAnticoagulantesOrales').val()); 
	if (campo == -1) {alert("Responda la pregunta ¿Tiene antecedente de uso de nuevos anticoagulantes orales?");return;
	} else {
		if ((campo == 1) && (setMenos1SiNulo($('#IdAnticoagulanteOral').val()) == -1) ){alert("Seleccione el anticoagulante oral.");return;}
	}
	
	$('#TimeFinHistoriaClinica').val(fechahoraActual());
 
	limpiarLaboratorio();
	ActualizarEscenario(0,0);
	
	scrollTopModulo('mudulo_laboratorio');	
		
    return;
}

function btnContinuarEnLaboratorio_OnClick() {
	
	ActualizarEscenario(0,0);
		
	var LabGlucometria = setMenos1SiNulo($('#LabGlucometria').val()); 
	if (LabGlucometria == -1) {alert("Introduzca el valor de la Glucometría");return;}
		
	if (LabGlucometria >= 50){
	
		limpiarExamenFisico(); 
		ActualizarEscenario(0,0);		
		scrollTopModulo('mudulo_examenfisico');	
		
	} else {
	
		var PersistenSintomasLuegoDextrosa = setMenos1SiNulo($('#PersistenSintomasLuegoDextrosa').val()); 
		if (PersistenSintomasLuegoDextrosa == -1) {alert("Responda si persisten los síntomas luego de aplicar dextrosa.");return;}	

		if (PersistenSintomasLuegoDextrosa == 0){	 			
 			var sugerencia = "Manejo local de stroke mimic po Hipoglicemia. Terminar.";
			alert(sugerencia);
			asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);
		} else {	
			limpiarExamenFisico(); 
			ActualizarEscenario(0,0);

			scrollTopModulo('mudulo_examenfisico');		
		}	
	}	
	
	$('#TimeFinLaboratorio').val(fechahoraActual());
		
	return;
}

function btnContinuarEnExamenFisico_OnClick() {

	ActualizarEscenario(0,0);

	var ExamenNeurologico = setMenos1SiNulo($('#ExamenNeurologico').val());
	if (ExamenNeurologico == -1){alert("Favor completar el Examen Neurológico.");return;}	

	var campo = setMenos1SiNulo($('#HuboReanimacionCardiopulmonar').val()); 
	if (campo == -1) {alert("Responda la pregunta ¿Hubo necesidad de reanimación cardiopulmonar?");return;}
		
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());	
	if (EscalaGlasgow == -1){alert("Seleccione la Escala Coma Glasgow.");return;}
	
	$('#TimeFinExamenFisico').val(fechahoraActual());
	
	limpiarEvalVentana();
	iniciarEvalVentanaEvento();
}


// ON CHANGE		
	
	
function WakeUpStroke_OnChange(){

	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("WakeUpStroke: responda si es ACV del despartar o no.");return;}	
	
	$('#FechaInicioSintomas').val(''); 
	$('#HoraInicioSintomas').val('');
	$('#TiempoEvolucionHoras').val('');
	$('#IdTipoTiempo').val(-1);	
	
	if (WakeUpStroke == 1){ // Despertar		
		$('#tableInicioSintomas').hide();
	} else {
		scrollTopModulo('tableInicioSintomas');
	}

	limpiarActivacionCodigoACV();
	ActualizarEscenario(0,0);

	return;	
}

function TiempoEvolucionHoras_OnChange(){

	var horas = setMenos1SiNulo($('#TiempoEvolucionHoras').val());
	if (horas == -1){
		alert("Atención! Tiempo vacio. Indique las horas de evolución.");
		$('#IdTipoTiempo').val(-1);
		return;
	}	
		
	if ((horas > 0) && (horas <= 6)) {
		$('#IdTipoTiempo').val(1);
	} else { 
		if (horas > 6) {
			$('#IdTipoTiempo').val(2);
		}
	}		
	
	limpiarActivacionCodigoACV();
	ActualizarEscenario(0,0);
		
	return;
}

function IdTipoTiempo_OnChange() {

	var tipotiempo = setMenos1SiNulo($('#IdTipoTiempo').val());
	if (tipotiempo == -1){alert("IdTipoTiempo: seleccione la Ventana de Tiempo.");return;}	
	
	$('#TiempoEvolucionHoras').val('');	
	
	limpiarActivacionCodigoACV();
	ActualizarEscenario(0,0);
		
	return;
}

function EscalaBEFAST_OnChange(){

	var EscalaBEFAST = setMenos1SiNulo($('#EscalaBEFAST').val()); 
	if (EscalaBEFAST == -1) {alert("Falta llenar la Escala BE-FAST.");return;}

	if (EscalaBEFAST > 0){
 			alert("ACTIVAR CODIGO ACV.");				
 			$('#CodigoACVActivado').val(1);
	} else {
			$('#CodigoACVActivado').val(0);
	}	
	
 	limpiarHistoriaClinica();
 	limpiarSugerenciaRemision();
	ActualizarEscenario(0,0);	

	return;
}

function CodigoACVActivado_OnChange(){ 		
	return;
}

function IdTipoAntecedente_OnChange(){

	var idante = setMenos1SiNulo($('#IdTipoAntecedente').val());
					
	if (idante == -1){
		alert("Seleccione antecedente.");
		return;
	}	
	
	var ante =  $('#IdTipoAntecedente option[value=\''+idante+'\']').text();
	var nuevalista = $('#AntecedentesMedicosRelevantes').val() + "; " + ante;
	$('#AntecedentesMedicosRelevantes').val(nuevalista);
			
    return;
}

function AntecedenteAnticoagulantesOrales_OnChange(){

	var resp = $('#AntecedenteAnticoagulantesOrales').val();
	
	if (resp == -1){
		alert("¿Tiene Antecedentes de Uso de Anticoagulantes Orales?");
		return;
	} 

	if (resp == 1) {
		$('#TableIdAnticoagulanteOral').show(); 
	} else {
		$('#IdAnticoagulanteOral').val('-1');
		$('#TableIdAnticoagulanteOral').hide(); 	
	}

    return;
}

function Glucometria_OnChange(){

	var LabGlucometria = setMenos1SiNulo($('#LabGlucometria').val()); 
	if (LabGlucometria == -1) {alert("Introduzca el valor de la Glucometría inicial.");return;}
	
	if  (LabGlucometria >= 50){
		$('#PersistenSintomasLuegoDextrosa').val(-1);
		$('#tablePersistenSintomasLuegoDextrosa').hide();		
	} else {
		alert("Hipoglucemia: Realizar tratamiento con dextrosa y revisar si persisten los signos.");
		$('#tablePersistenSintomasLuegoDextrosa').show();	
	}
	
	limpiarExamenFisico();	
 	limpiarSugerenciaRemision();
	ActualizarEscenario(0,0);		
	
	return;
}


function PersistenSintomasLuegoDextrosa_OnChange(){

	var PersistenSintomasLuegoDextrosa = setMenos1SiNulo($('#PersistenSintomasLuegoDextrosa').val()); 
	if (PersistenSintomasLuegoDextrosa == -1) {alert("Falta llenar si Persisten Síntomas Luego Dextrosa.");return;}
		
	return;
}

function EscalaGlasgow_OnChange(){
	
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());	
	if (EscalaGlasgow == -1){alert("Seleccione primero la Escala Coma Glasgow.");return;}

	if (EscalaGlasgow <= 8){
		alert("Verificar si debe intubar al paciente.");
	}
	
	limpiarEvalVentana();	
 	limpiarSugerenciaRemision();
	ActualizarEscenario(0,0);		
			
	return;
}

function PersistenSintomasGlasgowMayor8_OnChange(){

	var PersistenSintomasGlasgowMayor8 = setMenos1SiNulo($('#PersistenSintomasGlasgowMayor8').val()); 
	if (PersistenSintomasGlasgowMayor8 == -1) {alert("Falta llenar la Persisten Síntomas con Glasgow > 8.");return;}

 	limpiarAsemejaACVoMimic();				
	limpiarEscalaFASTED();
	
	if (PersistenSintomasGlasgowMayor8 == 0){
		$('#mudulo_tiaomimic').show();		
		scrollTopModulo('tableAsemejaACVoMimic');
	}
	if (PersistenSintomasGlasgowMayor8 == 1){
		$('#tableMatrizEscalaFASTED').show(); 
		scrollTopModulo('EscalaFASTED');	
	}	

	limpiarSugerenciaRemision();
	ActualizarEscenario(0,0);	
						
	return;
}

function AsemejaACVoMimic_OnChange(){

	var mimic = setMenos1SiNulo($('#AsemejaACVoMimic').val());
	if (mimic == -1){alert("Asemeja AIT o Mimic sin responder");return;}
	
	limpiarEscalaABCD2();
	
	if (mimic == 1){
		var sugerencia = "Tratamiento de MIMIC o Evaluación por neurología.";
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);				
		return;
	}

	if (mimic == 0){							
		$('#tableEscalaABCD2').show();	
		scrollTopModulo('EscalaABCD2');
		return;
	}	
		
	return;
}

function EscalaABCD2_OnChange() {

	var EscalaABCD2 = setMenos1SiNulo($('#EscalaABCD2').val());
	if (EscalaABCD2 == -1){alert("Calcule la Escala ABCD2.");return;}						
	
	$('#TimeFinEscalaABCD2').val(fechahoraActual());
	
	/*
	Puntaje 0-3 (riesgo bajo) / riesgo ACV a 2 dias=1.0% ; riesgo ACV a 7 dias 1.2% ; riesgo ACV a 90 dias 3.1%
	Puntaje 4-5 (riesgo moderado) / riesgo ACV a 2 dias=4.1% ; riesgo ACV a 7 dias 5.9% ; riesgo ACV a 90 dias 9.8%
	Puntaje 6-7 (riesgo alto) / riesgo ACV a 2 dias=8.1% ; riesgo ACV a 7 dias 11.7% ; riesgo ACV a 90 dias 17.8%
	*/	
		
	if ((EscalaABCD2 >= 0) && (EscalaABCD2 <= 3)) {
		$('#RiesgoACVa2dias').val(1); 
		$('#RiesgoACVa7dias').val(1.2); 
		$('#RiesgoACVa90dias').val(3.1);
	}
	if ((EscalaABCD2 >= 4) && (EscalaABCD2 <= 5)) {
		$('#RiesgoACVa2dias').val(4.1); 
		$('#RiesgoACVa7dias').val(5.9); 
		$('#RiesgoACVa90dias').val(9.8);
	}
	if (EscalaABCD2 >= 6) {
		$('#RiesgoACVa2dias').val(8.1); 
		$('#RiesgoACVa7dias').val(11.7); 
		$('#RiesgoACVa90dias').val(17.8);
	}

	$('#InicioEstatina').val(1); 
	alert("Se Recuerda Inicio Prevención con Antiplaquetarios y Estatinas");									
								
	asignarYMostrarCamposSugerenciaOutcome("URGENTE A E3", 3);

	return;
}


function EscalaFASTED_OnChange() {

	limpiarPredictorACVIsquemicoCircPosterior();
	limpiarSugerenciaRemision();
	
	var EscalaFASTED = setMenos1SiNulo($('#EscalaFASTED').val());
	if (EscalaFASTED == -1){alert("Seleccione la Escala FASTED.");return;}
	
	$('#TimeFinEscalaFASTED').val(fechahoraActual());

	if (EscalaFASTED >= LIMITE_FASTED) { // Oclusión. URGENTE A E3
			
		$('#tablaPredictorACVIsquemicoCircPosterior').hide(); 
		$('#tableIdTipoCircIsque').hide();
		
		asignarYMostrarCamposSugerenciaOutcome("URGENTE A E3.", 3);
			
	} else 	if (EscalaFASTED < LIMITE_FASTED) { // Sin Oclusión: ir a Predictor circ. Isque.
			
		$('#PredictorACVIsquemicoCircPosterior').val('');
		$('#tablaPredictorACVIsquemicoCircPosterior').show(); 
		ActualizarEscenario(0,0);												
	}

	return;
}

function PredictorACVIsquemicoCircPosterior_OnChange() {

	var PredictorACVIsquemicoCircPosterior = setMenos1SiNulo($('#PredictorACVIsquemicoCircPosterior').val());
	if (PredictorACVIsquemicoCircPosterior == -1){alert("seleccione Predictor ACV Isquémico Circ. Posterior.");return;}						
	
	$('#TimeFinCircPosterior').val(fechahoraActual());
	
	$('#IdTipoCircIsque').val(-1);	
	$('#tableIdTipoCircIsque').show();	
	
	if (PredictorACVIsquemicoCircPosterior < LIMITE_PREDICTORCIRCPOSTERIOR) {
		$('#IdTipoCircIsque').val(1); // anterior
	} else if (PredictorACVIsquemicoCircPosterior >= LIMITE_PREDICTORCIRCPOSTERIOR) {
		$('#IdTipoCircIsque').val(2);	 // posterior
	}
	
	IdTipoCircIsque_OnChange();
}

function IdTipoCircIsque_OnChange(){

	var IdTipoCircIsque = setMenos1SiNulo($('#IdTipoCircIsque').val());
	if (IdTipoCircIsque == -1){alert("IdTipoCircIsque: seleccione el Tipo Circ. Isque.");return;}	

	if (IdTipoCircIsque == 1) { // Anterior: URGENTE A E2 O E3, EL MAS CERCANO
		asignarYMostrarCamposSugerenciaOutcome("URGENTE A E2 o E3, EL MAS CERCANO.", 23);
	} else 	if (IdTipoCircIsque == 2) { // Posterior: URGENTE A E3.
		asignarYMostrarCamposSugerenciaOutcome("URGENTE A E3.", 3);
	}	
    return;
}

function asignarYMostrarCamposSugerenciaOutcome(sugerencia, IdTipoEscenarioReferencia){
		
	$('#SugerenciaRemision').val(sugerencia);
	$('#IdIPSReferencia').val(-1);
	
	$('#IdTipoEscenarioReferencia').val(IdTipoEscenarioReferencia);
	
	if (IdTipoEscenarioReferencia == 0){
		
		$('#EscenarioCerrado').val(1);
		$('#FechaHoraRemisionAIPSReferencia').val(fechahoraActual()); // Tiempo de Salida a UCI, alta, etc.
		$('#FechaHoraCierreEscenario').val(fechahoraActual());
		
		$('#tableIdIPSReferencia').hide();
		$('#divCerrarEscenario').show();
		
		ActualizarEscenario(1,0);
		
		var IdCaso = $('#IdCaso').val();
		CerrarCaso(IdCaso, 1, fechahoraActual());
		
	} else {
		
		$('#EscenarioCerrado').val(0);
		$('#FechaHoraRemisionAIPSReferencia').val("");
		
		filtrarIPSreferenciaTipoEscenario(IdTipoEscenarioReferencia);
		$('#tableIdIPSReferencia').show();	
		$('#divCerrarEscenario').hide();
		
		ActualizarEscenario(0,0);
	}
		
	scrollTopModulo('mudulo_sugerenciaremision');
						
	return;
}

function onsubmit_CerrarEscenario(){
	$('#EscenarioCerrado').val(1);
	$('#FechaHoraCierreEscenario').val(fechahoraActual());
	
	return ActualizarEscenario(1, 1);
}

function IdIPSReferencia_OnChange() {

	if (setMenos1SiNulo($('#IdIPSReferencia').val()) == -1) {alert("Seleccione la IPS de Referencia.");return;}

	$('#FechaHoraRemisionAIPSReferencia').val(fechahoraActual()); // Tiempo de remisión a otro escenario.
	
	ActualizarEscenario(0,0);	

	$('#divCerrarEscenario').show();
	
	return;
}

function filtrarIPSreferenciaTipoEscenario(IdTipoEscenarioReferencia) {

	var IdIPSEscenario = setMenos1SiNulo($('#IdIPSEscenario').val()); 
				       		
    $.ajax({
		async: false,
        type: "POST",
        url: "./bin/filtrarIPSreferenciaTipoEscenario.php",          
        data:{
			IdIPSEscenario: IdIPSEscenario,
			IdTipoEscenarioReferencia: IdTipoEscenarioReferencia
		},
        success: function(resp){    
			$('#IdIPSReferencia').html(resp);
        },
        error: function(e){
            alert("Error "+e);
        }
    });

	return;
}