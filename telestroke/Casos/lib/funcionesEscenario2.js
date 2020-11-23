
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
	if (campo == -1) {alert("Responda la pregunta ¿Hubo necesidad de reanimación cardiopulmonar?");return;}
		
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());	
	if (EscalaGlasgow == -1){alert("Seleccione la Escala Coma Glasgow.");return;}
	
	var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());	
	if (EscalaNIHSS == -1){alert("Seleccione la Escala NIHSS.");return;}
	
	$('#TimeFinExamenFisico').val(fechahoraActual());
	
	limpiarEvaluacionVentana();	
	iniciarEvalVentanaEvento();
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

	if (!revisarEscalasHemoCompletas()) {return;}TrombolizarConRelMayor0		
	
	var activa = setMenos1SiNulo($('#HayHemorragiaActiva').val());	
	if (activa == -1){alert("HayHemorragiaActiva: seleccione si la hemorragia está activa según AngioTACCraneo.");scrollTopModulo("tableHayHemorragiaActiva");return;
	}
	
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

function PersistenSintomasTACnormal_OnChange(){

	var PersistenSintomasTACnormal = setMenos1SiNulo($('#PersistenSintomasTACnormal').val());
	if (PersistenSintomasTACnormal == -1){alert("Responda si persisten los síntomas con ACV no visible en TAC.");return;}	
	
	limpiarIdTipoCircIsque();	
	limpiarIdTiempoInfarto();	
	limpiarAsemejaACVoMimic();		
	limpiarRiesgoTromboEndovenosa();
	
	ActualizarEscenario(0,0);	
				
	if (PersistenSintomasTACnormal == 0){
		
		$('#mudulo_acvisquemico').hide();
		scrollTopModulo('mudulo_tiaomimic');
		return;	
		
	} else if (PersistenSintomasTACnormal == 1){
		
		$('#mudulo_acvisquemico').show();
		$('#tableRiesgoTromboEndovenosaAbsoluta').show();
		scrollTopModulo('tableRiesgoTromboEndovenosaRelativa');		
		return;			
	}	
	return;
}

function CodigoACVActivado_OnChange(){ 		
	return;
}

function IdTipoACVenTAC_OnChange() {

	var tipoacv = setMenos1SiNulo($('#IdTipoACVenTAC').val());
	if (tipoacv == -1){alert("IdTipoACVenTAC: seleccione el tipo de ACV (hemo./isque.).");return;}
	
	$('#TimeFinTipoACVenTAC').val(fechahoraActual());	
	
	limpiarPersistenSintomasTACnormal();
	limpiarIdTipoHemo();
	limpiarIdTipoCircIsque();
	
	limpiarSugerenciaRemision();	
	
	ActualizarEscenario(0,0);

	if (tipoacv == 1) {// ACV hemorragico
		
		scrollTopModulo('tableIdTipoHemo');
		return;
		
	} else { 	// ACV isquémico o no visible
	
		var tipotiempo = $('#IdTipoTiempo').val();
		if (tipotiempo == -1){alert("Seleccione la Ventana de Tiempo.");return;}		
		
		if (tipotiempo == 1){ // en ventana <6 horas
		
			if (tipoacv == 0) {	// acv no visible-normal
				scrollTopModulo('tablePersistenSintomasTACnormal');
				return;				
			} else if (tipoacv == 2) { //acv isquémico
				iniciarEvalVentanaIsque();	
				return;
			}					
		} else if (tipotiempo == 2){ //FUERA DE VENTANA 6 a 24 horas
		
			var sugerencia ="URGENTE A E3.";				
			alert(sugerencia);
			asignarYMostrarCamposSugerenciaOutcome(sugerencia, 3);
			return;
			
		} else if (tipotiempo == 3){ //FUERA DE VENTANA > 24 horas		
			
			$('#InicioEstatina').val(1);
			var sugerencia ="Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología.";
			alert(sugerencia);
			asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);
			return;	
		} 
	}	
	return;
}



function iniciarEvalVentanaIsque(){

	limpiarIdTipoCircIsque();

	ActualizarEscenario(0,0);		
	
	var EscalaGlasgow = setMenos1SiNulo($('#EscalaGlasgow').val());
	if (EscalaGlasgow == -1){alert("IdTipoCircIsque: seleccione la Escala Coma Glasgow.");return;}
	
	if (EscalaGlasgow <= 8) {
	
		$('#mudulo_evaluacionventana').show();
		$('#mudulo_acvisquemico').show();
		scrollTopModulo('tableIdTipoCircIsque');
			
	} else if (EscalaGlasgow > 8) {
	
		var EscalaNIHSS = setMenos1SiNulo($('#EscalaNIHSS').val());	
		if (EscalaNIHSS == -1){alert("IdTipoCircIsque: seleccione la Escala NIHSS.");return;}
	
		if (EscalaNIHSS == 0) {
		
			$('#InicioEstatina').val(1);
			var sugerencia ="Se recomienda inicio de la prevención secundaria (antiagregante o anticoagulante y estatina) y Evaluación por neurología.";
			alert(sugerencia);
			asignarYMostrarCamposSugerenciaOutcome(sugerencia, 0);	
			
		} else if (EscalaNIHSS > 0){
		
			$('#mudulo_evaluacionventana').show();
			$('#mudulo_acvisquemico').show();
			scrollTopModulo('tableIdTipoCircIsque');
		} 
	}
		
	return;
}


function IdTipoCircIsque_OnChange() {

	var tipocircisque = setMenos1SiNulo($('#IdTipoCircIsque').val());
	if (tipocircisque == -1){alert("IdTipoCircIsque: seleccione el tipo de circulación isquémica (ant./post.).");return;}
	
	limpiarIdTiempoInfarto();
	
	ActualizarEscenario(0,0);	
	
	scrollTopModulo('tableIdTiempoInfarto');
	return;
}


function IdTiempoInfarto_OnChange() {
	
	var tiempoinfarto = setMenos1SiNulo($('#IdTiempoInfarto').val());
	if (tiempoinfarto == -1){alert("Tiempo del infarto: seleccione el valor.");return;}
	
	limpiarEstableHemodinamicamente(); 
	limpiarASPECTS();
	limpiarSugerenciaRemision();
	
	ActualizarEscenario(0,0);	
		
	if (tiempoinfarto == 0) { //agudo
		scrollTopModulo('tableASPECTS');
		return;
	} else { // sugagudo o crónico
		scrollTopModulo('tableEstableHemodinamicamente');
		return;	
	}
	
	return;
}

function EstableHemodinamicamente_OnChange() {

	var estable = setMenos1SiNulo($('#EstableHemodinamicamente').val());
	if (estable == -1){alert("Estable Hemodinamicamente: seleccione el valor.");return;}
	
	var sugerencia = "";

	if (estable == 1) {
		
		$('#InicioEstatina').val(0);
		
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
			
	if (aspects >= 6){
		
		$('#tableRiesgoTromboEndovenosaAbsoluta').show();	
		$('#tableRiesgoTromboEndovenosaRelativa').show();
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

	var resp = setMenos1SiNulo($('#HayOclusionVasosGrandes').val());
	if (resp == -1){alert("HayOclusionVasosGrandes: seleccione si Hay Oclusión de Vasos Grandes.");return;}

	$('#TimeFinOclusionVasosGrandes').val(fechahoraActual());
	
	$('#tablebtnContinuarSugerenciaRemision').hide();
	limpiarSugerenciaRemision();
			
	if (resp == 1){ //SI: URG E3
		asignarYMostrarCamposSugerenciaOutcome("URGENTE a E3", 3);
	} else if (resp == 0){ //NO: UCI
		asignarYMostrarCamposSugerenciaOutcome("Traslado a UCI.", 0);
	}		
	
	return;
}


function TrombolizarConRelMayor0_OnChange(){

	var TrombolizarConRelMayor0 = setMenos1SiNulo($('#TrombolizarConRelMayor0').val());	
	if (TrombolizarConRelMayor0 == -1){alert("TrombolizarConRelMayor0: seleccione TrombolizarConRelMayor0.");return;}
	
	$('#JustificacionTrombolizarConRelMayor0').val('');
	limpiarHayOclusionVasosGrandes();
	
	if (TrombolizarConRelMayor0 == 0){ //no
		$('#tableJustificacionTrombolizarConRelMayor0').hide();
		$('#AdminTrombolisisEndovenosa').val(0);
		alert("NO Administrar t-PA.");
		
		sugerirAngioTAC();
		
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
	alert("Administración t-PA.");	

	sugerirAngioTAC();
	
	return;
}

function sugerirAngioTAC(){

	$('#SugiereAngioTACCraneo').val(1);
	sugerencia = "Realizar AngioTAC de cráneo.";
	alert(sugerencia);
	
	$('#TimeFinRiesgoTromboEndovenosa').val(fechahoraActual());
	
	limpiarHayOclusionVasosGrandes();	
	$('#tableHayOclusionVasosGrandes').show();	
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
				
				sugerencia = "ADMINISTRAR t-PA ENDOVENOSO.";
				alert(sugerencia);
				$('#AdminTrombolisisEndovenosa').val(1);
				
				sugerirAngioTAC();				
				
			} else if (relativa > 0) {	
				$('#tableTrombolizarConRelMayor0').show();
			}
		}							
	
	} else if (absoluta > 0) {
	
		$('#tableTrombolizarConRelMayor0').hide();
		$('#tableJustificacionTrombolizarConRelMayor0').hide();
		
		sugerencia = "¡ATENCION: NO SE PUEDE ADMINISTRAR t-PA !";
		alert(sugerencia);
		$('#AdminTrombolisisEndovenosa').val(0);
		
		sugerirAngioTAC();		
	}	

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
	var SugiereAngioTACCraneo = ($('#SugiereAngioTACCraneo').val());
	var InicioEstatina = ($('#InicioEstatina').val());

	// TAC
	
	var IdTipoACVenTAC = ($('#IdTipoACVenTAC').val());

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
	
	// ACV ISQUEMICO - MODULO INTRAVENOSO
	
	var ASPECTS = ($('#ASPECTS').val());				
	var RiesgoTromboEndovenosaAbsoluta = ($('#RiesgoTromboEndovenosaAbsoluta').val());
	var RiesgoTromboEndovenosaRelativa = ($('#RiesgoTromboEndovenosaRelativa').val());	
	var TrombolizarConRelMayor0 = ($('#TrombolizarConRelMayor0').val());
	var JustificacionTrombolizarConRelMayor0 = ($('#JustificacionTrombolizarConRelMayor0').val());	
	var AdminTrombolisisEndovenosa =  ($('#AdminTrombolisisEndovenosa').val());
	
	// ACV ISQUEMICO - MODULO ENDOVASCULAR	
	
	var HayOclusionVasosGrandes = ($('#HayOclusionVasosGrandes').val());	

	// TIA O MIMIC

	var PersistenSintomasTACnormal =  ($('#PersistenSintomasTACnormal').val());
	var AsemejaACVoMimic =  ($('#AsemejaACVoMimic').val());
	
	var EscalaABCD2 =  ($('#EscalaABCD2').val());
	var RiesgoACVa2dias =  ($('#RiesgoACVa2dias').val());
	var RiesgoACVa7dias =  ($('#RiesgoACVa7dias').val());
	var RiesgoACVa90dias =  ($('#RiesgoACVa90dias').val());
		
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
	
	var TimeSugiereTACCraneoSimple =  ($('#TimeSugiereTACCraneoSimple').val());
	var TimeFinTipoACVenTAC =  ($('#TimeFinTipoACVenTAC').val());
	var TimeFinASPECTS =  ($('#TimeFinASPECTS').val());
	var TimeFinRiesgoTromboEndovenosa =  ($('#TimeFinRiesgoTromboEndovenosa').val());
	var TimeFinOclusionVasosGrandes =  ($('#TimeFinOclusionVasosGrandes').val());
	
//	alert("ActualizarEscenario...ajax");
	
        $.ajax({
			async: false,
            type: "POST",
            url: "./bin/actualizarEscenario2.php",          
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
				
					TimeSugiereTACCraneoSimple: TimeSugiereTACCraneoSimple,
					TimeFinTipoACVenTAC: TimeFinTipoACVenTAC,
					TimeFinASPECTS: TimeFinASPECTS,
					TimeFinRiesgoTromboEndovenosa: TimeFinRiesgoTromboEndovenosa,
					TimeFinOclusionVasosGrandes: TimeFinOclusionVasosGrandes,
				
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
					SugiereAngioTACCraneo: SugiereAngioTACCraneo,
					InicioEstatina: InicioEstatina,
					AdminTrombolisisEndovenosa: AdminTrombolisisEndovenosa,

					// TAC
					
					IdTipoACVenTAC: IdTipoACVenTAC,

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
					
					// ACV ISQUEMICO - MODULO INTRAVENOSO
					
					ASPECTS: ASPECTS,				
					RiesgoTromboEndovenosaAbsoluta: RiesgoTromboEndovenosaAbsoluta,
					RiesgoTromboEndovenosaRelativa: RiesgoTromboEndovenosaRelativa,	
					TrombolizarConRelMayor0: TrombolizarConRelMayor0,
					JustificacionTrombolizarConRelMayor0: JustificacionTrombolizarConRelMayor0,	
					
					// ACV ISQUEMICO - MODULO ENDOVASCULAR	
					
					HayOclusionVasosGrandes: HayOclusionVasosGrandes,	

					// TIA O MIMIC

					PersistenSintomasTACnormal: PersistenSintomasTACnormal,
					AsemejaACVoMimic: AsemejaACVoMimic,
					
					EscalaABCD2: EscalaABCD2,
					RiesgoACVa2dias: RiesgoACVa2dias,
					RiesgoACVa7dias: RiesgoACVa7dias,
					RiesgoACVa90dias: RiesgoACVa90dias,
						
					// REMISION

					SugerenciaRemision: SugerenciaRemision,
					IdIPSReferencia: IdIPSReferencia,
					IdTipoEscenarioReferencia: IdTipoEscenarioReferencia,
					FechaHoraRemisionAIPSReferencia: FechaHoraRemisionAIPSReferencia
			},
            success: function(resp){
				//alert(resp);
                if (resp > 0){  
					guardadoOk = true;            
					if (mostrar) alert("Escenario Guardado.");
                } else {
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

	$('#mudulo_evaluacionventana').hide();	
	
	$('#SugiereTACCraneoSimple').val(0);
	$('#SugiereAngioTACCraneo').val(0);
	$('#InicioEstatina').val(0);
	$('#AdminTrombolisisEndovenosa').val(0);
	
	$('#TimeSugiereTACCraneoSimple').val('');

	limpiarIdTipoACVenTAC();
}

function limpiarEstableHemodinamicamente() {

	$('#tableEstableHemodinamicamente').hide();
	$('#EstableHemodinamicamente').val(-1);
	
	$('#InicioEstatina').val(0);
	
	limpiarSugerenciaRemision();
	
	return;
}


function limpiarIdTipoHemo(){

	$('#tableIdTipoHemo').hide();
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

	$('#SugiereAngioTACCraneo').val(0);

	limpiarSugerenciaRemision();
		
	return;
}

function limpiarIdTipoACVenTAC(){

	$('#tableIdTipoACVenTAC').hide();	
	$('#IdTipoACVenTAC').val(-1);
	
	limpiarIdTipoHemo();
	limpiarIdTipoCircIsque();
	limpiarPersistenSintomasTACnormal();
	
	$('#TimeFinTipoACVenTAC').val('');
	
	limpiarSugerenciaRemision();

	return;
}

function limpiarIdTipoCircIsque(){

	$('#tableIdTipoCircIsque').hide();

	$('#InicioEstatina').val(0);
	$('#IdTipoCircIsque').val(-1);
	$('#SugiereAngioTACCraneo').val(0);

	limpiarEstableHemodinamicamente();
	limpiarIdTiempoInfarto();	
	
	limpiarSugerenciaRemision();
		
	return;
}
				
function limpiarIdTiempoInfarto(){

	$('#tableIdTiempoInfarto').hide();	
	$('#IdTiempoInfarto').val(-1);
		
	$('#InicioEstatina').val(0);
	$('#SugiereAngioTACCraneo').val(0);
	
	limpiarASPECTS();
	
	limpiarSugerenciaRemision();
		
	return
}

function limpiarEstableHemodinamicamente(){

	$('#tableEstableHemodinamicamente').hide();	
	$('#EstableHemodinamicamente').val(-1);
		
	$('#InicioEstatina').val(0);
	
	limpiarSugerenciaRemision();
		
	return
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
	
	$('#TimeFinOclusionVasosGrandes').val(''); 
	
	limpiarSugerenciaRemision();
	
	return;
}

//NO EN E3
function limpiarPersistenSintomasTACnormal(){

	$('#tablePersistenSintomasTACnormal').hide();	
	$('#mudulo_tiaomimic').hide();	
	$('#mudulo_acvisquemico').hide();	
		
	$('#PersistenSintomasTACnormal').val(-1);
	
	limpiarIdTipoCircIsque();	
	limpiarAsemejaACVoMimic();
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

function limpiarSugerenciaRemision(){

	$('#mudulo_sugerenciaremision').hide();	

	$('#SugerenciaRemision').val(''); 
	$('#IdIPSReferencia').val(-1); 
	$('#FechaHoraRemisionAIPSReferencia').val(''); 
	
	$('#divCerrarEscenario').hide();
}

// FIN LIMPIAR

function iniciarEvalVentanaEvento(){
			
	$('#SugiereTACCraneoSimple').val(0);	
	limpiarIdTipoACVenTAC();
	
	$('#mudulo_evaluacionventana').hide();
		
	var WakeUpStroke = setMenos1SiNulo($('#WakeUpStroke').val());
	if (WakeUpStroke == -1){alert("Atención: Responda si es ACV del despertar o no.");return;}	

	if (WakeUpStroke == 1){ // Despertar: remitir URGENTE E3
						
		$('#mudulo_evaluacionventana').hide();											
		
		var sugerencia = "URGENTE A E3.";
		alert(sugerencia);
		asignarYMostrarCamposSugerenciaOutcome(sugerencia, 3);			
		return;	
			
	} else if (WakeUpStroke == 0){
				
		limpiarIdTipoACVenTAC();
				
		alert("Realizar TAC de cráneo simple.");
		$('#SugiereTACCraneoSimple').val(1);
		
		$('#TimeSugiereTACCraneoSimple').val(fechahoraActual());
			
		$('#mudulo_evaluacionventana').show();			
		scrollTopModulo('tableIdTipoACVenTAC');
	} 
	
	ActualizarEscenario(0,0);

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

	$('#FechaHoraRemisionAIPSReferencia').val(fechahoraActual());
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