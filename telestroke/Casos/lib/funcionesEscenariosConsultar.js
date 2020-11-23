function submitformAbrirEscenario() {


	return;
}

function EscenarioCerrado_OnChange() {

	btnFiltarEscenarios_OnClick();	

	return;
}

function btnFiltarEscenarios_OnClick() {

	$('#tempIdEscenario').val('');
	$('#btnAbrirEscenario').attr('disabled','disabled');	
	document.getElementById('datosListaEscenarios').innerHTML = "";
	
	var EscenarioCerrado = setMenos1SiNulo($('#EscenarioCerrado').val());
	if (EscenarioCerrado == -1){alert("Seleccione Escenario Pendiente o Terminado: " + $('#EscenarioCerrado').val());return;}
	
	var IdTipoEscenario = $('#tempIdTipoEscenarioLocal').val();
	
	var IdIPSLocal = setMenos1SiNulo($('#tempIdIPSLocal').val());
	if (IdIPSLocal == -1){alert("IPS Local no seleccionada: " + $('#tempIdIPSLocal').val());return;}

	var ConsecutivoAdmision = setMenos1SiNulo($('#ConsecutivoAdmision').val()); 
	var IdTipoDocIdent = setMenos1SiNulo($('#IdTipoDocIdent').val()); 
	var NumeroDocIdentidad = setMenos1SiNulo($('#NumeroDocIdentidad').val()); 
	var PrimerNombre = setMenos1SiNulo($('#PrimerNombre').val()); 
	var PrimerApellido = setMenos1SiNulo($('#PrimerApellido').val()); 
	
	var filtro = "";
	var hayfiltro = 0;
	
	if (ConsecutivoAdmision != -1){
		filtro = "ConsecutivoAdmision='" + ConsecutivoAdmision + "'";
		hayfiltro = 1;
	}
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
	if (EscenarioCerrado != -1){
		if (hayfiltro){
			filtro += " AND EscenarioCerrado='" + EscenarioCerrado+ "'";
		} else {
			filtro ="EscenarioCerrado=" + EscenarioCerrado	
		}
		hayfiltro = 1;
	}	
		
//	alert("IdIPSLocal= "+IdIPSLocal+ " IdTipoEscenario="+IdTipoEscenario+" filtro="+filtro);
	
		$.ajax({
			type: "POST",			
			url: "./bin/mostraFiltarEscenarios.php",
			async: false,
			data: {
				IdIPSLocal: IdIPSLocal,
				IdTipoEscenario: IdTipoEscenario,
				hayfiltro: hayfiltro,
				filtro:filtro
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
												
						var IdEscenario = Number($(this).attr("id").split("-")[1]);	
						
					//	alert("IdTipoEscenario="+IdTipoEscenario+" IdEscenario="+IdEscenario);
																						
						if (IdEscenario == -1){
							$('#btnAbrirEscenario').attr('disabled','disabled');
							$('#tempIdEscenario').val('');		
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
      