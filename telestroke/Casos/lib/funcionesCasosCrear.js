function submitformEditarEscenario() {

	return;
}

function  form_Current_IniciarCaso(){

	var  IdTipoEscenario = setMenos1SiNulo($('#tempIdTipoEscenario').val());
	if (IdTipoEscenario == -1){
		alert("Tipo de escenario invalido: " +$('#tempIdTipoEscenario').val());
		return;
	}
		
    $('#FechaHoraInicioCaso').val(fechahoraActual());  
    $('#FechaHoraCierreCaso').val(''); 
    $('#Terminado').val(0);

    $('#IdPaciente').val('');    
    			
//	alert("NombreIPSCaso:"+NombreIPSCaso + " IdTipoEscenario: "+IdTipoEscenario);
		
	document.getElementById("form_EditarEscenario").setAttribute("action", "./Escenario" + IdTipoEscenario  + ".php");
		
	if (tempIdIPSCaso == '-1'){
        alert("Seleccione un escenario primero.");
    } else {    
		$('#divSelPaciente').show();		
	}
    
	return;
}

	
function revisarGuardarCasoGeneral(){
	var esok = 1;
	    
	if ( (tempUsuarioID == '-1') || (tempIdIPSCaso == '-1') || (tempIdPaciente == '-1')){
		esok = 0;
	}		
	return esok;  	
}
      
function crearCasoGeneral(){

	var respuesta = confirm("¿ESTA SEGURO DE CREAR EL CASO?");
       
    if (respuesta == false) {
        return;
    }
    
    // Revisar campos
    
    var IdPaciente = setMenos1SiNulo($('#tempIdPaciente').val());
    
    if (IdPaciente == '-1') {
        alert("Error: Seleccione el Paciente.");
        return;
    } else {
	
		var FechaHoraInicioCaso  = $('#FechaHoraInicioCaso').val(); 
		var UsuarioID = $('#tempUsuarioID').val();
		var IdIPSCaso = $('#tempIdIPSCaso').val();
		var Terminado  =  $('#Terminado').val();

        $.ajax({
			async: false,
            type: "POST",
            url: "./bin/crearCasoGeneral.php",          
            data:{
				IdPaciente: IdPaciente,
				IdIPSCaso: IdIPSCaso,
				UsuarioID: UsuarioID,
				FechaHoraInicioCaso: FechaHoraInicioCaso,
				Terminado: Terminado
			},
            success: function(resp){
                        		    
                if (resp > 0){
                
					var IdCaso = Number(resp);
					
					//setPHPVariables("IdCaso", IdCaso);
              //      alert("Caso creado:" +IdCaso+"!");
					
					$('#IdCaso').val(IdCaso); 
					$('#tempIdCaso').val(IdCaso); 
					$('#FechaHoraInicioCaso').val(FechaHoraInicioCaso); 
                    
					$('#tableBtnAbrirSeleccionPaciente').hide();
				//	$('#divSelPaciente').attr('disabled','disabled');
					
					$('#btnCrearCasoGeneral').hide();	
					$('#divCrearEscenario').show();	
					$('#ConsecutivoAdmision').removeAttr('disabled');                  
			
                }
                else{
                    alert("No se pudo crear: "+resp);
                }
            },
            error: function(e){
                alert("Error "+e);
            }
        });
	}      	
}

function  btnCrearEscenario_OnClick(){

	var IdCaso = setMenos1SiNulo($('#tempIdCaso').val());
    if (IdCaso == '-1') {
        alert("Error: Seleccione el IdCaso.");
        return;
    }
    
	var IdIPSEscenario = setMenos1SiNulo($('#tempIdIPSCaso').val());
    if (IdIPSEscenario == '-1') {
        alert("Error: Seleccione el IdCaso.");
        return;
    }
    
	var UsuarioID = setMenos1SiNulo($('#tempUsuarioID').val());	
    if (UsuarioID == '-1') {
        alert("Error: Seleccione el IdCaso.");
        return;
    } 
       	
	var IdTipoEscenario = setMenos1SiNulo($('#tempIdTipoEscenario').val());	      
    if (IdTipoEscenario == '-1') {
        alert("Error: Seleccione el IdTipoEscenario.");
        return;
    }    
    
	var ConsecutivoAdmision = setMenos1SiNulo($('#ConsecutivoAdmision').val());  
    if (ConsecutivoAdmision == '-1') {        
        var respuesta = confirm("Atención. Consecutivo de Admision vacío. ¿Desea continuar sin este valor?");
		if (respuesta == false) {
			return;
		} else {
			ConsecutivoAdmision = "";
		}	
    }
    
    //	alert("btnCrearEscenario_OnClick. IdCaso: " + IdCaso + " IdIPSEscenario: " + IdIPSEscenario + " UsuarioID: " + UsuarioID + " ConsecutivoAdmision: "+ConsecutivoAdmision);

	crearCasoEscenario(IdCaso, IdIPSEscenario, UsuarioID, ConsecutivoAdmision, IdTipoEscenario);	

}

function crearCasoEscenario(IdCaso, IdIPSEscenario, UsuarioID, ConsecutivoAdmision, IdTipoEscenario){

    var FechaHoraInicioEscenario  = fechahoraActual();
    var archivoCrearEscenario = "./bin/crearEscenario" + IdTipoEscenario + ".php" ;
    
    // Revisar campos
    var IdEscenario = -1; 		
		
        $.ajax({
			async: false,
            type: "POST",
            url: archivoCrearEscenario,          
            data:{
				IdCaso: IdCaso,
				FechaHoraInicioEscenario: FechaHoraInicioEscenario,
				IdIPSEscenario: IdIPSEscenario,
				UsuarioID: UsuarioID,
				ConsecutivoAdmision: ConsecutivoAdmision
			},
            success: function(resp){
                        		    
                if (resp > 0){              
					var IdEscenario = Number(resp);
					
                 // alert("Escenario Creado.");

				//	setPHPVariables("tempIdEscenario", IdEscenario);
					
					$('#IdEscenario').val(IdEscenario);     
					$('#tempIdEscenario').val(IdEscenario);
					             
               		$('#FechaHoraInicioEscenario').val(FechaHoraInicioEscenario); 
               		
					$('#ConsecutivoAdmision').attr('disabled','disabled');                  
                    $('#btnCrearEscenario').hide(); 
  					$('#divEditarEscenario').show();               		
                }
                else{
                    alert("No se pudo crear el escenario: "+resp);
                }
            },
            error: function(e){
                alert("Error "+e);
            }
        });
	 
	
	return;     	
}

  
function mostrarPacientes(){

	var IdTipoDocIdent = setMenos1SiNulo($('#FiltroIdTipoDocIdent').val()); 
	var NumeroDocIdentidad = setMenos1SiNulo($('#FiltroNumeroDocIdentidad').val()); 
	var PrimerNombre = setMenos1SiNulo($('#FiltroPrimerNombre').val()); 
	var PrimerApellido = setMenos1SiNulo($('#FiltroPrimerApellido').val()); 	
		
     $.ajax({
        type: "POST",
        url: "./bin/mostrarSelPacientes.php",
		data: {
			IdTipoDocIdent: IdTipoDocIdent,
			NumeroDocIdentidad: NumeroDocIdentidad,
			PrimerNombre: PrimerNombre,
			PrimerApellido: PrimerApellido	
		},        
        success: function(resp){   
                             
            	$('#divListaPacientes').html(resp);
                              
				$('.filaPaciente').removeClass("filaSelec");
				$('.filaPaciente').hover(
					function(){
						$(this).addClass("filaHover");
					},
					function(){
						$(this).removeClass("filaHover");
					}
				);
						
				$('.filaPaciente').click(
					function(){
					
						$('.filaPaciente').removeClass("filaSelec");
						$(this).addClass("filaSelec");
						var IdPaciente = Number($(this).attr("id").split("-")[1]);	
						
						if (IdPaciente == -1){
						//	$('#btnLimpiarSelPaciente').attr('disabled','disabled');
							$('#tempIdPaciente').val('');		
						} else {
						
							var IdPaciente = Number($(this).attr("id").split("-")[1]);
							$('#tempIdPaciente').val(IdPaciente);		

							$('#SelPrimerNombre').val($(this).find("#PrimerNombre").val());		
							$('#SelSegundoNombre').val($(this).find("#SegundoNombre").val());		
							$('#SelPrimerApellido').val($(this).find("#PrimerApellido").val());		
							$('#SelSegundoApellido').val($(this).find("#SegundoApellido").val());		
							$('#SelIdTipoDocIdent').val($(this).find("#IdTipoDocIdent").val());		
							$('#SelNumeroDocIdentidad').val($(this).find("#NumeroDocIdentidad").val());		
							$('#SelSexo').val($(this).find("#Sexo").val());		
																										
						//	$('#btnLimpiarSelPaciente').removeAttr('disabled');	
							
							$('#btnSeleccionarPaciente').show();
							$('#btnLimpiarSelPaciente').show();
							$('#btnCrearNuevoPaciente').show();

							$('html, body').animate({scrollTop: $("#btnSeleccionarPaciente").offset().top}, 500);
						}
					}
				);                
                           
        },
        error: function(e){
            alert("Error "+e);
        }
    });
}

function btnAbrirSeleccionPaciente_OnClick() {
	
	$('#divSeleccionPaciente').show();		
   	
	$('#btnSeleccionarPaciente').hide();
	
	$('#btnCrearNuevoPaciente').show();
	$('#divCrearNuevoPaciente').hide();
	
	var tempIdPaciente = setMenos1SiNulo($('#tempIdPaciente').val());
	if (tempIdPaciente == -1){
		$('#btnLimpiarSelPaciente').hide();
	} else {
		$('#btnLimpiarSelPaciente').show();
	}
   	
   	mostrarPacientes();
	
	$('html, body').animate({scrollTop: $("#divListaPacientes").offset().top}, 500);
	
	return;
}

function btnFiltarPacientes_OnClick(){
	mostrarPacientes();
	return true;
}

function mostrarAdicionarNuevoPaciente(){
    
    $('#divBuscarPacienteFiltrosYlista').hide();
    $('#btnCrearNuevoPaciente').hide();
    $('#btnLimpiarSelPaciente').hide();
	$('#btnSeleccionarPaciente').hide();

    $('#divCrearNuevoPaciente').show('slow');   
	$('html, body').animate({scrollTop: $("#divCrearNuevoPaciente").offset().top}, 500);
}

function cancelarNuevoPaciente(){

    $('#divCrearNuevoPaciente').hide();       
    $('#divBuscarPacienteFiltrosYlista').show();

	btnLimpiarSelPaciente_OnClick();

	return;
}

function btnSeleccionarPaciente_OnClick() {
		
	$('#divSeleccionPaciente').hide();	
	
	var IdPaciente = setMenos1SiNulo($('#tempIdPaciente').val()); 
	if (IdPaciente == -1){
		alert("No seleccionó ningún paciente.");
		$('#divCrearCasoGeneral').hide();
		$('#divCrearEscenario').hide();
		$('#divEditarEscenario').hide();
	} else {
		$('#divCrearCasoGeneral').show();	
	}	
		
	return;
}


function btnLimpiarSelPaciente_OnClick() {

	$('#tempIdPaciente').val('');
	
	$('#SelPrimerNombre').val('');		
	$('#SelSegundoNombre').val('');		
	$('#SelPrimerApellido').val('');		
	$('#SelSegundoApellido').val('');		
	$('#SelIdTipoDocIdent').val('');		
	$('#SelNumeroDocIdentidad').val('');		
	$('#SelSexo').val('');		
	
	$('.filaPaciente').removeClass("filaSelec");
	
	$('#btnLimpiarSelPaciente').hide();
	
	$('#btnSeleccionarPaciente').hide();
	$('#btnCrearNuevoPaciente').show();	
	
	$('#divCrearCasoGeneral').hide();
	
	return;
}


function adicionarNuevoPaciente(){
	
	var NewIdTipoDocIdent = setMenos1SiNulo($('#NewIdTipoDocIdent').val()); 
	if (NewIdTipoDocIdent == -1){
		alert("IdTipoDocIdent nulo. Inserte el valor. "+$('#NewIdTipoDocIdent').val());
		return;
	}
	
	var NewNumeroDocIdentidad = setMenos1SiNulo($('#NewNumeroDocIdentidad').val()); 
	if (NewNumeroDocIdentidad == -1){
		alert("NumeroDocIdentidad nulo. Inserte el valor. "+$('#NewNumeroDocIdentidad').val());
		return;
	}

	var NewPrimerNombre = setMenos1SiNulo($('#NewPrimerNombre').val()); 
	if (NewPrimerNombre == -1){
		alert("PrimerNombre nulo. Inserte el valor. "+$('#NewPrimerNombre').val());
		return;
	}

	var NewPrimerApellido = setMenos1SiNulo($('#NewPrimerApellido').val()); 
	if (NewPrimerApellido == -1){
		alert("PrimerApellido nulo. Inserte el valor. "+$('#NewPrimerApellido').val());
		return;
	}
	
    $.ajax({
        type: "POST",
        url: "../bin/adicionarPaciente.php",
        data: {
			PrimerNombre: NewPrimerNombre,
			SegundoNombre: $('#NewSegundoNombre').val(),
			PrimerApellido: NewPrimerApellido,
			SegundoApellido: $('#NewSegundoApellido').val(),
			IdTipoDocIdent : NewIdTipoDocIdent,
			NumeroDocIdentidad: NewNumeroDocIdentidad,
			Sexo: $('#NewSexo').val(),
			FechaNacimiento: $('#NewFechaNacimiento').val(),			
			CODDPTONacimiento: $('#NewCODDPTONacimiento').val(),
			CODMPIONacimiento: $('#NewCODMPIONacimiento').val(),
			CODDPTOResidencia: $('#NewCODDPTOResidencia').val(),
			CODMPIOResidencia: $('#NewCODMPIOResidencia').val(),
			DireccionResidencia: $('#NewDireccionResidencia').val(),
			TelefonoResidencia: $('#NewTelefonoResidencia').val(),
			TelefonoCelular: $('#NewTelefonoCelular').val(),
			Aseguradora: $('#NewAseguradora').val()
        },
        success: function(resp){
        //	alert(resp);
			
			var respuesta = resp.split(":");
			
			if (Number(respuesta[0]) > 0){
				
				var IdPaciente = Number(respuesta[0]);
			//	alert("IdPaciente="+IdPaciente);
				
				$('#tempIdPaciente').val(IdPaciente); 				
	            $('#divCrearNuevoPaciente').hide();
				
				$('#SelPrimerNombre').val(NewPrimerNombre);		
				$('#SelSegundoNombre').val($("#NewSegundoNombre").val());		
				$('#SelPrimerApellido').val(NewPrimerApellido);		
				$('#SelSegundoApellido').val($("#NewSegundoApellido").val());		
				$('#SelIdTipoDocIdent').val(NewIdTipoDocIdent);		
				$('#SelNumeroDocIdentidad').val(NewNumeroDocIdentidad);		
				$('#SelSexo').val($("#NewSexo").val());		
				
				$('#btnSeleccionarPaciente').show();
				$('#btnLimpiarSelPaciente').show();
				$('#btnCrearNuevoPaciente').show();
				
				$('html, body').animate({scrollTop: $("#btnSeleccionarPaciente").offset().top}, 500);								
				
			} else {
				alert("No se pudo crear el paciente:"+respuesta[0]+" : "+respuesta[1]);
			}    		      
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
    
	return;
}    

