<?php

// Archivo: adminmatrices.php

session_start();

include "db.php";

$idMatrizEval = "";

$sqlMatrices = "SELECT * FROM matriceseval ORDER BY IdMatrizEval ASC";
$resultMatrices = mysqli_query($con, $sqlMatrices) or die(mysqli_error($con));

if (mysqli_num_rows($resultMatrices) > 0){
    while($row = mysqli_fetch_array($resultMatrices)){
        $idMatrizEval .= "<option value=\"".$row['IdMatrizEval']."\">". myutf8_decode($row['MatEval'])."</option>";
    }
}
$idMatrizEval .= "</select> ";

mysqli_close($con);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>TelestrokeRU</title>
        <link href="css/telestroke.css" rel="stylesheet" type="text/css"/>
        <link href="css/matriceseval.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="lib/funcionesAdminMatricesEval.js"></script>
        <script type="text/javascript" src="lib/jquery-1.4.2.min.js"></script>
    </head>

    <body>
        <?php
        include "header.php";
        include "./PaginaPrincipal/Encabezado.php";  
        ?>
        
        <div id="contenido">
                
		<div style="padding-top:5px">
			<table width="100%" border="0" align="center"  cellpadding="10" cellspacing="2">
				<tr align="center">
					<td>
						<form name="form_regeresar" action="seleccion.php" method="post">
							<input class="Boton" name="boton_regresar" type="submit" value="Regresar" id="boton_regresar" style="width:300px;"/>
						</form>
					</td>
				</tr>
				<tr align="center">
					<td class="Titulo1">Administrar Matrices de Evaluación</td>
				</tr>
			</table>
		</div>               
                
        <!--SELECCION DE MATRIZ-->
        
        <table width="100%" border="1" cellpadding="10" cellspacing="2">
        
			<tr>
				<td class="LabelCampo" align="left" width="99%">Nombre nueva matriz:</td>
			</tr>
			<tr>
				<td><input class="InputCampo" style="width:99%;" type="text" name="nombreNuevaMatrizEval" id="nombreNuevaMatrizEval" SIZE="60" value="" /></td>
			<tr>	
				<td class="LabelCampo" align="left">Descripción:</td>
			</tr>
			<tr>					
				<td><input class="InputCampo" style="width:99%;" type="text" name="descripcionMatEval" id="descripcionMatEval" SIZE="60" value="" /></td>
			</tr>
			<tr>
				<td>
					<input class="Boton" style="width:460px;" onclick="crearMatrizEval();" type="button" value="Crear matriz"/>													
				</td>
			</tr>
            <tr>
                <td class="LabelCampo" align="left" width="99%">Matriz a administrar:</td>
			</tr>
			<tr>
				<td>			
					<select class="InputCampo" id="matriz" name="matriz" style="width: 100%;" onchange="if($('#matriz').val()==0){$('#adminMatrizEvaluacion').hide();} else {$('#adminMatrizEvaluacion').show(); mostrarMatriz();}">
                        <option value=0> Seleccionar...</option>
                        <?php echo $idMatrizEval; ?>
                    </select>
                </td>
            </tr>
        </table>
        <br/>                

        <table id="adminMatrizEvaluacion" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
					<div id="editorMatriz" >
                    </div>                                                                                                          
                </td>
            </tr>
        </table>
        
    </div>
    
    <div id="cuadrosPopup" hidden>
        
        <div id="datosNuevoGrupo" class="nuevosDatos">
            <br/>
            <label class="LabelCampo" for="ordenNuevoGrupo">Orden Grupo:</label>
            <br/>
            <input class="InputCampo" type="text" id="ordenNuevoGrupo" value="" />                
            <br/>
            <label class="LabelCampo" for="nombreNuevoGrupo">Nombre Grupo:</label>
            <br/>
            <input class="InputCampo" type="text" id="nombreNuevoGrupo" value="" />
            <br/>                    
            <br/>
            <input class="Boton" type="button" style="width: 460px" value="Adicionar Grupo" onclick="adicionarGrupoEval();"/>
            <input class="Boton" type="button" style="width: 460px" value="Cancelar" onclick="$('#datosNuevoGrupo').hide();$('#cuadrosPopup').hide();"/>
        
        </div>
                
        <div id="datosNuevaOpcion" class="nuevosDatos">
			<br/>
            <label class="LabelCampo" for="idNuevaMatricesEvalGrupos">KEY IdMatricesEvalGrupos:</label>
            <br/>
            <input disabled type="text" id="idNuevaMatricesEvalGrupos" value="" />
            <br/>  					
            <label class="LabelCampo" for="ordenNuevaOpcion">Orden Opción:</label>
            <br/>
            <input class="InputCampo" type="text" id="ordenNuevaOpcion" value="" />
            <br/>                                        
            <label class="LabelCampo" for="nombreNuevaOpcion">Opción:</label>
            <br/>
            <input class="InputCampo" type="text" id="nombreNuevaOpcion" value="" />
            <br/>
            <label class="LabelCampo" for="puntajeNuevaOpcion">Puntaje:</label>
            <br/>
            <input class="InputCampo" type="text" id="puntajeNuevaOpcion" value="" />
            <br/>
            <br/>
            <input class="Boton" type="button" style="width: 360px" value="Adicionar Opción" onclick="adicionarOpcionEval();"/>
            <input class="Boton" type="button" style="width: 360px" value="Cancelar" onclick="$('#datosNuevaOpcion').hide();$('#cuadrosPopup').hide();"/>
        </div>

    </div>
            
<?php        
        include "footer.php";
?>
    </body>
</html>