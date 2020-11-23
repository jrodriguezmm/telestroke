function submitformAbrirEscenario() {
	
	return;
}

function btnCrearEscenario_OnClick() {


	var IdCaso = setMenos1SiNulo($('#tempIdCasoSel').val());
    if (IdCaso == '-1') {
        alert("Error: Seleccione el IdCaso.");
        return;
    }
    
	var IdIPSEscenario = setMenos1SiNulo($('#tempIdIPSLocal').val());
    if (IdIPSEscenario == '-1') {
        alert("Error: Seleccione el IdIPSEscenario.");
        return;
    }
    
	var UsuarioID = setMenos1SiNulo($('#tempUsuarioID').val());	
    if (UsuarioID == '-1') {
        alert("Error: Seleccione el UsuarioID.");
        return;
    } 
       	
	var IdTipoEscenario = setMenos1SiNulo($('#tempIdTipoEscenarioLocal').val());	      
    if (IdTipoEscenario == '-1') {
        alert("Error: Seleccione el IdTipoEscenario.");
        return;
    }    
    
	var ConsecutivoAdmisionLocal = setMenos1SiNulo($('#ConsecutivoAdmisionLocal').val());  
    if (ConsecutivoAdmisionLocal == '-1') {        
        var respuesta = confirm("Atención. Consecutivo de Admision vacío. ¿Desea continuar sin este valor?");
		if (respuesta == false) {
			return;
		} else {
			ConsecutivoAdmisionLocal = "";
		}	
    }
    
    
//	alert("btnCrearEscenario_OnClick. IdCaso: " + IdCaso + " IdIPSEscenario: " + IdIPSEscenario + " IdTipoEscenario: " +IdTipoEscenario + " UsuarioID: " + UsuarioID + " ConsecutivoAdmisionLocal: "+ConsecutivoAdmisionLocal);

	crearCasoEscenario(IdCaso, IdIPSEscenario, UsuarioID, ConsecutivoAdmisionLocal, IdTipoEscenario);	

	return;
}



function crearCasoEscenario(IdCaso, IdIPSEscenario, UsuarioID, ConsecutivoAdmisionLocal, IdTipoEscenario){

    var FechaHoraInicioEscenario  = fechahoraActual();
    var archivoCrearEscenario = "./bin/crearEscenario" + IdTipoEscenario + ".php" ;
    
    // Revisar campos
    var IdEscenario = -1; 		
    
//	alert("btnCrearEscenario_OnClick. IdCaso: " + IdCaso + " IdIPSEscenario: " + IdIPSEscenario + " IdTipoEscenario: " +IdTipoEscenario + " UsuarioID: " + UsuarioID + " ConsecutivoAdmisionLocal: "+ConsecutivoAdmisionLocal+ " "+FechaHoraInicioEscenario);
    
		
        $.ajax({
			async: false,
            type: "POST",
            url: archivoCrearEscenario,          
            data:{
				IdCaso: IdCaso,
				FechaHoraInicioEscenario: FechaHoraInicioEscenario,
				IdIPSEscenario: IdIPSEscenario,
				UsuarioID: UsuarioID,
				ConsecutivoAdmision: ConsecutivoAdmisionLocal
			},
            success: function(resp){
                        		    
                if (resp > 0){              
					var IdEscenario = resp;					
                 // alert("Escenario Creado.");					
					$('#tempIdEscenario').val(IdEscenario);
                    mostrarEscenarios();  					              		
                }
                else{
                    alert("No se pudo crear el escenario: "+resp);
                }
            },
            error: function(e){
                alert("Error "+e);
            }
        });
        
        $('#divCrearEscenario').hide(); 
	 
	return;     	
}

  

function PacienteLocalReferido_OnChange() {

	$('#btnAbrirEscenario').attr('disabled','disabled');	
	document.getElementById('datosListaCasos').innerHTML = "";
	document.getElementById('datosListaEscenarios').innerHTML = "";
		
	$('#tempIdCasoSel').val('');		
	$('#divCrearEscenario').hide();	
							
	btnFiltarCasos_OnClick();

	return;
}

function btnFiltarCasos_OnClick() {

	var PacienteLocalReferido = setMenos1SiNulo($('#PacienteLocalReferido').val());
	if (PacienteLocalReferido == -1){alert("Selecciones Tipo de Origen: " + $('#PacienteLocalReferido').val());return;}

	var IdIPSLocal = setMenos1SiNulo($('#tempIdIPSLocal').val());
	if (IdIPSLocal == -1){alert("IPS Local no seleccionada: " + $('#tempIdIPSLocal').val());return;}

	var IdTipoDocIdent = setMenos1SiNulo($('#IdTipoDocIdent').val()); 
	var NumeroDocIdentidad = setMenos1SiNulo($('#NumeroDocIdentidad').val()); 
	var PrimerNombre = setMenos1SiNulo($('#PrimerNombre').val()); 
	var PrimerApellido = setMenos1SiNulo($('#PrimerApellido').val()); 
	var Terminado = setMenos1SiNulo($('#Terminado').val()); 
	
	var filtro = "";
	var hayfiltro = 0;
	
	$('#tempIdEscenario').val('');

	if (IdTipoDocIdent != -1){
		filtro = "IdTipoDocIdent='" + IdTipoDocIdent + "'";
		hayfiltro = 1;
	}
	if (NumeroDocIdentidad != -1){
		if (hayfiltro){
			filtro += " AND NumeroDocIdentidad='" + NumeroDocIdentidad+ "'";
		} else {
			filtro ="NumeroDocIdentidad='" + NumeroDocIdentidad+ "'";	
		}
		hayfiltro = 1;
	}
	if (PrimerNombre != -1){
		if (hayfiltro){
			filtro += " AND PrimerNombre='" + PrimerNombre+ "'";
		} else {
			filtro ="PrimerNombre='" + PrimerNombre+ "'";	
		}
		hayfiltro = 1;
	}
	if (PrimerApellido != -1){
		if (hayfiltro){
			filtro += " AND PrimerApellido='" + PrimerApellido+ "'";
		} else {
			filtro ="PrimerApellido='" + PrimerApellido+ "'";	
		}
		hayfiltro = 1;
	}	
	if (Terminado != -1){
		if (hayfiltro){
			filtro += " AND Terminado='" + Terminado+ "'";
		} else {
			filtro ="Terminado='" + Terminado+ "'";	
		}
		hayfiltro = 1;
	}	
		
		$.ajax({
			type: "POST",			
			url: "./bin/mostraFiltarCasos.php",
			async: false,
			data: {
				IdIPSLocal: IdIPSLocal,
				tipoorigen: PacienteLocalReferido,
				hayfiltro: hayfiltro,
				filtro:filtro
			},
			success: function(resp){    
			
		//	 alert(resp); 
			            
				$('#datosListaCasos').html(resp);  
				$('#datosListaCasos').show();
								
				$('.filaCasos').removeClass("filaSelec");
				$('.filaCasos').hover(
					function(){
						$(this).addClass("filaHover");
					},
					function(){
						$(this).removeClass("filaHover");
					}
				);
						
				$('.filaCasos').click(
					function(){
					
						$('.filaCasos').removeClass("filaSelec");
						$(this).addClass("filaSelec");
						var IdCaso = Number($(this).attr("id").split("-")[1]);					
						if (IdCaso == -1){
							$('#tempIdCasoSel').val('');		
						}else{
							$('#tempIdCasoSel').val(IdCaso);	
							mostrarEscenarios();	
						}
						
						$('#btnAbrirEscenario').attr('disabled','disabled');						
							

						var PacienteLocalReferido = setMenos1SiNulo($('#PacienteLocalReferido').val());
						if (PacienteLocalReferido == -1){alert("Selecciones Tipo de Origen: " + $('#PacienteLocalReferido').val());return;}
						
						if (PacienteLocalReferido == 0){
							$('#divCrearEscenario').hide();	
							$('html, body').animate({scrollTop: $("#btnAbrirEscenario").offset().top}, 500);
						} else {
							$('#divCrearEscenario').show();	
						}	
					}
				); 				
			},
			error: function(e){
				alert("Error "+e);
			}
		});

	return;
}
   
   

function mostrarEscenarios() {

	var IdCaso = setMenos1SiNulo($('#tempIdCasoSel').val()); 
	if (IdCaso == -1){
		document.getElementById('datosListaEscenarios').innerHTML = "";
		return;
	}
	
	$('#tempIdEscenario').val('');
		
		$.ajax({
			type: "POST",
			url: "./bin/mostraFiltarCasosEscenarios.php",
			async: false,
			data: {
				IdCaso: IdCaso
			},
			success: function(resp){    
			
		//	 alert(resp); 
			            
				$('#datosListaEscenarios').html(resp);  
				$('#datosListaEscenarios').show();
								
				$('.filaEscenarios').removeClass("filaSelec");
				$('.filaEscenarios').hover(
					function(){
						$(this).addClass("filaHover");
					},
					function(){
						$(this).removeClass("filaHover");
					}
				);
						
				$('.filaEscenarios').click(
					function(){
					
						$('.filaEscenarios').removeClass("filaSelec");
						$(this).addClass("filaSelec");
						
						var IdTipoEscenario = Number($(this).attr("id").split("-")[1]);
						var IdEscenario = Number($(this).attr("id").split("-")[2]);	
						
						// alert("IdTipoEscenario="+IdTipoEscenario+" IdEscenario="+IdEscenario);
																						
						if (IdEscenario == -1){
							$('#btnAbrirEscenario').attr('disabled','disabled');
							$('#tempIdEscenario').val('');		
							$('#tempIdTipoEscenario').val('');
						} else {
							$('#btnAbrirEscenario').removeAttr('disabled');
							$('html, body').animate({scrollTop: $("#btnAbrirEscenario").offset().top}, 500);
							$('#tempIdEscenario').val(IdEscenario);								
							
							document.getElementById("form_AbrirEscenario").setAttribute("action", "./Escenario" + IdTipoEscenario + ".php");
						}
					}
				); 				
			},
			error: function(e){
				alert("Error "+e);
			}
		});

	return;
}
      