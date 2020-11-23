


function btnCalcMatriz_OnClick(IdEscenario, IdTipoEscenario, IdMatrizEval, divmostraren, tagtotal) {
		
	var idmatriz = setMenos1SiNulo(IdMatrizEval);
	if (idmatriz == '-1') {alert("Error: selecciones el ID de la matriz");return;}
	
    if(tagtotal == ""){alert("Campo tagtotal no valido.");return;}    	
    if(divmostraren == ""){alert("Campo tagtotal no valido.");return;}      
    	
	mostrarMatrizCaso(IdEscenario, IdTipoEscenario, idmatriz, divmostraren, tagtotal);

	return;
}
	
function mostrarMatrizCaso(IdEscenario, IdTipoEscenario, IdMatrizEval, divmostraren, tagtotal){	   
       
	var TotalValorCalculado = "TotalValorCalculado_"+IdMatrizEval;
    var TotalGrupos = "TotalGrupos_"+IdMatrizEval;
    var GruposPendientes = "GruposPendientes_"+IdMatrizEval;
  	var btnAsignarValorCalculado = "btnAsignarValorCalculado_"+IdMatrizEval;
	var resumenPuntajeMatriz = "resumenPuntajeMatriz_"+IdMatrizEval;
                       
		$.ajax({
			type: "POST",
			url: "./bin/mostrarMatrizEvaluacion.php",
			data: {
					IdTipoEscenario: IdTipoEscenario,
					IdEscenario: IdEscenario,
					
					IdMatrizEval: IdMatrizEval,
					divmostraren: divmostraren,
					tagtotal: tagtotal,
					btnAsignarValorCalculado: btnAsignarValorCalculado,
					resumenPuntajeMatriz: resumenPuntajeMatriz,
					TotalValorCalculado: TotalValorCalculado,
    				TotalGrupos: TotalGrupos,
    				GruposPendientes: GruposPendientes				
			},			
			success: function(resp){
		//		alert(resp);
				document.getElementById(divmostraren).innerHTML = resp;
				
				var nfilas = 0;
				
				$("#"+divmostraren).find(".grupoEval").each(
					function(){ nfilas = nfilas+1;}
				)
										
				document.getElementById(TotalGrupos).value = nfilas;
				eventoOpcionSeleccionada("", divmostraren, TotalValorCalculado, TotalGrupos, GruposPendientes, btnAsignarValorCalculado);
				
				var listaopcionesdegrupo = ".claseOpcionDeGrupo";
				           
                $(listaopcionesdegrupo).hover(function(){$(this).addClass("filaHover");},function(){$(this).removeClass("filaHover");});
				
                $(listaopcionesdegrupo).click(function(){
					
					if ($(this).hasClass("filaSelec")){
						
						$(this).removeClass("filaSelec");
						eventoOpcionSeleccionada(this, divmostraren, TotalValorCalculado, TotalGrupos, GruposPendientes, btnAsignarValorCalculado);	
						
					} else {					
						
						$(this).parent('tbody').find(listaopcionesdegrupo).removeClass("filaSelec");					
	                    $(this).addClass("filaSelec");
	                    				
						eventoOpcionSeleccionada(this, divmostraren, TotalValorCalculado, TotalGrupos, GruposPendientes, btnAsignarValorCalculado);				
						
						var siggrupo = "";
						siggrupo = $(this).parents('div.grupoEval').next().attr('id');
					//	alert(siggrupo);
						if ((siggrupo == "" || (document.getElementById(GruposPendientes).value == 0)) ){
							$('html, body').animate({scrollTop: $("#"+resumenPuntajeMatriz).offset().top});
						} else {
							$('html, body').animate({scrollTop: $("#"+siggrupo).offset().top});
						}
					}
                });                
                
			    $("#"+divmostraren).show();				
				$('html, body').animate({
					scrollTop: $("#"+divmostraren).offset().top
				}, 1000);						
			},
			error: function(e){
				alert('Error: ' + e);
			}
		}); 
		
	return;
}

function eventoOpcionSeleccionada(event, divmostraren, TotalValorCalculado, TotalGrupos, GruposPendientes, btnAsignarValorCalculado) {
    				
   // , TotalValorCalculado, GruposPendientes, btnAsignarValorCalculado
    				
	var		totalopciones = document.getElementById(TotalGrupos).value;
	var		totalopcionessel = 0;
	var		puntajeTotal = 0;
	var		puntaje = 0;

 //alert("totalopciones= "+totalopciones, " TotalValorCalculado: "+TotalValorCalculado + " GruposPendientes: "+GruposPendientes +" btnAsignarValorCalculado: "+btnAsignarValorCalculado);

	$("#"+divmostraren).find(".filaSelec").each(
		function(){
			puntaje = Number($(this).children('td').eq(1).text());
			puntajeTotal = puntajeTotal + puntaje;  
			totalopcionessel = totalopcionessel+1;     
		}
    )
	
    document.getElementById(TotalValorCalculado).value = puntajeTotal;
    document.getElementById(GruposPendientes).value = totalopciones-totalopcionessel;
    
    if (totalopciones == totalopcionessel) {
		document.getElementById(btnAsignarValorCalculado).removeAttribute('disabled');
	} else {
		document.getElementById(btnAsignarValorCalculado).setAttribute('disabled','disabled');
	}  
	return; 
}

function btnAsignarValorCalculado_OnClick(IdEscenario, IdTipoEscenario, IdMatrizEval, divmostraren, tagtotal, campovalortotal) {

var		total = Number(document.getElementById(campovalortotal).value);

//  alert(divmostraren + ": " + tagtotal);	

	borrarMatrizCaso(IdEscenario, IdTipoEscenario, IdMatrizEval);	
	guardarMatrizCaso(IdEscenario, IdTipoEscenario, divmostraren);
	
	$('#'+divmostraren).hide();
	
	document.getElementById(tagtotal).value = total;	
	document.getElementById(tagtotal).onchange();		

	return;
}

function borrarMatrizCaso(IdEscenario, IdTipoEscenario, IdMatrizEval) {
    
    var borrado = true; 
    				    				
    $.ajax({
        type: "POST",
        async: false,
        url: "./bin/borrarMatrizCaso.php",
        data: {
			IdEscenario: IdEscenario,
			IdTipoEscenario: IdTipoEscenario,
			IdMatrizEval: IdMatrizEval
        },
        success: function(resp){
            if(resp!=1){
                borrado = false;
                alert(resp);
            }
        },
        error: function(e){
            alert('Error: ' + e);
        }
    });
  
	return borrado; 
}


function guardarMatrizCaso(IdEscenario, IdTipoEscenario, divmostraren) {
    
    var agregado = true; 
    				    				
	$("#"+divmostraren).find(".filaSelec").each(
		function(){
   
			var IdMatricesEvalGruposOpciones = $(this).attr("id").split("-")[1];
			
    //    alert("IdMatricesEvalGruposOpciones= "+IdMatricesEvalGruposOpciones);
                               
            $.ajax({
                type: "POST",
                async: false,
                url: "./bin/guardarMatrizCaso.php",
                data: {
					IdEscenario: IdEscenario,
					IdTipoEscenario: IdTipoEscenario,
					IdMatricesEvalGruposOpciones: IdMatricesEvalGruposOpciones
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
  
	return agregado; 
}