function btnFiltarUsuarios_OnClick() {

	mostrarUsuarios();

	return;
}


function mostrarAdicionarNuevoUsuario(){
    
    $('#divBuscarUsuarioFiltros').hide();
	$('#datosUsuarios').hide();
	$('#btnCrearNuevoUsuario').hide();
    $('#btnGuardarUsuarios').hide();	
	
	$('#tableListaIPS').hide();    

    $('#datosNuevoUsuario').show();
    $('#cuadrosPopup').show('slow');       
}

function adicionarNuevoUsuario(){

	if ($('#UsuarioClave').val() != $('#ConfirmarUsuarioClave').val()){
	 alert("Error: Las claves no coincide. Verifique la clave.");
		return;
	}

    $.ajax({
        type: "POST",
        url: "./bin/adicionarUsuario.php",
        data: {
			UsuarioNombre: $('#UsuarioNombre').val(),
			UsuarioID: $('#UsuarioID').val(),
			UsuarioClave: $('#UsuarioClave').val(),
			IdUsuarioTipo: $('#IdUsuarioTipo').val(),
			
			PrimerNombre: $('#PrimerNombre').val(),
			SegundoNombre: $('#SegundoNombre').val(),
			PrimerApellido: $('#PrimerApellido').val(),
			SegundoApellido: $('#SegundoApellido').val(),
			IdTipoDocIdent: $('#IdTipoDocIdent').val(),
			NumeroDocIdentidad: $('#NumeroDocIdentidad').val(),
			Sexo: $('#Sexo').val()
        },
        success: function(resp){
            alert(resp);                        
            $('#cuadrosPopup').hide('slow');
            $('#datosNuevoUsuario').hide();

    		mostrarUsuarios();
    		      
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function ListaAddIPAUsuario_OnChange() {

	var UsuarioID = setMenos1SiNulo($('#tempUsuarioID').val());
	if (UsuarioID == -1){
		alert("UsuarioID no seleccionado.");
		return;
	}
	
	var IdIPS = setMenos1SiNulo($('#ListaAddIPAUsuario').val());
	if (IdIPS == -1){
		alert("IPS no seleccionada.");
		return;
	}
				
    $.ajax({
        type: "POST",
        url: "./bin/adicionarUsuarioIPS.php",
        data: {
			UsuarioID: UsuarioID,
			IdIPS: IdIPS
        },
        success: function(resp){
          //  alert(resp); 
		  if (resp == 1){
			alert("IPS adicionada.");  
		  }
    		mostrarUsuarioIPS();
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });	
}


function mostrarUsuarios(){

    $('#cuadrosPopup').hide();
	$('#datosNuevoUsuario').hide();
	
    $('#divBuscarUsuarioFiltros').show();
	$('#datosUsuarios').show();
    $('#btnCrearNuevoUsuario').show();
    $('#btnGuardarUsuarios').show();

	$('#tableListaIPS').show();    
	$('#datosListaIPS').show();		
	$('#divAddIPAUsuario').hide();
		
	var IdTipoDocIdent = setMenos1SiNulo($('#FiltroIdTipoDocIdent').val()); 
	var NumeroDocIdentidad = setMenos1SiNulo($('#FiltroNumeroDocIdentidad').val()); 
	var PrimerNombre = setMenos1SiNulo($('#FiltroPrimerNombre').val()); 
	var PrimerApellido = setMenos1SiNulo($('#FiltroPrimerApellido').val()); 
	var UsuarioID = setMenos1SiNulo($('#FiltroUsuarioID').val()); 
		
	$('#tempUsuarioID').val('');
	
     $.ajax({
        type: "POST",
        url: "./bin/mostrarUsuarios.php",
        data:{
			UsuarioID: UsuarioID,
			IdTipoDocIdent: IdTipoDocIdent,
			NumeroDocIdentidad: NumeroDocIdentidad,
			PrimerNombre: PrimerNombre,
			PrimerApellido: PrimerApellido						
		},
        success: function(resp){  
        
			//	alert(resp);
				              
               $('#cuadrosPopup').hide();
               $('#datosUsuarios').show();
               $('#datosUsuariosContenido').html(resp);
               $('#btnCrearNuevoUsuario').show();  
               $('#btnGuardarUsuarios').show();  
               
               
				$('.filaUsuario').removeClass("filaSelec");
				$('.filaUsuario').hover(
					function(){
						$(this).addClass("filaHover");
					},
					function(){
						$(this).removeClass("filaHover");
					}
				);
						
				$('.filaUsuario').click(
					function(){
					
						$('.filaUsuario').removeClass("filaSelec");
						$(this).addClass("filaSelec");
						var UsuarioID = $(this).attr("id").split("-")[1];					
						if (UsuarioID == ''){
							$('#tempUsuarioID').val('');
							$('#divAddIPAUsuario').hide();		
						}else{
							$('#tempUsuarioID').val(UsuarioID);								
							mostrarUsuarioIPS();	
						}
					}				
				);                               
        },
        error: function(e){
            alert("Error "+e);
        }
    });
}

function eliminarUsuario(idUsuario){   

var respuesta = confirm("¿ESTA SEGURO DE ELIMINAR EL USUARIO CON id = ("+idUsuario+")?");

    if (respuesta == false) {
        return;
    }  
    
 $.ajax({
        type: "POST",
        url: "./bin/eliminarUsuario.php",
        data: "UsuarioID="+idUsuario,
        success: function(resp){
			alert(resp);
			mostrarUsuarios();
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function eliminarIPSUsuario(IdIPSUsuario){   

var respuesta = confirm("¿ESTA SEGURO DE ELIMINAR LA IPS DEL USUARIO CON id = ("+IdIPSUsuario+")?");

    if (respuesta == false) {
        return;
    }  
    
	
 $.ajax({
        type: "POST",
        url: "./bin/eliminarEnTabla.php",
        data:{
			NombreTabla: "ipsusuarios",
			NombreId: "IdIPSUsuarios",
			IdCampo: IdIPSUsuario			
 		},
        success: function(resp){
			alert(resp);
			mostrarUsuarioIPS();
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}


function guardarUsuarios(){
    
 var agregado = true;
                        
	$('#datosUsuariosContenido').find("tr").filter("[id^=registro]").each(function(){
	    	
				var UsuarioID = $(this).find("#UsuarioID").val();
				
		//		alert($(this).find("#PrimerNombre").val()+$(this).find("#SegundoNombre").val()+$(this).find("#PrimerApellido").val()+$(this).find("#SegundoApellido").val()+$(this).find("#IdTipoDocIdent").val()+$(this).find("#NumeroDocIdentidad").val()+$(this).find("#Sexo").val());
	    
	    
				$.ajax({
					type: "POST",
					async: false,
					url: "./bin/salvarUsuarios.php",
					data: {
						UsuarioID: UsuarioID,
						UsuarioNombre: $(this).find("#UsuarioNombre").val(),
						UsuarioClave: $(this).find("#UsuarioClave").val(),
						IdUsuarioTipo: $(this).find("#IdUsuarioTipo").val(),
						
						PrimerNombre: $(this).find("#PrimerNombre").val(),
						SegundoNombre: $(this).find("#SegundoNombre").val(),
						PrimerApellido: $(this).find("#PrimerApellido").val(),
						SegundoApellido: $(this).find("#SegundoApellido").val(),
						IdTipoDocIdent: $(this).find("#IdTipoDocIdent").val(),
						NumeroDocIdentidad: $(this).find("#NumeroDocIdentidad").val(),
						Sexo: $(this).find("#Sexo").val()
					},
					success: function(resp){
					
				//	alert(resp);
										
						if(resp !=1 ){
							agregado = false;
							alert("Error al salvar el usuario "+UsuarioID+resp);
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

function mostrarUsuarioIPS() {

	var UsuarioID = setMenos1SiNulo($('#tempUsuarioID').val());

	if (UsuarioID == -1){
		alert("UsuarioID no seleccionado.");
		$('#divAddIPAUsuario').hide();
		
		return;
	}
	
	$('#divAddIPAUsuario').show();
								
     $.ajax({
        type: "POST",
        url: "./bin/mostrarUsuariosIPS.php",
        data:{
        	UsuarioID: UsuarioID
		},
        success: function(resp){  
        
			//	alert(resp);
				              
               $('#cuadrosPopup').hide();
               $('#datosUsuarios').show();
               $('#datosListaIPS').html(resp);               
                                                         
        },
        error: function(e){
            alert("Error "+e);
        }
    });
    
	return;
}
