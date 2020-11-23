$(document).ready(function() {

    sendRequestInfo("tabEscenarios");
        
    $("#tabsTablasConfig li").click(function() {
        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab_content").hide();

        var activeTab = $(this).find("a").attr("href");
        sendRequestInfo($(activeTab).attr('id'));
        $(activeTab).fadeIn();
        return false;
    });
    
});


function sendRequestInfo(idTab) {   

    $("ul.tabs li").removeClass("active");
    $("#tabselected").val('');
    
    $("#tabTipoACV").hide();
    $("#tabTipoHemo").hide();
    $("#tabTipoTiempo").hide();
    $("#tabTipoCircIsque").hide();
    $("#tabEscenarios").hide();
    $("#tabAnticoagulantesOrales").hide();
    $("#tabTipoDocIdent").hide();
    $("#tabTipoUsuario").hide();
    $("#tabTipoContraRM").hide();
            
    switch(idTab){
        case "tabEscenarios":
			$("#tabselected").val('tabEscenarios');
            $("#tabhEscenarios").addClass("active");
            $("#tabEscenarios").fadeIn("fast");
            $("#tabla_tipoescenario").show();
            mostrarDeTabla('tipoescenario', 'IdTipoEscenario', 'TipoEscenario');
            break;
        case "tabTipoTiempo":
			$("#tabselected").val('tabTipoTiempo');
            $("#tabhTipoTiempo").addClass("active");
            $("#tabTipoTiempo").fadeIn("fast");
            $("#tabla_tipotiempo").show();
            mostrarDeTabla('tipotiempo', 'idtipotiempo', 'tipotiempo');
            break;
        case "tabTipoACV":
			$("#tabselected").val('tabTipoACV');
            $("#tabhTipoACV").addClass("active");
            $("#tabTipoACV").fadeIn("fast");
            $("#tabla_tipoacv").show();
            mostrarDeTabla('tipoacv', 'IdTipoACV', 'TipoACV');
            break;
        case "tabTipoHemo":
			$("#tabselected").val('tabTipoHemo');
            $("#tabhTipoHemo").addClass("active");
            $("#tabTipoHemo").fadeIn("fast");
            $("#tabla_tipohemo").show();
            mostrarDeTabla('tipohemo', 'IdTipoHemo', 'TipoHemo');
            break;

        case "tabTipoCircIsque":
			$("#tabselected").val('tabTipoCircIsque');
            $("#tabhTipoCircIsque").addClass("active");
            $("#tabTipoCircIsque").fadeIn("fast");
            $("#tabla_tipocircisque").show();
            mostrarDeTabla('tipocircisque', 'IdTipoCircIsque', 'TipoCircIsque');
            break;
        case "tabAnticoagulantesOrales":
			$("#tabselected").val('tabAnticoagulantesOrales');
            $("#tabhAnticoagulantesOrales").addClass("active");
            $("#tabAnticoagulantesOrales").fadeIn("fast");
            $("#tabla_anticoagulantesorales").show();
            mostrarDeTabla('anticoagulantesorales', 'IdAnticoagulanteOral', 'AnticoagulanteOral');
            break;
        case "tabTipoDocIdent":
			$("#tabselected").val('tabTipoDocIdent');
            $("#tabhTipoDocIdent").addClass("active");
            $("#tabTipoDocIdent").fadeIn("fast");
            $("#tabla_tipodocident").show();
            mostrarDeTabla('tipodocident', 'IdTipoDocIdent', 'TipoDocIdent');
            break;
        case "tabTipoUsuario":
			$("#tabselected").val('tabTipoUsuario');
            $("#tabhTipoUsuario").addClass("active");
            $("#tabTipoUsuario").fadeIn("fast");
            $("#tabla_tipousuario").show();
            mostrarDeTabla('tipousuario', 'IdUsuarioTipo', 'UsuarioTipo');
            break;

        case "tabTipoContraRM":
			$("#tabselected").val('tabTipoContraRM');
            $("#tabhTipoContraRM").addClass("active");
            $("#tabTipoContraRM").fadeIn("fast");
            $("#tabla_tipormcontras").show();
            mostrarDeTabla('tipormcontras', 'IdRMcontraindicacion', 'RMcontraindicacion');
            break;
                                                            
        default:

            
            break;
    }
}    
    
                    
function mostrarAdicionarNuevoEnTabla(NombreTabla){

    $('#datosEnTabla_'+NombreTabla).hide();
    $('#btnCrearNuevoTabla_'+NombreTabla).hide();
    $('#btnGuardarTabla_'+NombreTabla).hide();
    $('#datosNuevoEnTabla_'+NombreTabla).show();
    $('#cuadrosPopup_'+NombreTabla).show('slow');   
}

function adicionarNuevoEnTabla(NombreTabla, NombreId, NombreCampo, IdCampo, Campo){

    $.ajax({
        type: "POST",
        url: "./bin/adicionarEnTabla.php",
        data: {
			NombreTabla: NombreTabla,
			NombreId: NombreId,
			NombreCampo: NombreCampo,
			IdCampo: IdCampo,
			Campo: Campo			
        },
        success: function(resp){
            alert(resp);            
            $('#cuadrosPopup_'+NombreTabla).hide('slow');
            $('#datosNuevoEnTabla_'+NombreTabla).hide();

    		mostrarDeTabla(NombreTabla, NombreId, NombreCampo);
       
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function mostrarDeTabla(NombreTabla, NombreId, NombreCampo){

	$('#datosNuevoEnTabla_'+NombreTabla).hide();

     $.ajax({
        type: "POST",
        url: "./bin/mostrarDeTabla.php",
        data: {
			NombreTabla: NombreTabla,
			NombreId: NombreId,
			NombreCampo: NombreCampo		
        },
        success: function(resp){
                $('#cuadrosPopup_'+NombreTabla).show();
                $('#datosEnTabla_'+NombreTabla).show();
                $('#datosEnTablaContenido_'+NombreTabla).html(resp);
                $('#btnCrearNuevoTabla_'+NombreTabla).show();
                $('#btnGuardarTabla_'+NombreTabla).show();
        },
        error: function(e){
            alert("Error "+e);
        }
    });
}

function eliminarEnTabla(NombreTabla, NombreId, NombreCampo, IdCampo) {   

var respuesta = confirm("¿ESTA SEGURO DE ELIMINAR EL REGISTRO CON id = ("+IdCampo+")?");

    if (respuesta == false) {
        return;
    }    

 $.ajax({
        type: "POST",
        url: "./bin/eliminarEnTabla.php",
        data: {
			NombreTabla: NombreTabla,
			NombreId: NombreId,
			IdCampo: IdCampo
        },
        success: function(resp){
			alert(resp);
			mostrarDeTabla(NombreTabla, NombreId, NombreCampo);
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function guardarEnTabla(NombreTabla, NombreId, NombreCampo){
    
 var agregado = true;
                        
		$('#datosEnTablaContenido_'+NombreTabla).find("tr").filter("[id^=registro]").each(function(){
	    
			//	alert($(this).find("#Campo").val()+" IdCampo: "+$(this).find("#IdCampo").val());
	    
			$.ajax({
				type: "POST",
				async: false,
				url: "./bin/salvarEnTabla.php",
				data: {
					NombreTabla: NombreTabla,
					NombreId: NombreId,
					NombreCampo: NombreCampo,
					IdCampo: $(this).find("#IdCampo").val(),
					Campo: $(this).find("#Campo").val()
				},
				success: function(resp){
				
			//	alert(resp);
				
					if(resp!=1){
						agregado = false;
						alert("Error al salvar el registro con id= "+IdCampo);

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