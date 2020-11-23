<?php
session_start();

include "../db.php";

// print_r($_POST);  
	
if (!isset($_SESSION['UsuarioID'])){
	$UsuarioID = "";
} else {
	$UsuarioID = $_SESSION['UsuarioID'];
}

if (!isset($_SESSION['IdIPSLocal'])){
	$IdIPSLocal = -1;
} else {
	$IdIPSLocal = $_SESSION['IdIPSLocal'];
}


	$sqlLista = "SELECT * FROM ips WHERE IdIPS= '$IdIPSLocal'";
	$resultLista = mysqli_query($con, $sqlLista) or die("Error ips: " . mysqli_error($con));
	$numfilas = mysqli_num_rows($resultLista);
	$rowLista = mysqli_fetch_array($resultLista);
	$NombreIPSLocal = myutf8_decode($rowLista['Prestador']);
	$IdTipoEscenarioLocal = myutf8_decode($rowLista['IdTipoEscenario']);
	
	
	$sqlLista = "SELECT * FROM tipodocident";
	$resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
	$numfilas = mysqli_num_rows($resultLista);
	$tipodocident_options = "";
	while ($rowLista = mysqli_fetch_array($resultLista)) {
		$value = $rowLista['IdTipoDocIdent'];
		$tipodocident_options .='<option value=' .$value . '>' . myutf8_decode($rowLista['TipoDocIdent']) . '</option>';			
	}   
	

mysqli_close($con);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="pragma" content="no-cache" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="../css/telestroke.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="../lib/jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="../lib/funcionesACV.js"></script>
        <script type="text/javascript" src="./lib/funcionesEscenariosConsultar.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
				btnFiltarEscenarios_OnClick();
            });
        </script>
        <title>Telestroke-Consultas Escenarios</title>        
    </head>

    <body>
      
<?php 
    include "header.php"; 
	include "../PaginaPrincipal/Encabezado.php";    
?>    
	
	<table width="100%" align="center" border="0" cellpadding="10">
		<tr align="center">
			<td>
				<form name="form_regeresar" action="../seleccion.php" method="get">
					<input class="Boton" style="width:300px;" name="boton_regresar" type="submit" value="Regresar" id="boton_regresar"/>
				</form>
			</td>
		</tr>		
		<tr align="center">
			<td class="Titulo1" >Consultar Escenarios</td>
		</tr>	
		<tr align="center">
			<td class="EscenarioTituloModulo"><?php echo $NombreIPSLocal;?></td>
		</tr>			
		
		<tr>
			<td align="center">
				<label class="LabelCampo" for="EscenarioCerrado">Pendientes / Cerrados</label><br/>													                     
				<select class="InputCampo" id="EscenarioCerrado" name="EscenarioCerrado"  style="width: 760px;" size="1" onchange="EscenarioCerrado_OnChange();">	
					<option value=0 selected>Pendientes</option>	
					<option value=1 >Cerrados</option>	
				</select> 			
			</td>
		</tr>
	</table>	
		

<?php // ************************************    Seleccionar Escenario    *************************** ?>	
		
	<table width="100%" align="center" border="0" cellpadding="2">																	
		<tr align="center"><td><label for="datosListaEscenarios" class="Titulo1">Seleccionar Escenario:</label><br/></td></tr>
		<tr align="center"><td>		
				<div id="datosListaEscenarios" name="datosListaEscenarios" style="height:350px;width:900px;overflow:scroll; border: 1px solid #2982C6;text-align: center;align: center;">
				</div></td>
		</tr>						
	</table>
				
	<input type="hidden" id="tempIdIPSLocal" name="tempIdIPSLocal" value="<?php echo $IdIPSLocal;?>"/>
	<input type="hidden" id="tempIdTipoEscenarioLocal" name="tempIdTipoEscenarioLocal" value="<?php echo $IdTipoEscenarioLocal;?>"/>															
					
	<table>
		<tr align="center">
			<td>
				<form id="form_AbrirEscenario" name="form_AbrirEscenario" action="" target="_self" method="post" onsubmit="submitformAbrirEscenario();" >                                          
					<input type="hidden" readonly id="tempIdEscenario" name="tempIdEscenario" value=""/>
																			
					<input disabled class="Boton" id="btnAbrirEscenario" name="btnAbrirEscenario" type="submit" value="Abrir Escenario"/>
				</form>						   														   					
			</td>
		</tr>										
	</table>
	
		
<?php // ************************************    FILTROS    *************************** ?>		
		
	<table width="100%" align="center" border="0" cellpadding="0">																	
		<tr align="center">
			<td>Filtros:</td>
		</tr>
	</table>	
	
	<table width="100%" align="center" border="1" cellpadding="0">
		<tr align="left">
			<td width="40%" class="LabelCampo" scope="col">Consecutivo</td>
			<td><input class="InputCampo" type="text" id="ConsecutivoAdmision" value=""  style="width:99%;" /></td>
		</tr> 	
		<tr align="left">
			<td width="40%" class="LabelCampo" scope="col"><label style="width:100%;">Documento</label></td>
			<td>								                     
				<select class="InputCampo" id="IdTipoDocIdent" name="IdTipoDocIdent"  style="width: 99%;" size="1">	
					<option value=-1 selected >Seleccionar...</option>									
					<?php echo $tipodocident_options;?>
				</select>
			</td>	
		</tr>		
		<tr align="left">
			<td width="40%" class="LabelCampo" scope="col"><label class="LabelCampo" for="NumeroDocIdentidad">Número</label></td>
			<td><input class="InputCampo" type="text" id="NumeroDocIdentidad" value=""  style="width:99%;" /></td>
		</tr> 
		<tr align="left">
			<td width="40%" class="LabelCampo" scope="col"><label class="LabelCampo" for="NumeroDocIdentidad">Número</label></td>
			<td><input class="InputCampo" type="text" id="NumeroDocIdentidad" value=""  style="width:99%;" /></td>
		</tr>
		<tr align="left">
			<td width="40%" class="LabelCampo" scope="col"><label class="LabelCampo" for="PrimerNombre">Primer Nombre</label></td>
			<td>
				<input class="InputCampo" type="text" id="PrimerNombre" value="" style="width:99%;" /></td>
		</tr>						
		<tr align="left">
			<td width="40%" class="LabelCampo" scope="col"><label class="LabelCampo" for="PrimerApellido">Primer Apellido</label></td>
			<td>	
				<input class="InputCampo" type="text" id="PrimerApellido" value=""  style="width:99%;"/></td>				
			</td>
		</tr>
	</table>			
	<table width="100%" align="center" border="0" cellpadding="4">	
		<tr align="center">
			<td>
				<input class="Boton" type="button" id="btnFiltarEscenarios" name="btnFiltarEscenarios"  style="width:460px;" value="Mostrar/Filtrar" onclick="btnFiltarEscenarios_OnClick();"/>	
			</td>
		</tr>					
	</table>	
					
<?php		
	     include "footer.php";
        ?>
    </body>
</html>
           