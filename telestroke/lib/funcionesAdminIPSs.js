function btnFiltarIPSs_OnClick() {

	mostrarIPSs();

	return;
}


function mostrarAdicionarNuevaIPS(){
    
    $('#divBuscarIPSFiltros').hide();
	$('#datosIPSs').hide();
    $('#btnCrearNuevaIPS').hide();
    $('#btnGuardarIPSs').hide();
	$('#tableIPSsReferencia').hide();
	
    $('#datosNuevaIPS').show();
    $('#cuadrosPopup').show('slow');       
}

function adicionarNuevaIPS(){

    $.ajax({
        type: "POST",
        url: "./bin/adicionarIPS.php",
        data: {
			CODDPTO: $('#CODDPTO').val(),
			CODMPIO: $('#CODMPIO').val(),
			IdTipoEscenario: $('#IdTipoEscenario').val(),
			CodigoPrestador: $('#CodigoPrestador').val(),
			Prestador: $('#Prestador').val(),
			Direccion: $('#Direccion').val(),
			Telefono: $('#Telefono').val()
        },
        success: function(resp){
            alert(resp);                        
            $('#cuadrosPopup').hide('slow');
            $('#datosNuevaIPS').hide();

    		mostrarIPSs();    		  
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function ListaAddIPSsReferencia_OnChange() {

	var IdIPSRemitente = setMenos1SiNulo($('#tempIdIPS').val());
	if (IdIPSRemitente == -1){
		alert("IPS no seleccionada.");
		return;
	}
	
	var IdIPSReferencia = setMenos1SiNulo($('#ListaAddIPSsReferencia').val());
	if (IdIPSReferencia == -1){
		alert("IPS de Referencia no seleccionada.");
		return;
	}
			
    $.ajax({
        type: "POST",
        url: "./bin/adicionaIPSReferencia.php",
        data: {
			IdIPSRemitente: IdIPSRemitente,
			IdIPSReferencia: IdIPSReferencia
        },
        success: function(resp){
          //  alert(resp); 
		  if (resp == 1){
			alert("IPS adicionada.");  
		  }
    		mostrarIPSReferencia();
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });	
}


function mostrarIPSs(){

	$('#datosNuevaIPS').hide();
	$('#divBuscarIPSFiltros').show();
	$('#tableIPSsReferencia').show();  

	
	var filtro ="";
	var hayfiltro = 0;
	
	var CODDPTO = setMenos1SiNulo($('#FiltroCODDPTO').val()); 
	var CODMPIO = setMenos1SiNulo($('#FiltroCODMPIO').val()); 
	var IdTipoEscenario = setMenos1SiNulo($('#FiltroIdTipoEscenario').val()); 
	var CodigoPrestador = setMenos1SiNulo($('#FiltroCodigoPrestador').val()); 
	var Prestador = setMenos1SiNulo($('#FiltroPrestador').val()); 
		
	$('#tempIdIPS').val('');
	


	if (CODDPTO != -1){
		filtro = "CODDPTO='" + CODDPTO + "'";
		hayfiltro = 1;
	}
	if (CODMPIO != -1){
		if (hayfiltro){
			filtro += " AND CODMPIO='" + CODMPIO+ "'";
		} else {
			filtro ="CODMPIO='" + CODMPIO+ "'";	
		}
		hayfiltro = 1;
	}
	if (IdTipoEscenario != -1){
		if (hayfiltro){
			filtro += " AND IdTipoEscenario='" + IdTipoEscenario+ "'";
		} else {
			filtro ="IdTipoEscenario='" + IdTipoEscenario+ "'";	
		}
		hayfiltro = 1;
	}
	if (CodigoPrestador != -1){
		if (hayfiltro){
			filtro += " AND CodigoPrestador='" + CodigoPrestador+ "'";
		} else {
			filtro ="CodigoPrestador='" + CodigoPrestador+ "'";	
		}
		hayfiltro = 1;
	}
	if (Prestador != -1){
		if (hayfiltro){
			filtro += " AND Prestador LIKE '\%" + Prestador + "\%'";
		} else {
			filtro ="Prestador LIKE '\%" + Prestador + "\%'";	
		}
		hayfiltro = 1;
	}
	
     $.ajax({
        type: "POST",
        url: "./bin/mostrarIPSs.php",
        data:{
        	hayfiltro: hayfiltro,
			filtro:filtro
		},
        success: function(resp){  
        
			//	alert(resp);
				              
               $('#cuadrosPopup').hide();
               $('#datosIPSs').show();
               $('#datosIPSsContenido').html(resp);
               $('#btnCrearNuevaIPS').show();  
               $('#btnGuardarIPSs').show();  
			   $('#tableIPSsReferencia').show();  
			   
               
				$('.filaIPS').removeClass("filaSelec");
				$('.filaIPS').hover(
					function(){
						$(this).addClass("filaHover");
					},
					function(){
						$(this).removeClass("filaHover");
					}
				);
						
				$('.filaIPS').click(
					function(){
					
						$('.filaIPS').removeClass("filaSelec");
						$(this).addClass("filaSelec");
						var IdIPS = $(this).attr("id").split("-")[1];					
						if (IdIPS == ''){
							$('#tempIdIPS').val('');
							$('#divAddIPSReferencia').hide();		
						}else{
							$('#tempIdIPS').val(IdIPS);		
						//	alert(IdIPS);						
							mostrarIPSReferencia();	
						}
					}				
				);                               
        },
        error: function(e){
            alert("Error "+e);
        }
    });
}

function eliminarIPS(idIPS){   

var respuesta = confirm("¿ESTA SEGURO DE ELIMINAR LA IPS CON id = ("+idIPS+")?");

    if (respuesta == false) {
        return;
    }  
    
 $.ajax({
        type: "POST",
        url: "./bin/eliminarIPS.php",
        data: "IdIPS="+idIPS,
        success: function(resp){
			alert(resp);
			mostrarIPSs();
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function eliminarIPSReferencia(IdIPSReferencias){   

var respuesta = confirm("¿ESTA SEGURO DE ELIMINAR LA REFERENCIA DEL IPS CON id = ("+IdIPSReferencias+")?");

    if (respuesta == false) {
        return;
    }  
    
	
 $.ajax({
        type: "POST",
        url: "./bin/eliminarEnTabla.php",
        data:{
			NombreTabla: "ipsreferencias",
			NombreId: "IdIPSReferencias",
			IdCampo: IdIPSReferencias			
 		},
        success: function(resp){
			alert(resp);
			mostrarIPSReferencia();
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}


function guardarIPSs(){
    
 var agregado = true;
                        
	$('#datosIPSsContenido').find("tr").filter("[id^=registro]").each(function(){
	    
	//	alert($(this).find("#IdIPS").val()+", IPSClave: "+$(this).find("#IPSClave").val());
	
				var IdIPS = $(this).find("#IdIPS").val();
	    
				$.ajax({
					type: "POST",
					async: false,
					url: "./bin/salvarIPSs.php",
					data: {
						IdIPS: IdIPS,
						CODDPTO: $(this).find("#CODDPTOips-"+IdIPS).val(),
						CODMPIO: $(this).find("#CODMPIOips-"+IdIPS).val(),
						IdTipoEscenario: $(this).find("#IdTipoEscenario").val(),
						CodigoPrestador: $(this).find("#CodigoPrestador").val(),					
						Prestador: $(this).find("#Prestador").val(),
						Direccion: $(this).find("#Direccion").val(),
						Telefono: $(this).find("#Telefono").val()		
					},
					success: function(resp){
										
						if(resp !=1 ){
							agregado = false;
							alert("Error al salvar el IPS "+IdIPS+resp);
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

function mostrarIPSReferencia() {

	var IdIPS = setMenos1SiNulo($('#tempIdIPS').val());

	if (IdIPS == -1){
		alert("IdIPS no seleccionado.");
		$('#divAddIPSReferencia').hide();
		
		return;
	}
	
	$('#divAddIPSReferencia').show();
								
     $.ajax({
        type: "POST",
        url: "./bin/mostrarIPSReferencias.php",
        data:{
        	IdIPSRemitente: IdIPS
		},
        success: function(resp){  
        
			//	alert(resp);
				              
               $('#cuadrosPopup').hide();
               $('#datosIPSsContenido').show();
               $('#datosListaIPSsReferencia').html(resp);               
                                                         
        },
        error: function(e){
            alert("Error "+e);
        }
    });
    
	return;
}

