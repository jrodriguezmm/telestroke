


function mostrarAdicionarNuevoPaciente(){
    
	$('#divBuscarPacienteFiltros').hide();  
    $('#datosPacientesContenido').hide();
    $('#btnCrearNuevoPaciente').hide();
    $('#btnGuardarPacientes').hide();
	
    $('#datosNuevoPaciente').show();
    $('#cuadrosPopup').show('slow');       
}

function adicionarNuevoPaciente(){

    $.ajax({
        type: "POST",
        url: "./bin/adicionarPaciente.php",
        data: {
			PrimerNombre: $('#PrimerNombre').val(),
			SegundoNombre: $('#SegundoNombre').val(),
			PrimerApellido: $('#PrimerApellido').val(),
			SegundoApellido: $('#SegundoApellido').val(),
			IdTipoDocIdent : $('#IdTipoDocIdent').val(),
			NumeroDocIdentidad: $('#NumeroDocIdentidad').val(),
			Sexo: $('#Sexo').val(),
			FechaNacimiento: $('#FechaNacimiento').val(),
			CODDPTONacimiento: $('#CODDPTONacimiento').val(),
			CODMPIONacimiento: $('#CODMPIONacimiento').val(),
			CODDPTOResidencia: $('#CODDPTOResidencia').val(),
			CODMPIOResidencia: $('#CODMPIOResidencia').val(),
			DireccionResidencia: $('#DireccionResidencia').val(),
			TelefonoResidencia: $('#TelefonoResidencia').val(),
			TelefonoCelular: $('#TelefonoCelular').val(),
			Aseguradora: $('#Aseguradora').val()
        },
        success: function(resp){
        //	alert(resp);
			
			var respuesta = resp.split(":");			
			if (Number(respuesta[0]) > 0){						
	            $('#cuadrosPopup').hide('slow');
	            $('#datosNuevoPaciente').hide();				
			} else {
				alert("No se pudo crear el paciente:"+respuesta[0]+" : "+respuesta[1]);
			}  			
			
    		mostrarPacientes();   		      
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function btnFiltarPacientes_OnClick() {
	mostrarPacientes();
	return;
}

function mostrarPacientes(){

	var IdTipoDocIdent = setMenos1SiNulo($('#FiltroIdTipoDocIdent').val()); 
	var NumeroDocIdentidad = setMenos1SiNulo($('#FiltroNumeroDocIdentidad').val()); 
	var PrimerNombre = setMenos1SiNulo($('#FiltroPrimerNombre').val()); 
	var PrimerApellido = setMenos1SiNulo($('#FiltroPrimerApellido').val()); 

	$('#cuadrosPopup').hide();
	$('#datosNuevoPaciente').hide();
	
	$('#divBuscarPacienteFiltros').show();  
    $('#datosPacientesContenido').show();
	$('#btnCrearNuevoPaciente').show(); 
	$('#btnGuardarPacientes').show();  
	
     $.ajax({
        type: "POST",
        url: "./bin/mostrarPacientes.php",
		data:{			
			IdTipoDocIdent: IdTipoDocIdent,
			NumeroDocIdentidad: NumeroDocIdentidad,
			PrimerNombre: PrimerNombre,
			PrimerApellido: PrimerApellido			
		},
        success: function(resp){                              
               $('#datosPacientesContenido').html(resp);
        },
        error: function(e){
            alert("Error "+e);
        }
    });
}


function eliminarPaciente(idPaciente){   

var respuesta = confirm("¿ESTa SEGURO DE ELIMINAR EL PACIENTE CON id = ("+idPaciente+")?");

    if (respuesta == false) {
        return;
    }  
    
 $.ajax({
        type: "POST",
        url: "./bin/eliminarPaciente.php",
        data: "IdPaciente="+idPaciente,
        success: function(resp){
			alert(resp);
			mostrarPacientes();
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}


function guardarPacientes(){
    
 var agregado = true;
                        
	$('#datosPacientesContenido').find("tr").filter("[id^=registro]").each(function(){
	    
				var IdPaciente = $(this).find("#IdPaciente").val();
	    	
				$.ajax({
					type: "POST",
					async: false,
					url: "./bin/salvarPaciente.php",
					data: {		
						IdPaciente: IdPaciente,
						PrimerNombre: $(this).find('#PrimerNombre').val(),
						SegundoNombre: $(this).find('#SegundoNombre').val(),
						PrimerApellido: $(this).find('#PrimerApellido').val(),
						SegundoApellido: $(this).find('#SegundoApellido').val(),
						IdTipoDocIdent : $(this).find('#IdTipoDocIdent').val(),
						NumeroDocIdentidad: $(this).find('#NumeroDocIdentidad').val(),
						Sexo: $(this).find('#Sexo').val(),
						FechaNacimiento: $(this).find('#FechaNacimiento').val(),
						CODDPTONacimiento: $(this).find('#CODDPTONacimiento-'+IdPaciente).val(),
						CODMPIONacimiento: $(this).find('#CODMPIONacimiento-'+IdPaciente).val(),
						CODDPTOResidencia: $(this).find('#CODDPTOResidencia-'+IdPaciente).val(),
						CODMPIOResidencia: $(this).find('#CODMPIOResidencia-'+IdPaciente).val(),
						DireccionResidencia: $(this).find('#DireccionResidencia').val(),
						TelefonoResidencia: $(this).find('#TelefonoResidencia').val(),
						TelefonoCelular: $(this).find('#TelefonoCelular').val(),
						Aseguradora: $(this).find('#Aseguradora').val()

					},
					success: function(resp){
					
				//	alert(resp);
										
						if(resp!=1){
							agregado = false;
							alert("Error al salvar el paciente "+ IdPaciente + resp);
						}
					},
					error: function(e){
						alert('Error: ' + e);
					}
				});
				
		});
        
    if(!agregado){
        alert("Error Salvando");
    }else{
        alert("Tabla guardada correctamente.");
    }
}

function verificarArchivos(){

	alert("verificarArchivos: "+document.getElementById("userfile").value);

    if(document.getElementById("userfile").value == ""){
        alert("Archivo no valido");
        return false;
    }

    $('#ed_upload_process_pacientes').show();
        
    return true;
}

function archivoProcesado(filasLeidas,filasAccExistente, filasInsertadas, fileName){
    alert("Se cargo el archivo "+fileName+". Filas procesadas= "+filasLeidas+ ". Filas actualizadas= "+filasAccExistente+". Filas insertadas= "+filasInsertadas+".");
    $('#userfile').val("");
    $('#ed_upload_process_pacientes').hide();
    
	mostrarPacientes();
}