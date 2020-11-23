
function getListaCampos(){
	
	var listaCampos = "";
	var contador = 0;
	var vcampo = "";

	$("#Escenario").find(".EscenarioTituloModulo, .LabelCampo, input, textarea, option:selected").each(
		function(){
			
			if (!$(this).attr("hidden") ){ 	
				
				var mytag = this.tagName.toUpperCase();
				var mytype = "";	
				
				if ($(this).attr("id") == "IdTipoAntecedente") return;
				if (mytag == "SELECT") return;
				
				if (mytag == "INPUT") {
					mytype = this.type.toUpperCase();
					if (mytag == "BUTTON") return; 
				}
									
				if ($(this).attr("selected")){ 
					vcampo = "= " + $(this).text() + "|"; 
					
				} else if ($(this).attr("class") == "EscenarioTituloModulo"){
					vcampo =  "|" + $(this).text() + "||"; 
					
				} else if ($(this).attr("class") == "LabelCampo"){
					contador++;
					vcampo = contador + ". " + $(this).text();
					 
				} else if ($(this).attr("class") == "InputCampo"){
					vcampo = " " + $(this).val() + "|"; 
				} else if ($(this).attr("class") == "CampoNoEditableTabla"){
					vcampo = " " + $(this).val() + "|"; 	
				} else {					
					return; 
				}
				
				listaCampos += vcampo;
			}
		});
		
//	alert(listaCampos);	

	return listaCampos;
	
}


function getListaCamposSaltoLinea(){
	
	var listaCampos = "";
	var contador = 0;
	var vcampo = "";

	$("#Escenario").find(".EscenarioTituloModulo, .LabelCampo, input, textarea, option:selected").each(
		function(){
			
			if (!$(this).attr("hidden") ){ 	
				
				var mytag = this.tagName.toUpperCase();
				var mytype = "";	
				
				if ($(this).attr("id") == "IdTipoAntecedente") return;
				if (mytag == "SELECT") return;
				
				if (mytag == "INPUT") {
					mytype = this.type.toUpperCase();
					if (mytag == "BUTTON") return; 
				}
									
				if ($(this).attr("selected")){ 
					vcampo = " " + $(this).text() + "\n"; 
					
				} else if ($(this).attr("class") == "EscenarioTituloModulo"){
					vcampo =  "\n" + $(this).text() + "\n\n"; 
					
				} else if ($(this).attr("class") == "LabelCampo"){
					contador++;
					vcampo = contador + ". " + $(this).text();
					 
				} else if ($(this).attr("class") == "InputCampo"){
					vcampo = " " + $(this).val() + "\n"; 
				} else if ($(this).attr("class") == "CampoNoEditableTabla"){
					vcampo = " " + $(this).val() + "\n"; 	
										
				} else {					
					return; 
				}
				
				listaCampos += vcampo;
			}
		});
		
//	alert(listaCampos);	

	return listaCampos;
	
}

function crearTextoEscenarioPreview(){

	var listaCamposSaltoLinea = getListaCamposSaltoLinea();
	alert(listaCamposSaltoLinea);
			
	return;
}

function crearTextoEscenarioFile(){

	var listaCampos = getListaCampos();
	var crear = "../Casos/bin/crearTextoEscenario.php?listaCampos='" + listaCampos +  "' & IdCaso="+ $('#IdCaso').val() + " & IdEscenario="+ $('#IdEscenario').val();
	location.href = crear; 
			
	return;
}

function calcularHoras(fechaInicio, tiempoInicio, fechaLlegada, tiempoLlegada) {

	var constante = 3.6e6; // 60 m, 60 s, y 1000 ms en un segundo
	var inicio = new Date(fechaInicio + ' ' + tiempoInicio);
	var llegada = new Date(fechaLlegada + ' ' + tiempoLlegada);
	var diferencia = (llegada - inicio) / constante; // Rta en ms -> dividir para pasar a horas
	
	if (diferencia < 0){
		alert("Tiempo de llegada menor a inicio. Revise los tiempos.");
		return;
	}
	return Math.round(diferencia);
}


function setPHPVariables(campo, valor){
                  
    $.ajax({
        type: "POST",
        url: "./bin/setPHPVariables.php",
        data:{
			campo: campo,
			valor: valor
         },
        success: function(resp){
			if (resp != 0) {
				alert(resp);
			}
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function intBoolean(q){
var resultado;
	
	resultado = (q);
	if (resultado == '-1'){
		return resultado;
	} else {

		if (q == true) {
			resultado = 1;
		} else {
			resultado = 0;
		}
	}
	return resultado;
}

 
function esVacioONull(q){
var resultado;

	if ((q === null) ||(q === '')) {
		resultado = true;
	} else {
		resultado = false;
	}
	return resultado;
}

function setMenos1SiNulo(q){
	if (esVacioONull(q)){
		return -1;
	} else {
		return q;
	}
}

function setToSiNulo(q, defecto){
	if (esVacioONull(q)){
		return defecto;
	} else {
		return q;
	}
}

function setEnBlancoSiNulo(q){
var resultado;

	if ((q === null)) {
		resultado = "";
	} else {
		resultado = q;
	}
	return resultado;
}

function setFechahoraInicio(formatoFecha){

var mifecha;

    $.ajax({
		async: false,
        type: "POST",
        url: "../bin/getDateSQL.php",
        data: 'formatoFecha='+formatoFecha,
        success: function(resp){
			mifecha = resp;},
        complete:function(respc){mifecha = resp;},
        error: function(e){
            alert('Error: ' + e);
        }
    });
    
    return mifecha;
}


function getAge(dateString) {

    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function timeDIFF(tiempoI, tiempoF, tipo){

var resultado;

//	alert("tiempoF: "+tiempoF +" tiempoI: "+tiempoI + " tipo:"+tipo);

    $.ajax({
		async: false,
        type: "POST",
        url: "./bin/getTimeDiffSQL.php",
        data:{ 
			tiempoI: tiempoI,
			tiempoF: tiempoF,
			tipo: tipo
        },
        success: function(resp){
		//	alert(resp);        
			resultado = resp;
		},
        error: function(e){
            alert('Error: ' + e);
        }
    });
    
    return resultado;
}


function fechaActual(){
	var mifecha = setFechahoraInicio("fecha");
	return mifecha;
}

function fechahoraActual(){
	var mihora = setFechahoraInicio("fechahora");	
return mihora;
}

function horaActual(){
	var mihora = setFechahoraInicio("hora");	
return mihora;
}

function ListaIPSseleccion_OnChange(){

	var IdIPS = $('#ListaIPSs').val();
//	alert("IdIPS="+IdIPS);

	if (IdIPS == '-1'){
        alert("Seleccione un escenario primero.");
		setPHPVariables("IdIPSLocal", -1);       
		$('#divMenuEscenarios').hide();		        
    } else {  		
		setPHPVariables("IdIPSLocal", IdIPS);
		$('#divMenuEscenarios').show();		
	}
    
	return;
}

function CODDPTO_OnChange(listadptos, listampios) {


	var CODDPTO = setMenos1SiNulo($('#'+listadptos).val()); 
			       		
    $.ajax({
		async: false,
        type: "POST",
        url: "./bin/filtrarMunicipios.php",          
        data:{
			CODDPTO: CODDPTO
		},
        success: function(resp){    
			$('#'+listampios).html(resp);
        },
        error: function(e){
            alert("Error "+e);
        }
    });

	return;
}


function CerrarCaso(IdCaso, Terminado, FechaHoraCierreCaso) {
    
 var esok = true;
	
//	alert("IdCaso="+IdCaso+" Terminado="+Terminado +" FechaHoraCierreCaso="+FechaHoraCierreCaso);
                        
	$.ajax({
		type: "POST",
		async: false,
		url: "../bin/cerrarCaso.php",
		data: {
			IdCaso: IdCaso,
			Terminado: Terminado,
			FechaHoraCierreCaso: FechaHoraCierreCaso
		},
		success: function(resp){
		//	alert(resp);
			if(resp!=1){
				esok = false;
				alert("Error al cerrar IdCaso = "+IdCaso);
			}
		},
		error: function(e){
			alert('Error: ' + e);
		}
	});
	
	return;
}