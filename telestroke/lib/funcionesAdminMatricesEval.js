 
function esVacioONull($q){
	return (!isset($q) || trim($q)==='');
}

function crearMatrizEval(){

alert("crearMatrizEval");

    var nombreNuevaMatrizEval = $('#nombreNuevaMatrizEval').val();
       
    if (nombreNuevaMatrizEval ==""){
		alert("Seleccione el nombre para la nueva matriz.");
    } else {   
    
		$.ajax({
			type: "POST",
			url: "./bin/crearMatrizEval.php",
			data: {
					nombreNuevaMatrizEval: nombreNuevaMatrizEval,
					descripcionMatEval: $('#descripcionMatEval').val()
					},
			success: function(resp){
						
					var idMatriz = resp;
										
					if (idMatriz > 0) {
						alert("Matriz creada: " + idMatriz);
					//	$('#matriz').val(idMatriz);
					//	$('#adminMatrizEvaluacion').show();
					//	mostrarMatriz();
					} else {
					alert("Error al crear la matriz: " + resp);
						$('#matriz').val(0);
						$('#adminMatrizEvaluacion').hide();
					}
			},
			error: function(e){alert('Error: ' + e);}
		}); 
    }       
} 

    
function guardarMatrizEval(){
    
  //  alert("guardarMatrizEval");
    
        var agregado = true;        
        
        //Se busca por todos los grupo
        $(".grupoEval").each(function(){
        
            if ($(this).attr("id")!="grupoEval"){
            
                var IdMatricesEvalGrupos = $(this).attr("id").split("-")[1];
                
          //      alert($(this).attr("id") + " IdMatricesEvalGrupos: " + IdMatricesEvalGrupos + " orden; " + $(this).find("#Orden").val() + " grupo: " + $(this).find("#MatrizEvalGrupo").val() );                
                
                $(this).find("tr").filter("[id^=detalle]").each(function(){
					
				//	alert($(this).attr("id"));
                   
					var IdMatricesEvalGruposOpciones = $(this).attr("id").split("-")[1];
					
				//	alert($(this).find("#MatrizEvalOpcion").val() + " IdMatricesEvalGruposOpciones: " + IdMatricesEvalGruposOpciones);
                   
                   
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: "./bin/salvarMatrizEval.php",
                        data: {
                            IdMatricesEvalGruposOpciones: IdMatricesEvalGruposOpciones,
                            Orden: $(this).find("#Orden").val(),
                            MatrizEvalOpcion: $(this).find("#MatrizEvalOpcion").val(),
                            Puntaje: $(this).find("#Puntaje").val(),
                            tipo: "opcion"
                        },
                        success: function(resp){
                            if(resp!=1){
                                agregado = false;
                                alert(resp);
                            }
                        },
                        error: function(e){
                            alert('Error: ' + e);
                        }
                    });
                    
                });
                
              
                $.ajax({
                        type: "POST",
                        async: false,
                        url: "./bin/salvarMatrizEval.php",
                        data: {
                            IdMatricesEvalGrupos: IdMatricesEvalGrupos,
                            Orden: $(this).find("#Orden").val(),
                            MatrizEvalGrupo: $(this).find("#MatrizEvalGrupo").val(),
                            tipo: "grupo"
                        },
                        success: function(resp){
                                                
                            if(resp!=1){
                                agregado = false;
                                alert(resp);
                            }
                        },
                        error: function(e){
                            alert('Error: ' + e);
                        }
                    });                 
            }
        });
        
        if(!agregado){
            alert("Error Salvando");
        }else{
            alert("Matriz guardada correctamente.");
        }        
}

function mostrarMatriz(){
 
	var matriz = $('#matriz').val(); 
	var nombrematriz =  $('#matriz option[value=\''+matriz+'\']').text();
	
//	alert("mostrarMatriz matriz: " + matriz);
    
    $('#datosNuevoGrupo').hide();
    $('#datosNuevaOpcion').hide();
    
		$.ajax({
			type: "POST",
			url: "./bin/adminMatrizEvaluacion.php",
			data: 'matriz='+matriz + "&nombrematriz="+nombrematriz,
			success: function(resp){
				$('#editorMatriz').html(resp);
			},
			error: function(e){
				alert('Error: ' + e);
			}
		});  
	  
}
 

function mostrarAdicionarGrupo(){

    $('#datosNuevoGrupo').show();
    $('#cuadrosPopup').show('slow');
}

function adicionarGrupoEval(){
    $.ajax({
        type: "POST",
        url: "./bin/adicionarGrupoEval.php",
        data:{
				idMatrizEvalSelected: $('#matriz').val(),
				nombreNuevoGrupo: $('#nombreNuevoGrupo').val(),
				ordenNuevoGrupo: $('#ordenNuevoGrupo').val()
        },
        success: function(resp){
			alert("Adicionar Grupo: " + resp);
            mostrarMatriz();
            $('#datosNuevoGrupo').hide();
            $('#cuadrosPopup').hide('slow');
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function mostrarAdicionarOpcion(IdMatricesEvalGrupos){

    $('#idNuevaMatricesEvalGrupos').val(IdMatricesEvalGrupos);
    $('#datosNuevaOpcion').show();
    $('#cuadrosPopup').show('slow');
}

function adicionarOpcionEval(){

/*
	alert("IdMatrizEval: "+ $('#matriz').val()+
				" IdMatrizEvalGrupo: "+ $('#idgrupoNuevaOpcion').val()+
				" Orden: "+ $('#ordenNuevaOpcion').val()+
				" MatrizEvalOpcion: "+ $('#nombreNuevaOpcion').val()+
				" Puntaje: "+ $('#puntajeNuevaOpcion').val()
			);
*/
			
    $.ajax({
        type: "POST",
        url: "./bin/adicionarOpcionEval.php",
        data:{
				IdMatricesEvalGrupos: $('#idNuevaMatricesEvalGrupos').val(),
				Orden: $('#ordenNuevaOpcion').val(),
				MatrizEvalOpcion: $('#nombreNuevaOpcion').val(),
				Puntaje: $('#puntajeNuevaOpcion').val()        
        },
        success: function(resp){
			alert("Adicionar Item: " + resp);
            mostrarMatriz();
            $('#datosNuevaOpcion').hide();
            $('#cuadrosPopup').hide('slow');
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function borrarGrupoEval(id){

    $.ajax({
        type: "POST",
        url: "./bin/borrarGrupoEval.php",
        data: "idBorrar="+id,
        success: function(resp){
			alert("Brorrar grupo: " + resp);
            mostrarMatriz();
            $('#datosNuevaOpcion').hide();
            $('#cuadrosPopup').hide('slow');
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

function borrarOpcionEval(id){

// alert(id);

    $.ajax({
        type: "POST",
        url: "./bin/borrarOpcionEval.php",
        data: "idBorrar="+id,
        success: function(resp){
			alert("Brorrar opción: " + resp);
            mostrarMatriz();            
            $('#datosNuevaOpcion').hide();
            $('#cuadrosPopup').hide('slow');            
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
}

