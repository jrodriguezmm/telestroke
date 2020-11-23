
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
			
	return ActualizarEscenario(0,1); 
}

function calcularTiempoEvolucionHoras_OnClick() {

	var FechaInicioSintomas = setMenos1SiNulo($('#FechaInicioSintomas').val());
	var HoraInicioSintomas = setMenos1SiNulo($('#HoraInicioSintomas').val());
	var FechaLlegadaPuertaUrgencias = setMenos1SiNulo($('#FechaLlegadaPuertaUrgencias').val());
	var HoraLlegadaPuertaUrgencias = setMenos1SiNulo($('#HoraLlegadaPuertaUrgencias').val());

	if ( (FechaInicioSintomas == -1) || (HoraInicioSintomas == -1) || (FechaLlegadaPuertaUrgencias == -1) || (HoraLlegadaPuertaUrgencias == -1)  ) {
		alert("No se puede calcular el tiempo de evolución. Fechas/horas incompletas.\nIntroducir manualmente o completas los datos.");
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
	
	if (tiempoI == -1) {alert("No se puede calcular la edad. Fecha de naciento vacía.\nIntroducir edad manuelmente.");return;}

	var EdadCalc = getAge(tiempoI);	
	$('#Edad').val(EdadCalc.toFixed(0));
	
	return;
}

// GUARDAR Y CONTINUAR

function btnContinuarSiguienteModulo_OnClick(modulo){

// alert("modulo: "+modulo);
	ActualizarEscenario(0,0);
	scrollTopModulo(modulo);	

	return;	
}   

function btnContinuarEnTriage_OnClick(){

	ActualizarEscenario(0,0);

	var CodigoACVActivadoPrehospitalario = setMenos1SiNulo($('#CodigoACVActivadoPrehospitalario').val()); 
	if (CodigoACVActivadoPrehospitalario == -1) {alert("Falta responder: ¿Activación  Código ACV prehospitalaria?");return;}		
	
	if (CodigoACVActivadoPrehospitalario == 0){
		
		var TriageBreveHC = setMenos1SiNulo($('#TriageBreveHC').val()); 
		if (TriageBreveHC == -1) {alert("Falta diligenciar la historia en el triage.");return;}		
	
		var NivelTriage = setMenos1SiNulo($('#NivelTriage').val()); 
		if (NivelTriage == -1) {alert("Falta seleccionar el Nivel de Triage.");return;}	
	
		var TriageMedioIngreso = setMenos1SiNulo($('#TriageMedioIngreso').val()); 	
		if (TriageMedioIngreso == -1) {alert("Falta seleccionar el Medio de Ingreso a Triage.");return;}	
		
		$('#TimeFinTriage').val(fechahoraActual());
	}
		
	limpiarTiempoEvento();
	ActualizarEscenario(0,0);
	
	scrollTopModulo("mudulo_tiempoevento");	
		
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
	
	if (EscalaBEFAST > 0){
 		limpiarHistoriaClinica();
		ActualizarEscenario(0,0);
		scrollTopModulo("mudulo_historiaclinica");		

	} else if (EscalaBEFAST == 0){ 			

	    var EmergenciologoActivaCodigoACV = setMenos1SiNulo($('#EmergenciologoActivaCodigoACV').val());
    	if (EmergenciologoActivaCodigoACV == -1){alert("Emergenciólogo Activa Código ACV: seleccione una opción.");return;}	
    	
    	if (EmergenciologoActivaCodigoACV == 0){
		    var sugerencia = "Manejo local de stroke mimic. Terminar.";
		    alert(sugerencia);			
		    asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);	
		    return;	
	    } else if (EmergenciologoActivaCodigoACV == 1){
 		    limpiarHistoriaClinica();
		    ActualizarEscenario(0,0);
		    scrollTopModulo("mudulo_historiaclinica");		
	    }	
	}
	
	var CodigoACVActivado = setMenos1SiNulo($('#CodigoACVActivado').val());
	if (CodigoACVActivado == -1){alert("CodigoACVActivado: seleccione una opción.");return;}		
		
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

	scrollTopModulo("mudulo_laboratorio");	
		
    return;
}

function btnContinuarEnLaboratorio_OnClick() {
	
	ActualizarEscenario(0,0);
		
	var LabGlucometria = setMenos1SiNulo($('#LabGlucometria').val()); 
	if (LabGlucometria == -1) {alert("Introduzca el valor de la Glucometría");return;}
		
	if (LabGlucometria >= 50){
	
		limpiarExamenFisico(); 
		ActualizarEscenario(0,0);
		
		scrollTopModulo("mudulo_examenfisico");		
		
	} else {
	
		var PersistenSintomasLuegoDextrosa = setMenos1SiNulo($('#PersistenSintomasLuegoDextrosa').val()); 
		if (PersistenSintomasLuegoDextrosa == -1) {alert("Responda si persisten los síntomas luego de aplicar dextrosa.");return;}	
        
        limpiarExamenFisico();
        
		if (PersistenSintomasLuegoDextrosa == 0){	 			
 			var sugerencia = "Manejo local de stroke mimic po Hipoglicemia. Terminar.";
			alert(sugerencia);
			asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);
		} else {	
			ActualizarEscenario(0,0);			
			scrollTopModulo("mudulo_examenfisico");				
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
	if (campo == -1) {alert("Responda la pregunta Hubo necesidad de reanimación cardiopulmonar?");return;}
		
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());	
	if (EscalaGlasgow == -1){alert("Seleccione la Escala Coma Glasgow.");return;}
	
	var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());	
	if (EscalaNIHSS == -1){alert("Seleccione la Escala NIHSS.");return;}
		
	$('#TimeFinExamenFisico').val(fechahoraActual());
	
	limpiarEvaluacionVentana();
	iniciarEvalVentanaEvento();
}

function btnContinuarEnEvaluacionVentana_OnClick() {

    return;
}


// ON CHANGE


function CodigoACVActivadoPrehospitalario_OnChange(){ 	

	var CodigoACVActivadoPrehospitalario = setMenos1SiNulo($('#CodigoACVActivadoPrehospitalario').val()); 
	if (CodigoACVActivadoPrehospitalario == -1) {alert("Falta responder ¿Activación  Código ACV prehospitalaria?");return;}
	
	limpiarTriage();
	
	limpiarTiempoEvento();
 	limpiarHistoriaClinica();
 	limpiarSugerenciaRemision();

	if (CodigoACVActivadoPrehospitalario == 1){			
		scrollTopModulo('mudulo_tiempoevento');
	} else if (CodigoACVActivadoPrehospitalario == 0){
		scrollTopModulo('mudulo_triage');
	}	

	ActualizarEscenario(0,0);
	
	return;
}

function WakeUpStroke_OnChange(){

	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("WakeUpStroke: responda si es ACV del despartar o no.");return;}	
	
	$('#FechaInicioSintomas').val(''); 
	$('#HoraInicioSintomas').val('');
	$('#TiempoEvolucionHoras').val('');
	$('#IdTipoTiempo').val(-1);	
	
	if (WakeUpStroke == 1){ // Despertar		
		$('#tableInicioSintomas').hide();
	} else if (WakeUpStroke == 0){
		scrollTopModulo('tableInicioSintomas');
	}

	limpiarActivacionCodigoACV();
	ActualizarEscenario(0,0);

	return;	
}

function TiempoEvolucionHoras_OnChange(){

	var horas = setMenos1SiNulo($('#TiempoEvolucionHoras').val());
	if (horas == -1){alert("Atención! Tiempo vacio. Indique las horas de evolución.");$('#IdTipoTiempo').val(-1);return;}	
		
	if ((horas >= 0) && (horas < 6)) {
		$('#IdTipoTiempo').val(1);
	} else
	if ((horas >= 6) && (horas < 24)) {
		$('#IdTipoTiempo').val(2);
	} else
	if (horas >= 24) {
		$('#IdTipoTiempo').val(3);
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

    $('#EmergenciologoActivaCodigoACV').val(-1);
    
	if (EscalaBEFAST > 0){
 		alert("ACTIVAR CODIGO ACV.");				
 		$('#CodigoACVActivado').val(1);
 		$('#tableEmergenciologoActivaCodigoACV').hide();
 		
	} else if (EscalaBEFAST == 0){
		$('#CodigoACVActivado').val(-1);		
		$('#tableEmergenciologoActivaCodigoACV').show();
		scrollTopModulo('EmergenciologoActivaCodigoACV');
	}	
	
 	limpiarHistoriaClinica();
 	limpiarSugerenciaRemision();
	ActualizarEscenario(0,0);	

	return;
}

function EmergenciologoActivaCodigoACV_OnChange(){

	var EmergenciologoActivaCodigoACV = setMenos1SiNulo($('#EmergenciologoActivaCodigoACV').val()); 
	if (EmergenciologoActivaCodigoACV == -1) {alert("Falta llenar si Emergenciólogo Activa Código ACV.");return;}
	
	if (EmergenciologoActivaCodigoACV == 1){
 		alert("ACTIVAR CODIGO ACV.");				
 		$('#CodigoACVActivado').val(1);
	} else if (EmergenciologoActivaCodigoACV == 0){
		$('#CodigoACVActivado').val(0);
	}	
	
 	limpiarHistoriaClinica();
 	limpiarSugerenciaRemision();
	ActualizarEscenario(0,0);
	 		
	return;
}

function IdTipoAntecedente_OnChange(){

	var idante = setMenos1SiNulo($('#IdTipoAntecedente').val());				
	if (idante == -1){alert("Seleccione antecedente.");return;}	
	
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
	
	btnContinuarEnLaboratorio_OnClick();
		
	return;
}

function EscalaGlasgow_OnChange(){
	
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());	
	if (EscalaGlasgow == -1){alert("Seleccione primero la Escala Coma Glasgow.");return;}

	if (EscalaGlasgow <= 8){
		alert("Verificar si debe intubar al paciente.");
	}
	
	limpiarEvaluacionVentana();	
 	limpiarSugerenciaRemision();
	ActualizarEscenario(0,0);		
			
	return;
}

function EscalaNIHSS_OnChange(){

	var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());	
	if (EscalaNIHSS == -1){alert("Seleccione primero la Escala NIHSS.");return;}
	
	limpiarEvaluacionVentana();	
 	limpiarSugerenciaRemision();
	ActualizarEscenario(0,0);
		
	return;
}

function IdTipoHemo_OnChange() {

	var tipohemo = setMenos1SiNulo($('#IdTipoHemo').val());
	if (tipohemo == -1){
		alert("IdTipoHemo: seleccione el tipo de hemorragia.");
		return;
	}
	
	limpiarEscalasHemo();		
		
//	alert("tipohemo."+tipohemo);
		
	if (tipohemo == 1) { //subaracnoidea		
		$('#tableEscalaFisher').show();	
		$('#tableEscalaWFNS').show();		

		$('#tableEscalaICH').hide();	
	}	
	if (tipohemo == 2) { //intracerebral		
		$('#tableEscalaICH').show();	

		$('#tableEscalaFisher').hide();	
		$('#tableEscalaWFNS').hide();	
	}	
		
	alert("Realizar AngioTAC de Cráneo");
	$('#SugiereAngioTACCraneo').val(1);
			
	$('#tablebtnContinuarSugerenciaRemision').hide();	
	limpiarSugerenciaRemision();				
	
	return;
}

function EscalaFisher_OnChange() {
	revisarEscalasHemoCompletas();
	return;
}

function EscalaWFNS_OnChange() {
	revisarEscalasHemoCompletas();
	return;
}

function EscalaICH_OnChange() {
	revisarEscalasHemoCompletas();
	return;
}
 
function revisarEscalasHemoCompletas() {

	var completos = true;

	var tipohemo = setMenos1SiNulo($('#IdTipoHemo').val());
	if (tipohemo == -1){alert("IdTipoHemo: seleccione el tipo de hemorragia.");return;}

	if (tipohemo == 1) { //subaracnoidea		
		if (setMenos1SiNulo($('#EscalaFisher').val()) == -1) {
			alert("Calcule la Escala Fisher.");
			completos = false;
		}
		if (setMenos1SiNulo($('#EscalaWFNS').val()) == -1) {
			alert("Calcule la Escala WFNS.");
			completos = false;
		}			
	}
	if (tipohemo == 2) { //intracerebral		
		if (setMenos1SiNulo($('#EscalaICH').val()) == -1) {
			alert("Calcule la Escala ICH.");
			completos = false;
		}		
	}
	if (completos == true){
		$('#tableHayHemorragiaActiva').show();		
	} else {
		$('#HayHemorragiaActiva').val(-1);
		$('#tableHayHemorragiaActiva').hide();	
		
		$('#tablebtnContinuarSugerenciaRemision').hide();	
		limpiarSugerenciaRemision();				
	}
	
	return completos;
}
 
function HayHemorragiaActiva_OnChange() {

	if (!revisarEscalasHemoCompletas()) {return;}		
	
	var activa = setMenos1SiNulo($('#HayHemorragiaActiva').val());	
	if (activa == -1){alert("HayHemorragiaActiva: seleccione si la hemorragia está activa según AngioTACCraneo.");scrollTopModulo("tableHayHemorragiaActiva");return;}
	
	var sugerencia = "";

	if (activa == 0) { //no
		sugerencia ="Traslado a UCI.";				
	} else if (activa == 1) { //si
		sugerencia ="Valoración por neurocirugía / Evaluar manejo quirúrgico.";				
	}
	
	asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);
				
	return;
}

function AsemejaACVoMimic_OnChange(){

	var mimic = setMenos1SiNulo($('#AsemejaACVoMimic').val());
	if (mimic == -1){alert("Asemeja AIT o Mimic sin responder");return;}
	
	limpiarEscalaABCD2();
	
	ActualizarEscenario(0,0);		
	
	if (mimic == 1){
		var sugerencia = "Tratamiento de MIMIC o Evaluación por neurología.";
		alert(sugerencia);
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);				
		return;
		
	} else if (mimic == 0){								
		scrollTopModulo('tableEscalaABCD2');
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
	} else
	if ((EscalaABCD2 >= 4) && (EscalaABCD2 <= 5)) {
		$('#RiesgoACVa2dias').val(4.1); 
		$('#RiesgoACVa7dias').val(5.9); 
		$('#RiesgoACVa90dias').val(9.8);
	} else
	if (EscalaABCD2 >= 6) {
		$('#RiesgoACVa2dias').val(8.1); 
		$('#RiesgoACVa7dias').val(11.7); 
		$('#RiesgoACVa90dias').val(17.8);
	} else {
		alert("Calcule la Escala ABCD2.");
		return;
	}		

	$('#InicioEstatina').val(1);
	var sugerencia ="Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología.";
	alert(sugerencia);
	asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);	

	return;
}


function CodigoACVActivado_OnChange(){ 		
	return;
}

function iniciarEvalVentanaEvento(){ 
	
	limpiarEvaluacionVentana();
	
	ActualizarEscenario(0,0);		
	
	$('#mudulo_evaluacionventana').show();

	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return;}	

	if (WakeUpStroke == 1){ // Despertar	
		
		alert("Realizar RM de cráneo simple, o TAC de cráneo simple si la RM está contraindicada (marcapasos, etc.)");								
		scrollTopModulo('tableIdRMcontraindicacion');		
		
	} else if (WakeUpStroke == 0){	
		var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());
		if (EscalaGlasgow == -1){alert("Seleccione la Escala Glasgow.");return;}	
		
		var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());
		if (EscalaNIHSS == -1){alert("Seleccione la Escala NIHSS.");return;}			
		
        var tipotiempo = $('#IdTipoTiempo').val();
        if (tipotiempo == -1){alert("IdTipoTiempo: seleccione la Ventana de Tiempo.");return;}
		
        switch (tipotiempo){
	        case '1':	// Dentro Ventana < 6h
		        if (EscalaGlasgow <= 8){
			        alert("Realizar TAC de cráneo simple.");
			        $('#SugiereTACCraneoSimple').val(1);
			        limpiarIdTipoACVEnTACGmenor8();
			        scrollTopModulo('tableIdTipoACVEnTACGmenor8');											
		        } else if (EscalaGlasgow > 8){
    				
			        if ((EscalaNIHSS >= 0) && (EscalaNIHSS <= 6)) {											
				        alert("Realizar RM de cráneo simple, o TAC de cráneo simple si la RM está contraindicada (marcapasos, etc.)");										
						limpiarIdRMcontraindicacion();
						scrollTopModulo('tableIdRMcontraindicacion');											
			        } else 	if (EscalaNIHSS > 6){						
				        alert("Realizar TAC de cráneo simple y AngioTAC (las dos).");
				        $('#SugiereTACCraneoSimple').val(2);
						$('#SugiereAngioTACCraneo').val(2);																														        
						limpiarIdTipoACVEnImagenes();
				        scrollTopModulo('tableIdTipoACVEnImagenes');
			        }														
	        	} 
	        	break;					
	        case '2':	// Fuera de Ventana 6-24h	
		        alert("Realizar RM de cráneo simple o angioMR. Si la RM está contraindicada (marcapasos, etc.) realizar TAC de cráneo simple, AngioTAC y TAC de Perfusión (los tres).");					
				limpiarIdRMcontraindicacion();					
		        scrollTopModulo('tableIdRMcontraindicacion');								 
		        break;	
	        case '3':	// Fuera de Ventana > 24h				
		        alert("Realizar RM de cráneo simple, o TAC de cráneo simple si la RM está contraindicada (marcapasos, etc.)");														
				limpiarIdRMcontraindicacion();
				scrollTopModulo('tableIdRMcontraindicacion');
		        break;				
        }    
	} 
	
	ActualizarEscenario(0,0);

    return;    
}

function IdTipoACVEnTACGmenor8_OnChange() {

	var tipoacv = setMenos1SiNulo($('#IdTipoACVEnTACGmenor8').val());
	if (tipoacv == -1){alert("TipoACV: seleccione el tipo de ACV.");return;}

	$('#TimeFinTipoACVenTACGmenor8').val(fechahoraActual());
	
	$('#mudulo_hemorragico').hide();
	$('#mudulo_acvisquemico').hide();
	$('#mudulo_tiaomimic').hide();
	$('#mudulo_evaluacionventana').show();

	limpiarIdTipoHemo();
	limpiarIdTipoCircIsque();
	limpiarAsemejaACVoMimic();
	
	switch (tipoacv) {
		
		case '0':	
				//Normal (No visible). Verificar de nuevo con MRI o CTA.
				alert("Verificar caso normal de nuevo con MR o AngioTAC");
				limpiarIdRMcontraindicacion();
				scrollTopModulo('tableIdRMcontraindicacion');
				break;
		case '1':
				// ACV hemorragico
				$('#mudulo_hemorragico').show();
				scrollTopModulo('tableIdTipoHemo');
				break;				
		case '2':
				// Modulo ACV Isquémico	
				EvaluarACVIsquemico();	
				break;
	}
	
	return;
}		

function IdTipoACVEnImagenes_OnChange() {

	var tipoacv = setMenos1SiNulo($('#IdTipoACVEnImagenes').val());
	if (tipoacv == -1){alert("Seleccione el tipo de ACV en la imagen.");return;}

	$('#TimeFinTipoACVEnImagenes').val(fechahoraActual());
	
	$('#mudulo_hemorragico').hide();
	$('#mudulo_acvisquemico').hide();
	$('#mudulo_tiaomimic').hide();
	$('#mudulo_evaluacionventana').show();

	limpiarIdTipoHemo();
	limpiarIdTipoCircIsque();
	limpiarAsemejaACVoMimic();
	
	switch (tipoacv) {
		
		case '0':	
				//Normal (No visible).
				$('#mudulo_tiaomimic').show();
				scrollTopModulo('tableAsemejaACVoMimic');
				break;
		case '1':
				// ACV hemorragico
				$('#mudulo_hemorragico').show();
				scrollTopModulo('tableIdTipoHemo');
				break;				
		case '2':
				// Modulo ACV Isquémico	
				EvaluarACVIsquemico();	
				break;
	}
	return;
}						

function EvaluarACVIsquemico(){	

	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Seleccionar ¿ACV del despertar o no presenciado?"); return;}		

	if (WakeUpStroke == 1){ // Despertar - Modulo ACV Isquémico	
	
		$('#mudulo_acvisquemico').show();
		scrollTopModulo('tableIdTipoCircIsque');	
	
	} else 	if (WakeUpStroke == 0){
		
		var IdTipoTiempo = $('#IdTipoTiempo').val();
		if (IdTipoTiempo == -1){alert("Seleccione la Ventana de Tiempo.");return;}	

		if (IdTipoTiempo == 1){ // En ventana <= 6h
			
			var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());
			if (EscalaGlasgow == -1){alert("Seleccione la Escala Glasgow.");return;}
		
			var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());
			if (EscalaNIHSS == -1){alert("Seleccione la Escala NIHSS.");return;}		
		
			if (EscalaGlasgow <= 8) {
				
				$('#mudulo_acvisquemico').show();
				scrollTopModulo('tableIdTipoCircIsque');	
				return;
			} else if (EscalaGlasgow > 8){
				
				if (EscalaNIHSS == 0) {	
					$('#InicioEstatina').val(1);
					var sugerencia = "Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología."; 
					alert(sugerencia);
					asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);				
					return;
					
				} else if ((EscalaNIHSS >= 1)  && (EscalaNIHSS <= 6)) {
					$('#mudulo_acvisquemico').show();
					scrollTopModulo('tableIdTipoCircIsque');	
					return;
				} else{
					alert("Error: Isquémico no debe llegar a Glasgow >8 y NIHSS > 6.");
				}
			}
		} else
		
		if (IdTipoTiempo == 2){ // Fuera de ventana 6-24h. Ischemic Out of Window Module
			
			var IdRMcontraindicacion = setMenos1SiNulo($('#IdRMcontraindicacion').val());
			if (IdRMcontraindicacion == -1){alert("Seleccione si la RM está contraindicada.");return;}

			if (IdRMcontraindicacion == 0){	// MRI o MRA
				alert("Realizar AngioRM para medir tamaño del infarto.");					
				$('#SugiereMRCraneoSimple').val(1);
				$('#SugiereAngioMRCraneo').val(1);	
				
			} else if (IdRMcontraindicacion > 0){// CT y CTA y CTP				
				alert("Realizar TAC de cráneo, AngioTAC y TAC de perfusión para medir tamaño del infarto (los tres).");
				$('#SugiereAngioTACCraneo').val(1);	
				$('#SugiereTACCraneoSimple').val(1);
				$('#SugiereTACdePerfusion').val(1);	
			}
			
			$('#BeneficioEndovascularFueraVentana').val(0);
			limpiarHayOclusionVasosGrandes();					
			
			$('#MedidaInfarto').val('');
			
			$('#mudulo_acvisquemico').show();
			scrollTopModulo('tableMedidaInfarto');
		} else		

		if (IdTipoTiempo == 3){ // Fuera de ventana > 24h.
		
				$('#InicioEstatina').val(1);
				var sugerencia = "Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología."; 
				alert(sugerencia);
				asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);										
		}		
	} 	
	return;
}

function IdTipoCircIsque_OnChange() {
	
	var tipocircisque = setMenos1SiNulo($('#IdTipoCircIsque').val());
	if (tipocircisque == -1){alert("IdTipoCircIsque: seleccione el tipo de circulación isque.");return;}

	limpiarIdTiempoInfarto();
	scrollTopModulo('tableIdTiempoInfarto');

	return;
}

function IdTiempoInfarto_OnChange() {
	
	var tiempoinfarto = setMenos1SiNulo($('#IdTiempoInfarto').val());
	if (tiempoinfarto == -1){alert("Tiempo del infarto: seleccione el valor.");return;}
	
	limpiarASPECTS();	
	limpiarEstableHemodinamicamente();
	limpiarSugerenciaRemision();
	
	if (tiempoinfarto == 0) { //agudo
		scrollTopModulo('tableASPECTS');		
	} else { // sugagudo o crónico		
		scrollTopModulo('tableEstableHemodinamicamente');
	}
	
	return;
}

function EstableHemodinamicamente_OnChange() {

	var estable = setMenos1SiNulo($('#EstableHemodinamicamente').val());
	if (estable == -1){alert("Estable Hemodinamicamente: seleccione el valor.");return;}
	
	var sugerencia = "";

	if (estable == 1) {
		
		$('#InicioEstatina').val('');
		
		sugerencia = "Enviar a Sala de Reanimación.";
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);
		return;
			
	} else if (estable == 0){
	
		$('#InicioEstatina').val(1);
		var sugerencia ="Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología.";
		alert(sugerencia);
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);
		return;
	}
	
	return;
}

function ASPECTS_OnChange() {

	var aspects = setMenos1SiNulo($('#ASPECTS').val());
	if (aspects == -1){alert("ASPECTS: seleccione el valor.");return;}
	
	$('#TimeFinASPECTS').val(fechahoraActual());
	
	limpiarRiesgoTromboEndovenosa();
	limpiarHayOclusionVasosGrandes();
	limpiarRiesgoTrombolisisEndovascular();
			
	if (aspects >= 6){
		
		$('#tableRiesgoTromboEndovenosaAbsoluta').show();	
		scrollTopModulo('tableRiesgoTromboEndovenosaRelativa');
		return;
		
	} else if (aspects < 6) {
	
		alert("Infarto muy extenso. No se recomienda trombolizar.");
		var sugerencia = "Traslado a UCI.";			
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);
		return;
	}
		
	return;
}

function HayOclusionVasosGrandes_OnChange() {

	limpiarRiesgoTrombolisisEndovascular();
	limpiarEstableHemodinamicamente();
	limpiarSugerenciaRemision();

	var oclusion = setMenos1SiNulo($('#HayOclusionVasosGrandes').val());
	if (oclusion == -1){alert("HayOclusionVasosGrandes: seleccione si Hay Oclusión de Vasos Grandes.");return;}
	
	$('#TimeFinOclusionVasosGrandes').val(fechahoraActual());
	
	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Seleccionar ¿ACV del despertar o no presenciado?"); return;}		
	
	if (WakeUpStroke == 0){
		
		var IdTipoTiempo = setMenos1SiNulo($('#IdTipoTiempo').val());
		if (IdTipoTiempo == -1){alert("Tipo Tiempo no determinado. Seleccionar valor."); return;}	
		
		if (IdTipoTiempo == 1) { // <= 6h Ischemic Module
			
			if (oclusion == 1){ //SI 
				
				$('#mudulo_endovascular').show();
				scrollTopModulo('tableRiesgoTrombolisisEndovascular');	
				alert("Realice la Mitigación del Riesgo de Trombólisis Endovascular.");
				return;
				
			} else if (oclusion == 0){ //NO 
								
				$('#mudulo_endovascular').hide();
				sugerencia = "ATENCION: NO APLICAR TERAPIA ENDOVASCULAR !";
				alert(sugerencia);
				$('#AdminTrombolisisEndovascular').val(0);
						
				var AdminTrombolisisEndovenosa = setToSiNulo($('#AdminTrombolisisEndovenosa').val(), 0);
				$('#AdminTrombolisisEndovenosa').val(AdminTrombolisisEndovenosa);
							
			//	alert("AdminTrombolisisEndovenosa="+AdminTrombolisisEndovenosa);
				
				if (AdminTrombolisisEndovenosa == 1) {
					var sugerencia = "Traslado a UCI.";
					asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);	
					$('#tableEstableHemodinamicamente').hide();
					$('#EstableHemodinamicamente').val(-1);	
				} else if (AdminTrombolisisEndovenosa == 0) {
					$('#EstableHemodinamicamente').val(-1);	
					$('#tableEstableHemodinamicamente').show(); 						
				}					
				return;
			}
			
		} else if (IdTipoTiempo == 2){ // 6-24h	Ischemic Out of Window Module
			
			if (oclusion == 0){ //NO: 
				$('#mudulo_endovascular').hide();
				var sugerencia = "Evaluación por neurología.";
				alert(sugerencia);
				asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);				
			}
			if (oclusion == 1){ //SI:
				$('#mudulo_endovascular').show();
				scrollTopModulo('tableRiesgoTrombolisisEndovascular'); 
				alert("Realice la Mitigación del Riesgo de Trombólisis Endovascular.");
			}
			return;
			
		} else if (IdTipoTiempo == 3) { // >24h
			
			alert("Opción no definida para HayOclusionVasosGrandes.");	
		}
		
	} else if (WakeUpStroke == 1){ // Despertar Ischemic Module
		
		if (oclusion == 1){ //SI: 
			$('#mudulo_endovascular').show();
			scrollTopModulo('tableRiesgoTrombolisisEndovascular');	
			alert("Realice la Mitigación del Riesgo de Trombólisis Endovascular.");
			return;
		}
		if (oclusion == 0){ //NO: 	
			$('#mudulo_endovascular').hide();
			sugerencia = "ATENCION: NO APLICAR TERAPIA ENDOVASCULAR !";
			alert(sugerencia);
			$('#AdminTrombolisisEndovascular').val(0);
					
			var AdminTrombolisisEndovenosa = setToSiNulo($('#AdminTrombolisisEndovenosa').val(), 0);
			$('#AdminTrombolisisEndovenosa').val(AdminTrombolisisEndovenosa);
								
			if (AdminTrombolisisEndovenosa == 1) {
				var sugerencia = "Traslado a UCI.";
				asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);	
				$('#tableEstableHemodinamicamente').hide();
				$('#EstableHemodinamicamente').val(-1);		
			} else if (AdminTrombolisisEndovenosa == 0) {		
				$('#tableEstableHemodinamicamente').show(); 
				$('#EstableHemodinamicamente').val(-1);		
			}					
			return;
		}
	}
}

function TrombolizarConRelMayor0_OnChange(){

	var TrombolizarConRelMayor0 = setMenos1SiNulo($('#TrombolizarConRelMayor0').val());	
	if (TrombolizarConRelMayor0 == -1){alert("TrombolizarConRelMayor0: seleccione TrombolizarConRelMayor0.");return;}

	$('#JustificacionTrombolizarConRelMayor0').val('');
	limpiarHayOclusionVasosGrandes();
	
	if (TrombolizarConRelMayor0 == 0){ //no
		$('#tableJustificacionTrombolizarConRelMayor0').hide();
		$('#AdminTrombolisisEndovenosa').val(0);
		alert("NO Administrar IV r-TPA.");
		
		activarOclusionVasosGrandes();
		
	} else if (TrombolizarConRelMayor0 == 1){ //si
		$('#tableJustificacionTrombolizarConRelMayor0').show();
	}		

	return;
}

function JustificacionTrombolizarConRelMayor0_OnChange(){

	var resp = setMenos1SiNulo($('#JustificacionTrombolizarConRelMayor0').val());
	if (resp == -1){
		alert("Completar: Justificación de trombolizar (relativa > 0).");		
		limpiarHayOclusionVasosGrandes();	
		return;
	}
	
	$('#AdminTrombolisisEndovenosa').val(1);
	alert("Administración IV r-TPA.");	

	activarOclusionVasosGrandes();
	
	return;
}

function activarOclusionVasosGrandes(){

	sugerencia = "Evaluar si hay oclusión de vasos grandes en AngioTAC, TAC de contraste o MRI.";
	alert(sugerencia);

	$('#SugiereAngioTACCraneo').val(1);
	$('#SugiereAngioRMCraneo').val(1);
	
	$('#TimeFinRiesgoTromboEndovenosa').val(fechahoraActual());
	
	limpiarHayOclusionVasosGrandes();
	scrollTopModulo('tableHayOclusionVasosGrandes');
		
	return;
}

function RiesgoTromboEndovenosaRelativa_OnChange() {

	RiesgoTromboEndovenosaAbsoluta_OnChange();

	return;
}

function RiesgoTromboEndovenosaAbsoluta_OnChange() {

	limpiarHayOclusionVasosGrandes();

	var absoluta = setMenos1SiNulo($('#RiesgoTromboEndovenosaAbsoluta').val());
	if (absoluta == -1) {alert("Realice la Mitigación del Riesgo de Trombólisis Endovenosa absoluta.");return;}
	
	if (absoluta == 0) {		
		var relativa = setMenos1SiNulo($('#RiesgoTromboEndovenosaRelativa').val()); 
		if (relativa == -1) {
			alert("Realice la Mitigación del Riesgo de Trombólisis Endovenosa relativa.");
			return;
		} else {		
			if (relativa == 0) {
				$('#tableTrombolizarConRelMayor0').hide();
				$('#tableJustificacionTrombolizarConRelMayor0').hide();			
				
				sugerencia = "ADMINISTRAR IV r-TPA ENDOVENOSO.";
				alert(sugerencia);
				$('#AdminTrombolisisEndovenosa').val(1);
				
				activarOclusionVasosGrandes();				
				
			} else if (relativa > 0) {	
				$('#tableTrombolizarConRelMayor0').show();
			}
		}							
	
	} else if (absoluta > 0) {
	
		$('#tableTrombolizarConRelMayor0').hide();
		$('#tableJustificacionTrombolizarConRelMayor0').hide();
		
		sugerencia = "¡ATENCION: NO SE PUEDE ADMINISTRAR IV r-TPA !";
		alert(sugerencia);
		$('#AdminTrombolisisEndovenosa').val(0);
		
		activarOclusionVasosGrandes();		
	}	

	return;
}

function RiesgoTrombolisisEndovascular_OnChange(){

	var riesgo = setMenos1SiNulo($('#RiesgoTrombolisisEndovascular').val());
	if (riesgo == -1) {alert("Realice la Mitigación del Riesgo de Trombólisis Endovascular.");return;}
	
	$('#TimeFinRiesgoTromboEndovascular').val(fechahoraActual());
	
	limpiarEstableHemodinamicamente();
	limpiarSugerenciaRemision();
	
	if (riesgo == 0) {
		
		$('#AdminTrombolisisEndovascular').val(1);
		sugerencia = "REALIZAR TERAPIA ENDOVASCULAR.";
		alert(sugerencia);

		$('#tableFechasHorasTIV').show();
		$('#tableTasaReperfusionPuntajeTICI').show();
		scrollTopModulo('FechaHoraPuncionIngle');
		
	} else if (riesgo > 0) {	
			
		$('#AdminTrombolisisEndovascular').val(0);		
		sugerencia = "¡ATENCION: NO SE PUEDE REALIZAR TERAPIA ENDOVASCULAR !";
		alert(sugerencia);
		
		$('#tableFechasHorasTIV').hide();
		$('#tableTasaReperfusionPuntajeTICI').hide();

		var AdminTrombolisisEndovenosa = setToSiNulo($('#AdminTrombolisisEndovenosa').val(), 0);		
		$('#AdminTrombolisisEndovenosa').val(AdminTrombolisisEndovenosa);
				
		if (AdminTrombolisisEndovenosa == 1) {
			var sugerencia = "Traslado a UCI.";
			asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);		
		} else if (AdminTrombolisisEndovenosa == 0) {		
			scrollTopModulo('tableEstableHemodinamicamente'); 	
		}			
	}	
		
	return;
}


function NivelTriage_OnChange() {

	return;
}

function MedidaInfarto_OnChange() {

	var MedidaInfarto = setMenos1SiNulo($('#MedidaInfarto').val());
	if (MedidaInfarto == -1){
		alert("Debe Medir el Infarto");
		limpiarHayOclusionVasosGrandes();
		return;
	}

	var IdRMcontraindicacion = setMenos1SiNulo($('#IdRMcontraindicacion').val());
	if (IdRMcontraindicacion == -1){alert("Seleccione RM contraindicada.");return;}

	limpiarHayOclusionVasosGrandes();

	var beneficio = true;
	var razon ="";
	
	 if (IdRMcontraindicacion > 0) { // TAC perfusión	
		
		var SugiereTACdePerfusion = setMenos1SiNulo($('#SugiereTACdePerfusion').val());
		if (SugiereTACdePerfusion == -1){
			alert("Realizar TAC de perfusión para medir tamaño del infarto.");
			$('#SugiereTACdePerfusion').val(1);	
		}
		
		if (MedidaInfarto < 70) {
			var pregunta = "Vol. penumbra > 15 mL y la tasa > 1.8?";
			
			var respuesta = confirm(pregunta);

				if (respuesta == true) {
					$('#BeneficioEndovascularFueraVentana').val(1);

					alert("El paciente cumple condiciones de beneficio endovascular fuera de ventana: infarto < 70 mL; Vol. penumbra > 15 mL; y la tasa > 1.8");
					
					$('#SugiereAngioTACoRMCraneo').val(1);
					sugerencia = "Realizar AngioTAC si no lo hizo antes.";
					alert(sugerencia);
					$('#tableHayOclusionVasosGrandes').show();		
					return;
					
				} else {
					beneficio = false;
					razon = "El paciente NO tiene beneficio endovascular fuera de ventana (no cumple Vol. penumbra > 15 mL y la tasa >1.8)";			
				}	
		} else {
			beneficio = false;
			razon = "El paciente NO tiene beneficio endovascular fuera de ventana (Vol. Infarto no es < 70 ml; Vol. Infarto actual = " + MedidaInfarto + ").";			
		}
		
	} else if (IdRMcontraindicacion == 0) { // RM
	
		var Edad = setMenos1SiNulo($('#Edad').val()); 
		if (Edad == -1) {alert("Falta llenar el campo Edad.");return;}
				
		var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());
		if (EscalaNIHSS == -1){alert("IdTipoCircIsque: seleccione Escala NIHSS.");return;}
				
		if ( (MedidaInfarto < 70) && ((Edad >= 80)&&(MedidaInfarto <= 20)&&(EscalaNIHSS >= 10)) || ((Edad < 80)&&(MedidaInfarto <= 30)&&(EscalaNIHSS >= 10)) || ((Edad < 80)&&(MedidaInfarto > 30)&&(MedidaInfarto < 50)&&(EscalaNIHSS >= 20))  ) {	
			$('#BeneficioEndovascularFueraVentana').val(1);			
			
			alert("El paciente cumple condiciones de beneficio endovascular fuera de ventana (Edad = " + Edad + " años; Vol. Infarto = " + MedidaInfarto + " mL; NIHSS = " + EscalaNIHSS + "). Revisar riesgos.");							
			
			$('#SugiereAngioTACoRMCraneo').val(1);
			sugerencia = "Realizar AngioRM si no lo hizo antes.";
			alert(sugerencia);
			$('#tableHayOclusionVasosGrandes').show();		
			return;

		} else {
			beneficio = false;
			razon = "El paciente NO tiene beneficio endovascular fuera de ventana (Edad = " + Edad + " años; Vol. Infarto = " + MedidaInfarto + " mL; NIHSS = " + EscalaNIHSS + ").";			
		}
	}
	
	if (beneficio == false){
		$('#BeneficioEndovascularFueraVentana').val(0);
		alert(razon);					
		var sugerencia = "Evaluación por neurología. " + razon;
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);
	} 	
			
	return;
}

function TasaReperfusionPuntajeTICI_OnChange() {

	var TasaReperfusionPuntajeTICI = setMenos1SiNulo($('#TasaReperfusionPuntajeTICI').val()); 
	if (TasaReperfusionPuntajeTICI == -1) {alert("Falta llenar el campo: Tasa Reperfusion Puntaje TICI.");return;}
	
	$('#TimeFinTasaReperfusionPuntajeTICI').val(fechahoraActual());
	
	var sugerencia = "Transferencia a UCI.";
	asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);		
		
	return;
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
	
//	alert("ActualizarEscenario...");

	var EstadoEdicion =  1;
	
	var IdEscenario = ($('#IdEscenario').val());	
	var UsuarioID =  ($('#UsuarioID').val());
	var IdCaso =  ($('#IdCaso').val());

	// ESCENARIO

	var IdIPSEscenario =  ($('#IdIPSEscenario').val());
	var FechaHoraInicioEscenario =  ($('#FechaHoraInicioEscenario').val());
	var ConsecutivoAdmision =  ($('#ConsecutivoAdmision').val());
	var EscenarioCerrado =  ($('#EscenarioCerrado').val());
	var FechaHoraCierreEscenario =  ($('#FechaHoraCierreEscenario').val());

	// TRIAGE Y CODIGO ACV

	var CodigoACVActivadoPrehospitalario =  ($('#CodigoACVActivadoPrehospitalario').val());
	var NivelTriage =  ($('#NivelTriage').val());
	var TriageBreveHC =  ($('#TriageBreveHC').val());
	var TriageMedioIngreso =  ($('#TriageMedioIngreso').val());
	var EscalaBEFAST =  ($('#EscalaBEFAST').val());
	var EmergenciologoActivaCodigoACV =  ($('#EmergenciologoActivaCodigoACV').val());
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
	var LabHemograma =  ($('#LabHemograma').val());
	var LabINR =  ($('#LabINR').val());
	var LabPT =  ($('#LabPT').val());
	var LabTPT =  ($('#LabTPT').val());
	var LabPlaquetas =  ($('#LabPlaquetas').val());
	
	// PERSISTEN SINTOMAS
	
	var PersistenSintomasLuegoDextrosa =  ($('#PersistenSintomasLuegoDextrosa').val());

	// EXAMEN FISICO

	var ExamenNeurologico =  ($('#ExamenNeurologico').val());
	var HuboReanimacionCardiopulmonar =  ($('#HuboReanimacionCardiopulmonar').val());
	var EscalaGlasgow =  ($('#EscalaGlasgow').val());
	var EscalaNIHSS = ($('#EscalaNIHSS').val());	
	
	// SUGERENCIAS
	
	var SugiereTACCraneoSimple = ($('#SugiereTACCraneoSimple').val());
	var SugiereRMCraneoSimple =  ($('#SugiereRMCraneoSimple').val());
	var SugiereAngioTACCraneo =  ($('#SugiereAngioTACCraneo').val());	
	var SugiereAngioRMCraneo =  ($('#SugiereAngioRMCraneo').val());	
	var SugiereTACdePerfusion =  ($('#SugiereTACdePerfusion').val());
	
	var InicioEstatina = ($('#InicioEstatina').val());
	var AdminTrombolisisEndovenosa =  ($('#AdminTrombolisisEndovenosa').val());
	var BeneficioEndovascularFueraVentana =  ($('#BeneficioEndovascularFueraVentana').val());	

	// TAC RM ANGIO
	
	var IdTipoACVEnTACGmenor8 = ($('#IdTipoACVEnTACGmenor8').val());
	var IdRMcontraindicacion = ($('#IdRMcontraindicacion').val());	
	var IdTipoACVEnImagenes =  ($('#IdTipoACVEnImagenes').val());

	// ACV HEMORRAGICO
	
	var IdTipoHemo = ($('#IdTipoHemo').val());			
	var EscalaFisher = ($('#EscalaFisher').val());
	var EscalaWFNS = ($('#EscalaWFNS').val());
	var EscalaICH = ($('#EscalaICH').val());
	var HayHemorragiaActiva = ($('#HayHemorragiaActiva').val());
		
	// ACV ISQUEMICO
	
	var IdTipoCircIsque = ($('#IdTipoCircIsque').val());
	var IdTiempoInfarto = ($('#IdTiempoInfarto').val());
	var EstableHemodinamicamente = ($('#EstableHemodinamicamente').val());
	var MedidaInfarto =  ($('#MedidaInfarto').val());
	
	// ACV ISQUEMICO - MODULO INTRAVENOSO
	
	var ASPECTS = ($('#ASPECTS').val());				
	var RiesgoTromboEndovenosaAbsoluta = ($('#RiesgoTromboEndovenosaAbsoluta').val());
	var RiesgoTromboEndovenosaRelativa = ($('#RiesgoTromboEndovenosaRelativa').val());	
	var TrombolizarConRelMayor0 = ($('#TrombolizarConRelMayor0').val());
	var JustificacionTrombolizarConRelMayor0 = ($('#JustificacionTrombolizarConRelMayor0').val());	
	var AdminTrombolisisEndovascular =  ($('#AdminTrombolisisEndovascular').val());
	
	// ACV ISQUEMICO - MODULO ENDOVASCULAR	
	
	var HayOclusionVasosGrandes = ($('#HayOclusionVasosGrandes').val());	

	var RiesgoTrombolisisEndovascular = ($('#RiesgoTrombolisisEndovascular').val());
	var FechaHoraPuncionIngle =  ($('#FechaHoraPuncionIngle').val());
	var FechaHoraColocacionStent =  ($('#FechaHoraColocacionStent').val());
	var FechaHoraReperfusion =  ($('#FechaHoraReperfusion').val());
	var TasaReperfusionPuntajeTICI =  ($('#TasaReperfusionPuntajeTICI').val());

	// TIA O MIMIC

	var AsemejaACVoMimic =  ($('#AsemejaACVoMimic').val());

	var EscalaABCD2 =  ($('#EscalaABCD2').val());
	var RiesgoACVa2dias =  ($('#RiesgoACVa2dias').val());
	var RiesgoACVa7dias =  ($('#RiesgoACVa7dias').val());
	var RiesgoACVa90dias =  ($('#RiesgoACVa90dias').val());
		
	// REMISION

	var SugerenciaRemision =  ($('#SugerenciaRemision').val());
	var FechaHoraSugerenciaSalida =  ($('#FechaHoraSugerenciaSalida').val());	

	// TIEMPOS
	
	var TimeFinTriage =  ($('#TimeFinTriage').val());
	var TimeFinTiempoEvento =  ($('#TimeFinTiempoEvento').val());
	var TimeFinActivacionCodigoACV =  ($('#TimeFinActivacionCodigoACV').val());
	var TimeFinHistoriaClinica =  ($('#TimeFinHistoriaClinica').val());
	var TimeFinLaboratorio =  ($('#TimeFinLaboratorio').val());
	var TimeFinExamenFisico =  ($('#TimeFinExamenFisico').val());
	
	var TimeFinEscalaABCD2 =  ($('#TimeFinEscalaABCD2').val());
	
	var TimeSugiereEvalACVEnImagenes =  ($('#TimeSugiereEvalACVEnImagenes').val());
	var TimeFinTipoACVenTACGmenor8 =  ($('#TimeFinTipoACVenTACGmenor8').val());
	var TimeFinTipoACVEnImagenes =  ($('#TimeFinTipoACVEnImagenes').val());
	var TimeFinASPECTS =  ($('#TimeFinASPECTS').val());
	var TimeFinRiesgoTromboEndovenosa =  ($('#TimeFinRiesgoTromboEndovenosa').val());
	var TimeFinOclusionVasosGrandes =  ($('#TimeFinOclusionVasosGrandes').val());
	var TimeFinRiesgoTromboEndovascular =  ($('#TimeFinRiesgoTromboEndovascular').val());
	var TimeFinTasaReperfusionPuntajeTICI =  ($('#TimeFinTasaReperfusionPuntajeTICI').val());

	
    $.ajax({
		async: false,
        type: "POST",
        url: "./bin/actualizarEscenario3.php",          
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
			
				TimeSugiereEvalACVEnImagenes: TimeSugiereEvalACVEnImagenes,
				TimeFinTipoACVenTACGmenor8: TimeFinTipoACVenTACGmenor8,
				TimeFinTipoACVEnImagenes: TimeFinTipoACVEnImagenes,
				TimeFinASPECTS: TimeFinASPECTS,
				TimeFinRiesgoTromboEndovenosa: TimeFinRiesgoTromboEndovenosa,
				TimeFinOclusionVasosGrandes: TimeFinOclusionVasosGrandes,
				TimeFinRiesgoTromboEndovascular: TimeFinRiesgoTromboEndovascular,
				TimeFinTasaReperfusionPuntajeTICI: TimeFinTasaReperfusionPuntajeTICI,
			
			
				// ESCENARIO

				IdIPSEscenario: IdIPSEscenario,
				FechaHoraInicioEscenario: FechaHoraInicioEscenario,
				ConsecutivoAdmision: ConsecutivoAdmision,
				EscenarioCerrado: EscenarioCerrado,
				FechaHoraCierreEscenario: FechaHoraCierreEscenario,

				// TRIAGE Y CODIGO ACV

				CodigoACVActivadoPrehospitalario: CodigoACVActivadoPrehospitalario,
				NivelTriage: NivelTriage,
				TriageBreveHC: TriageBreveHC,
				TriageMedioIngreso: TriageMedioIngreso,
				EscalaBEFAST: EscalaBEFAST,
				EmergenciologoActivaCodigoACV: EmergenciologoActivaCodigoACV,
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
				LabHemograma: LabHemograma,
				LabINR: LabINR,
				LabPT: LabPT,
				LabTPT: LabTPT,
				LabPlaquetas: LabPlaquetas,
				
				// PERSISTEN SINTOMAS
				
				PersistenSintomasLuegoDextrosa: PersistenSintomasLuegoDextrosa,

				// EXAMEN FISICO

				ExamenNeurologico: ExamenNeurologico,
				HuboReanimacionCardiopulmonar: HuboReanimacionCardiopulmonar,
				EscalaGlasgow: EscalaGlasgow,
				EscalaNIHSS: EscalaNIHSS,	
				
				// SUGERENCIAS
				
				SugiereTACCraneoSimple: SugiereTACCraneoSimple,
				SugiereRMCraneoSimple: SugiereRMCraneoSimple,
				SugiereAngioTACCraneo: SugiereAngioTACCraneo,	
				SugiereAngioRMCraneo: SugiereAngioRMCraneo,	
				SugiereTACdePerfusion: SugiereTACdePerfusion,
			
				InicioEstatina: InicioEstatina,
				AdminTrombolisisEndovenosa: AdminTrombolisisEndovenosa,
				AdminTrombolisisEndovascular: AdminTrombolisisEndovascular,
				BeneficioEndovascularFueraVentana: BeneficioEndovascularFueraVentana,	

				// TAC RM ANGIO
				
				IdTipoACVEnTACGmenor8: IdTipoACVEnTACGmenor8,
				IdRMcontraindicacion: IdRMcontraindicacion, 
				IdTipoACVEnImagenes: IdTipoACVEnImagenes,

				// ACV HEMORRAGICO
				
				IdTipoHemo: IdTipoHemo,			
				EscalaFisher: EscalaFisher,
				EscalaWFNS: EscalaWFNS,
				EscalaICH: EscalaICH,
				HayHemorragiaActiva: HayHemorragiaActiva,
					
				// ACV ISQUEMICO
				
				IdTipoCircIsque: IdTipoCircIsque,
				IdTiempoInfarto: IdTiempoInfarto,
				EstableHemodinamicamente: EstableHemodinamicamente,
				MedidaInfarto: MedidaInfarto,
				
				// ACV ISQUEMICO - MODULO INTRAVENOSO
				
				ASPECTS: ASPECTS,				
				RiesgoTromboEndovenosaAbsoluta: RiesgoTromboEndovenosaAbsoluta,
				RiesgoTromboEndovenosaRelativa: RiesgoTromboEndovenosaRelativa,	
				TrombolizarConRelMayor0: TrombolizarConRelMayor0,
				JustificacionTrombolizarConRelMayor0: JustificacionTrombolizarConRelMayor0,	
				
				// ACV ISQUEMICO - MODULO ENDOVASCULAR	
				
				HayOclusionVasosGrandes: HayOclusionVasosGrandes,
				
				RiesgoTrombolisisEndovascular: RiesgoTrombolisisEndovascular,
				FechaHoraPuncionIngle: FechaHoraPuncionIngle,
				FechaHoraColocacionStent: FechaHoraColocacionStent,
				FechaHoraReperfusion: FechaHoraReperfusion,
				TasaReperfusionPuntajeTICI: TasaReperfusionPuntajeTICI,

				// TIA O MIMIC
				
				AsemejaACVoMimic: AsemejaACVoMimic,
				
				EscalaABCD2: EscalaABCD2,
				RiesgoACVa2dias: RiesgoACVa2dias,
				RiesgoACVa7dias: RiesgoACVa7dias,
				RiesgoACVa90dias: RiesgoACVa90dias,
					
				// REMISION

				SugerenciaRemision: SugerenciaRemision,
				FechaHoraSugerenciaSalida: FechaHoraSugerenciaSalida
				           
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
    $('#EmergenciologoActivaCodigoACV').val(-1);
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
	$('#LabPT').val('');
	$('#LabTPT').val('');
	$('#LabPlaquetas').val('');
	$('#LabINR').val('');
	$('#LabHemograma').val('');
	
	$('#PersistenSintomasLuegoDextrosa').val(-1);

	$('#TimeFinLaboratorio').val('');
	
	limpiarExamenFisico();
}

function limpiarExamenFisico() {

	$('#mudulo_examenfisico').hide();	

	$('#ExamenNeurologico').val('');
	$('#HuboReanimacionCardiopulmonar').val(-1);
	$('#EscalaGlasgow').val('');
	$('#EscalaNIHSS').val('');
	
	$('#TimeFinExamenFisico').val('');
	
	limpiarEvaluacionVentana();
}

function limpiarEvaluacionVentana() {

	$('#SugiereTACCraneoSimple').val('');
	$('#SugiereRMCraneoSimple').val('');
	$('#SugiereAngioTACraneo').val('');
	$('#SugiereAngioRMCraneo').val('');
	$('#SugiereTACdePerfusion').val('');
	
	$('#InicioEstatina').val('');
	$('#AdminTrombolisisEndovenosa').val('');
	$('#AdminTrombolisisEndovascular').val('');
	$('#BeneficioEndovascularFueraVentana').val('');
	
	$('#TimeSugiereEvalACVEnImagenes').val('');
	$('#TimeFinTipoACVenTACGmenor8').val('');
	
	limpiarIdRMcontraindicacion();
	
	$('#mudulo_evaluacionventana').hide();	
	$('#tablebtnContinuarSugerenciaRemision').hide();	
	
	return;
}

function limpiarIdTipoHemo(){

	$('#mudulo_hemorragico').hide();
	$('#IdTipoHemo').val(-1);

	limpiarEscalasHemo();
				
	return;
}

function limpiarEscalasHemo(){
	
	$('#tableEscalaICH').hide();
	$('#tableEscalaWFNS').hide();
	$('#tableEscalaFisher').hide();
	$('#tableHayHemorragiaActiva').hide();		
		
	$('#EscalaICH').val('');	
	$('#EscalaFisher').val('');
	$('#EscalaWFNS').val('');				
	$('#HayHemorragiaActiva').val(-1);

	$('#SugiereAngioTACoRMCraneo').val('');
	
	$('#tablebtnContinuarSugerenciaRemision').hide();
	
	limpiarSugerenciaRemision();
}

function limpiarIdTipoACVEnTACGmenor8(){

	$('#tableIdTipoACVEnTACGmenor8').hide();	
	$('#IdTipoACVEnTACGmenor8').val(-1);

	$('#TimeFinTipoACVenTACGmenor8').val('');
	
	limpiarIdRMcontraindicacion();

	return;
}

function limpiarIdRMcontraindicacion(){	

	$('#tableIdRMcontraindicacion').hide();	
	$('#IdRMcontraindicacion').val(-1);

	$('#mudulo_hemorragico').hide();
	$('#mudulo_acvisquemico').hide();
	$('#mudulo_tiaomimic').hide();	
	
	limpiarIdTipoACVEnImagenes();		
		
	return
}

function limpiarIdTipoACVEnImagenes(){

	$('#mudulo_hemorragico').hide();
	$('#mudulo_acvisquemico').hide();
	$('#mudulo_tiaomimic').hide();
	
	$('#IdTipoACVEnImagenes').val(-1);
	
	
	$('#TimeFinTipoACVEnImagenes').val('');
	
	limpiarIdTipoHemo();
	limpiarIdTipoCircIsque();
	limpiarAsemejaACVoMimic();
		
	limpiarIsqueFueraVentana();
	
	limpiarSugerenciaRemision();

	return;
}

function limpiarIdTipoCircIsque(){

	$('#IdTipoCircIsque').val(-1);
	$('#tableIdTipoCircIsque').hide();

	$('#InicioEstatina').val('');

	limpiarEstableHemodinamicamente();
	limpiarIdTiempoInfarto();	
	
	return;
}

function limpiarIdTiempoInfarto(){

	$('#tableIdTiempoInfarto').hide();	
	$('#IdTiempoInfarto').val(-1);	

	$('#InicioEstatina').val('');
	
	limpiarASPECTS();	
	limpiarEstableHemodinamicamente();	
		
	return
}

function limpiarEstableHemodinamicamente() {

	$('#tableEstableHemodinamicamente').hide();
	$('#EstableHemodinamicamente').val(-1);

	$('#InicioEstatina').val('');
	
	limpiarSugerenciaRemision();
	
	return;
}

function limpiarASPECTS() {
	
	$('#tableASPECTS').hide();
	$('#ASPECTS').val('');	
	
	$('#TimeFinASPECTS').val('');
	
	limpiarRiesgoTromboEndovenosa();
	limpiarSugerenciaRemision();
	
	return;
}


function limpiarRiesgoTromboEndovenosa(){

	$('#tableRiesgoTromboEndovenosaAbsoluta').hide(); 
	$('#tableRiesgoTromboEndovenosaRelativa').hide(); 
	
	$('#AdminTrombolisisEndovenosa').val(0);	
	$('#RiesgoTromboEndovenosaAbsoluta').val(''); 				
	$('#RiesgoTromboEndovenosaRelativa').val(''); 
	$('#TrombolizarConRelMayor0').val(-1); 
	$('#JustificacionTrombolizarConRelMayor0').val(''); 
	
	$('#TimeFinRiesgoTromboEndovenosa').val('');
	
	limpiarHayOclusionVasosGrandes();
	limpiarSugerenciaRemision();
	
	return;
}

function limpiarHayOclusionVasosGrandes(){

	$('#tableHayOclusionVasosGrandes').hide(); 
	$('#HayOclusionVasosGrandes').val(-1); 

//NO EN E2
	$('#tablebtnContinuarSugerenciaRemision').hide();

	$('#TimeFinOclusionVasosGrandes').val(''); 
	
	limpiarRiesgoTrombolisisEndovascular();
	limpiarEstableHemodinamicamente();	
	limpiarSugerenciaRemision();
	
	return;
}

function limpiarRiesgoTrombolisisEndovascular(){

	$('#AdminTrombolisisEndovascular').val(0);	
	$('#RiesgoTrombolisisEndovascular').val(''); 				
	$('#tableRiesgoTrombolisisEndovascular').hide(); 

	$('#tableFechasHorasTIV').hide();	
	$('#tableTasaReperfusionPuntajeTICI').hide();

	$('#FechaHoraPuncionIngle').val(''); 
	$('#FechaHoraColocacionStent').val(''); 
	$('#FechaHoraReperfusion').val(''); 
	$('#TasaReperfusionPuntajeTICI').val(''); 
		
	$('#TimeFinRiesgoTromboEndovascular').val('');
	$('#TimeFinTasaReperfusionPuntajeTICI').val('');
	
	limpiarSugerenciaRemision();

	return;
}

function limpiarIsqueFueraVentana(){

	$('#MedidaInfarto').val('');
	$('#tableMedidaInfarto').hide();	
	
	limpiarHayOclusionVasosGrandes();
	limpiarSugerenciaRemision();		
		
	return

}

function limpiarAsemejaACVoMimic(){

	$('#mudulo_tiaomimic').hide();
		
	$('#AsemejaACVoMimic').val(-1);
	
	$('#tableAsemejaACVoMimic').hide();	
		
	limpiarEscalaABCD2();
	limpiarSugerenciaRemision();
}

function limpiarEscalaABCD2(){

	$('#tableEscalaABCD2').hide(); 

    $('#InicioEstatina').val('');
	$('#EscalaABCD2').val(''); 
	$('#RiesgoACVa2dias').val(''); 
	$('#RiesgoACVa7dias').val(''); 
	$('#RiesgoACVa90dias').val('');
	
	limpiarSugerenciaRemision();
	
	return;
}

function limpiarSugerenciaRemision(){

	$('#mudulo_sugerenciaremision').hide();
	
	$('#SugerenciaRemision').val(''); 
	$('#FechaHoraSugerenciaSalida').val(''); 
	
	$('#divCerrarEscenario').hide();
	
	return;
}

// FIN LIMPIAR


function IdRMcontraindicacion_OnChange() {

	var IdRMcontraindicacion = setMenos1SiNulo($('#IdRMcontraindicacion').val());
	if (IdRMcontraindicacion == -1) {alert("Responda ¿RM contraindicada?");return;}
	
	$('#SugiereTACCraneoSimple').val('');
	$('#SugiereRMCraneoSimple').val('');
	$('#SugiereAngioTACraneo').val('');
	$('#SugiereAngioRMCraneo').val('');
	$('#SugiereTACdePerfusion').val('');	

	limpiarIdTipoACVEnImagenes();
	
	limpiarIdTiempoInfarto();
	limpiarIsqueFueraVentana();	
	
	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return;}	

	if (WakeUpStroke == 1){ // Despertar	
		if (IdRMcontraindicacion == 0) { //RM no contraindicada
			$('#SugiereRMCraneoSimple').val(1);
		} else if (IdRMcontraindicacion > 0) { //RM contraindicada
			$('#SugiereTACCraneoSimple').val(1);		
		}		
	} else if (WakeUpStroke == 0){	

		var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());
		if (EscalaGlasgow == -1){alert("Seleccione la Escala Glasgow.");return;}	
		
		var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());
		if (EscalaNIHSS == -1){alert("Seleccione la Escala NIHSS.");return;}			
		
        var tipotiempo = $('#IdTipoTiempo').val();
        if (tipotiempo == -1){alert("IdTipoTiempo: seleccione la Ventana de Tiempo.");return;}
		
        switch (tipotiempo){
	        case '1':	// Dentro Ventana < 6h
		        if (EscalaGlasgow <= 8){
					$('#SugiereTACCraneoSimple').val(1);
					if (IdRMcontraindicacion == 0) { //RM no contraindicada
						$('#SugiereRMCraneoSimple').val(1);
					} else if (IdRMcontraindicacion > 0) { //RM contraindicada
						$('#SugiereAngioTACCraneo').val(1);			
					}						
		        } else if (EscalaGlasgow > 8){  				
			        if ((EscalaNIHSS >= 0) && (EscalaNIHSS <= 6)) {					
						if (IdRMcontraindicacion == 0) { //RM no contraindicada
							$('#SugiereRMCraneoSimple').val(1);
						} else if (IdRMcontraindicacion > 0) { //RM contraindicada
							$('#SugiereTACCraneoSimple').val(1);			
						}	
			        } else 	if (EscalaNIHSS > 6){
						alert("Error: no debe llegar aquí: <6 horas y G>8 y N>6.");
			        }														
		        } 
		        break;	  				
	        case '2':	// Fuera de Ventana 6-24h		
				if (IdRMcontraindicacion == 0) { //RM no contraindicada
					$('#SugiereRMCraneoSimple').val(1);
					$('#SugiereAngioMRCraneo').val(1);	
				} else if (IdRMcontraindicacion > 0) { //RM contraindicada
					$('#SugiereTACCraneoSimple').val(3);
					$('#SugiereAngioTACCraneo').val(3);
					$('#SugiereTACdePerfusion').val(3);
				}	
		        break;	
	        case '3':	// Fuera de Ventana > 24h
				if (IdRMcontraindicacion == 0) { //RM no contraindicada
					$('#SugiereRMCraneoSimple').val(1);
				} else if (IdRMcontraindicacion > 0) { //RM contraindicada
					$('#SugiereTACCraneoSimple').val(1);			
				}	
		        break;				
        }    	
	} 

	$('#tableIdTipoACVEnImagenes').show();	
	
	return;
}


function asignarYMostrarCamposSugerenciaOutcome(sugerencia, nousado){
	
	$('#SugerenciaRemision').val(sugerencia);		
	$('#FechaHoraSugerenciaSalida').val(fechahoraActual());	// Tiempo de Salida a UCI, alta, etc.
					
	$('#EscenarioCerrado').val(1);
	$('#FechaHoraCierreEscenario').val(fechahoraActual());
	
	$('#divCerrarEscenario').show();
	
	ActualizarEscenario(1,0);
	
	var IdCaso = $('#IdCaso').val();
	CerrarCaso(IdCaso, 1, fechahoraActual());	
	
	scrollTopModulo('mudulo_sugerenciaremision');	
	
	return;
}

function onsubmit_CerrarEscenario(){
	//var cerrado = $('#tempEscenarioCerrado').val();
	
	$('#tempFechaHoraCierreEscenario').val(fechahoraActual());
	
	var cerrado = 1;
	return ActualizarEscenario(cerrado,1);
}