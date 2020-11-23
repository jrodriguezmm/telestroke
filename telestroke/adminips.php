<?php
session_start();

include "./db.php";

$ipsSQL = "SELECT * FROM ips ORDER BY ips.Prestador";

$ipsResult = mysqli_query($con, $ipsSQL) or die("Error: " . mysqli_error($con));
$ipsNumRows = mysqli_num_rows($ipsResult);
$ips_options = '<option value="-1">Seleccionar...' . '</option>';
while ($row = mysqli_fetch_array($ipsResult)) {
	$value = $row['IdIPS'];
	$ips_options .="<option value='$value'>" . myutf8_decode($row['IdTipoEscenario']) . ":" . myutf8_decode($row['Prestador']) . "</option>";
}

$sqlLista = "SELECT * FROM departamentos ORDER BY DPTO";
$resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
$numfilas = mysqli_num_rows($resultLista);
$departamentos_options = '<option value="-1">Seleccionar...' . '</option>';
while ($rowLista = mysqli_fetch_array($resultLista)) {
	$value = $rowLista['CODDPTO'];		
	$departamentos_options .= "<option value='$value'>"  . myutf8_decode($rowLista['DPTO']) . "</option>";
}    
                          
                                
mysqli_close($con);

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="pragma" content="no-cache" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="./css/telestroke.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="./lib/jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="./lib/funcionesACV.js"></script>
        <script type="text/javascript" src="./lib/funcionesAdminIPSs.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
				mostrarIPSs();
            });
        </script>
        <title>TelestrokeRU</title>        
    </head>

    <body>
      
<?php 
    include "header.php";
    
	include "./PaginaPrincipal/Encabezado.php";    
?>    

	<table id="cont_IPSs" width="100%" border="0" align="center"  cellpadding="2" cellspacing="2">
	
		<tr align="center">
			<td>
				<form name="form_regeresar" action="seleccion.php" method="post">
					<input class="Boton" name="boton_regresar" type="submit" value="Regresar" id="boton_regresar" style="width:300px;"/>
				</form>
			</td>
		</tr>
		
		<tr align="center">
			<td class="Titulo1">Administración de IPS</td>
		</tr>

		<tr align="center" style="height:250px;width:100%;">
			<td>
				<div id="cuadrosPopup" hidden>

					<div id="datosNuevaIPS" class="">
						<br/>
						<label class="LabelCampo" for="CODDPTO">DPTO:</label>
                        <select class="InputCampo" id="CODDPTO" name="CODDPTO"  style="width: 100%;" size="1" onchange="CODDPTO_OnChange('CODDPTO','CODMPIO');">						
                            <?php echo $departamentos_options;?>
                        </select> 
                        <label class="LabelCampo" for="CODMPIO">MPIO:</label>	
                        <select class="InputCampo" id="CODMPIO" name="CODMPIO" style="width: 100%;" size="1">
                        </select>                  
						<br/>
						<label class="LabelCampo" for="IdTipoEscenario">Escenario:</label>
						<br/>
						<input class="InputCampo" type="text" style="width: 100%;" id="IdTipoEscenario" value="" />
						<br/>
						<label class="LabelCampo" for="CodigoPrestador">Código:</label>
						<br/>
						<input class="InputCampo" type="text" style="width: 100%;" id="CodigoPrestador" value="" />
                        <br/>
						<label class="LabelCampo" for="Prestador">Prestador:</label>
						<br/>
						<input class="InputCampo" type="text" style="width: 100%;" id="Prestador" value="" />
                        <br/>
						<label class="LabelCampo" for="Direccion">Dirección:</label>
						<br/>
						<input class="InputCampo" type="text" style="width: 100%;" id="Direccion" value="" />                                                
						<br/>                                       
						<label class="LabelCampo" for="Telefono">Telefono:</label>
						<br/>
						<input class="InputCampo" type="text" style="width: 100%;" id="Teléfono" value="" />                                                
						<br/>      	                    
						<br/>
						<input class="Boton" type="button" value="Crear Nueva IPS" onclick="adicionarNuevaIPS();" />
						<input class="Boton" type="button" value="Cancelar" onclick="mostrarIPSs();"/>
					</div>
				</div>
					
				<div id="divBuscarIPSFiltros" style="width:900px;border: 1px solid #2982C6;text-align: center;align: center;">
					<table width="100%" align="center" border="1" cellpadding="1">																	
						<tr class="Titulo1" align="center">Filtros: 
							<td class="LabelCampo" width="40%" align="left">DPTO:</td>
							<td>			                                   						                                                                             
                                <select class="InputCampo" id="FiltroCODDPTO" name="FiltroCODDPTO"  style="width: 100%;" size="1" onchange="CODDPTO_OnChange('FiltroCODDPTO','FiltroCODMPIO');">						
                                    <?php echo $departamentos_options;?>
                                </select> 
						</tr>
							<td class="LabelCampo" width="40%" align="left">MPIO:</td>
							<td>					
                                <select class="InputCampo" id="FiltroCODMPIO" name="FiltroCODMPIO" style="width: 100%;" size="1">
                                </select>                            
						</tr>
						<tr>
							<td class="LabelCampo" width="40%" align="left">Escenario:</td>
							<td>
								<input class="InputCampo" type="text" id="FiltroIdTipoEscenario" value=""  style="width:100%;"/>
 						</tr>
							<td class="LabelCampo" width="40%" align="left">Código:</td>
							<td>                                   											                     
								<input class="InputCampo" type="text" id="FiltroCodigoPrestador" value=""  style="width:100%;" />
							</td>
 						</tr>
							<td class="LabelCampo" width="40%" align="left">Prestador:</td>
							<td>                               
								<input class="InputCampo" type="text" id="FiltroPrestador" value="" style="width:100%;" />                                                              												
							</td>
						</tr>
					</table>	
					<table width="100%" align="center" border="1" cellpadding="1">							
						<tr align="center">
							<td>
								<input class="Boton" type="button" class="Titulo1"  id="btnFiltarIPSs" name="btnFiltarIPSs"  style="width:450px;" value="Mostrar/Filtar" onclick="btnFiltarIPSs_OnClick();"/>	
							</td>
						</tr>					
					</table>							
				</div>
								              
				<div id="datosIPSs">
					<div id="datosIPSsContenido" style="height:500px;width:900px;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
					</div>
				</div>				
					
			</td>
		</tr>
		
		<tr align="center">
			<td>			
                <input class="Boton" id="btnCrearNuevaIPS" type="button" name="btnCrearNuevaIPS" value="Crear Nueva IPS" style="width:650px;" onclick = "mostrarAdicionarNuevaIPS();" />
				<input class="Boton" id="btnGuardarIPSs" type="button" name="btnGuardarIPSs" value="Guardar IPSs" style="width:650px;" onclick = "guardarIPSs();" />																																																											
			</td>
		</tr>
		
	</table>
	
	<input type="hidden" id="tempIdIPS" name="tempIdIPS" value=""/>  
		
	<table id="tableIPSsReferencia" name="tableIPSsReferencia" width="100%" align="center" border="0" cellpadding="2">																	
		<tr align="center">
        	<td>		
            	<label for="datosListaIPSsReferencia" class="Titulo1">Seleccionar IPSs de Referencia:</label><br/>
				<div id="datosListaIPSsReferencia" name="datosListaIPS" style="height:400px;width:900px;overflow:scroll; border: 1px solid #2982C6;text-align: center;align: center;">
				</div>
                
                <div hidden id="divAddIPSReferencia" id="divAddIPSReferencia"  style="center;align: center;">
                    <label for="ListaAddIPSsReferencia" class="Titulo1">Adicionar IPS de referencia:</label><br/>									
                    <select class="InputCampo" id="ListaAddIPSsReferencia" name="ListaAddIPSsReferencia" size="1" style="width: 700px;" onchange="ListaAddIPSsReferencia_OnChange();">										
                        <?php echo $ips_options;?>
                    </select>                  
                </div>
            </td>				
	</table>	
	                                        
				
<?php		
	     include "footer.php";
?>

    </body>
</html>
           