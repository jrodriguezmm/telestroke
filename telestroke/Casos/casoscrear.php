<?php
session_start();

include "../db.php";

// print_r($_SESSION);  
	
if (!isset($_SESSION['UsuarioID'])){
	$UsuarioID = "";
} else {
	$UsuarioID = $_SESSION['UsuarioID'];
}

if (!isset($_SESSION['IdIPSLocal'])){
	$tempIdIPSCaso = -1;
} else {
	$tempIdIPSCaso = $_SESSION['IdIPSLocal'];
}


$sqlLista = "SELECT * FROM ips WHERE IdIPS= '$tempIdIPSCaso'";
$resultLista = mysqli_query($con, $sqlLista) or die("Error ips: " . mysqli_error($con));
$numfilas = mysqli_num_rows($resultLista);
$rowLista = mysqli_fetch_array($resultLista);

$tempIdTipoEscenario = myutf8_decode($rowLista['IdTipoEscenario']);
$tempNombreIPSLocal = myutf8_decode($rowLista['Prestador']);


$ipsSQL = "SELECT * FROM ipsusuarios INNER JOIN ips ON ipsusuarios.IdIPS = ips.IdIPS WHERE (ipsusuarios.UsuarioID = '$UsuarioID') ORDER BY ips.IdTipoEscenario";

$ipsResult = mysqli_query($con, $ipsSQL) or die("Error: " . mysqli_error($con));
$ipsNumRows = mysqli_num_rows($ipsResult);
$ips_options = "";
while ($row = mysqli_fetch_array($ipsResult)) {
	$value = $row['IdIPS'];
	$ips_options .="<option value="  . $value . ">" . myutf8_decode($row['IdTipoEscenario']) . "-" . myutf8_decode($row['Prestador']) . "</option>";
}			


$sqlLista = "SELECT * FROM tipodocident";
$resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
$numfilas = mysqli_num_rows($resultLista);
$tipodocident_options = "";
while ($rowLista = mysqli_fetch_array($resultLista)) {
	$value = $rowLista['IdTipoDocIdent'];
	$tipodocident_options .='<option value=' .$value . '>' . myutf8_decode($rowLista['TipoDocIdent']) . '</option>';			
}   


$sqlLista = "SELECT * FROM departamentos ORDER BY DPTO";
$resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
$numfilas = mysqli_num_rows($resultLista);
$departamentos_options = "";
while ($rowLista = mysqli_fetch_array($resultLista)) {
	$value = $rowLista['CODDPTO'];
	$departamentos_options .='<option value=' .$value . '>' . myutf8_decode($rowLista['DPTO']) . '</option>';			
}   
	
mysqli_close($con);
							
?>	
											

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="pragma" content="no-cache"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <link href="../css/telestroke.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="../lib/jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="../lib/funcionesACV.js"></script>
        <script type="text/javascript" src="./lib/funcionesCasosCrear.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
				form_Current_IniciarCaso();
            });
        </script>
        <title>Telestroke-Crear</title>        
    </head>	

    <body>
      
<?php 
    include "header.php";
	include "../PaginaPrincipal/Encabezado.php";    
?>  

	<table width="100%" align="center" border="1" cellpadding="10" cellspacing="0">
		<tr align="center">
			<td>
				<form name="form_regeresar" action="../seleccion.php" method="get">
					<input class="Boton" style="width:300px;" name="boton_regresar" type="submit" value="Regresar" id="boton_regresar"/>
				</form>
			</td>
		</tr>
			
		<tr align="center">
			<td class="Titulo1">Iniciar Caso</td>
		</tr>
		<tr align="center">
			<td class="EscenarioTituloModulo"><?php echo $tempNombreIPSLocal;?></td>
		</tr>	
	</table>
	
	<table width="100%" align="center" border="1" cellpadding="2" cellspacing="0">
		<tr align="left">
			<td width="40%" class="LabelCampo">Inicio Caso</td>
			<td ><input class="InputCampo" type="text" disabled id="FechaHoraInicioCaso" name="FechaHoraInicioCaso" value=""/></td>
		</tr>
		<tr>
			<td class="LabelCampo">Terminado</td>
			<td ><input class="InputCampo" disabled type="text" id="Terminado" name="Terminado" value=""/></td>
		</tr>
		<tr>
			<td class="LabelCampo">IdCaso</td>
			<td ><input class="InputCampo" disabled type="text" id="IdCaso" name="IdCaso" value=""/></td>
		</tr>
	</table>	

<?php // ************************************    Paciente seleccionado    *************************** ?>	

	<table width="100%" align="center" border="0" cellpadding="10" cellspacing="0">
		<tr align="center">
			<td class="Titulo1" border="0">Paciente seleccionado</td>
		</tr>
	</table>

	<div style="height:250px;width:1000px;overflow:scroll; border: 1px solid #2982C6;text-align: center;align: center;">
		<table width="100%" align="center" border="1" cellpadding="1" cellspacing="0">
			<thead class="mith">
				<tr>
					<th width="500px" >Primer Nombre</th>
					<th>Segundo Nombre</th>
					<th>Primer Apellido </th>
					<th>Segundo Apellido </th>
					<th>Doc. Ident.</th>
					<th>Número Doc.</th>
					<th>Sexo</th>
				</tr>
			</thead>   
			<tbody>
				<tr>
					<td><input class="CampoNoEditableTabla" type="text" readonly id="SelPrimerNombre" style="width:340px;" value="" /></td>
					<td><input class="CampoNoEditableTabla" type="text" readonly id="SelSegundoNombre" style="width:340px;" value="" /></td>		
					<td><input class="CampoNoEditableTabla" type="text" readonly id="SelPrimerApellido" style="width:340px;" value="" /></td>
					<td><input class="CampoNoEditableTabla" type="text" readonly id="SelSegundoApellido" style="width:340px;" value="" /></td>
					<td><input class="CampoNoEditableTabla" type="text" readonly id="SelIdTipoDocIdent" style="width:60px" value="" /></td>              
					<td><input class="CampoNoEditableTabla" type="text" readonly id="SelNumeroDocIdentidad" style="width:350px;" value="" /></td> 	
					<td><input class="CampoNoEditableTabla" type="text" readonly id="SelSexo" style="width:30px;" value="" /></td>
				</tr>    
			</tbody>
		</table>
	</div>

	<table id="tableBtnAbrirSeleccionPaciente" name="tableBtnAbrirSeleccionPaciente" width="100%" align="center" border="0" cellpadding="4">	
		<tr align="center">
			<td>
				<input class="Boton" type="button" id="btnAbrirSeleccionPaciente" name="btnAbrirSeleccionPaciente"  style="width:760px;" value="Abrir selección paciente" onclick="btnAbrirSeleccionPaciente_OnClick();"/>	
			</td>
		</tr>					
	</table>
		
			
	
<?php // ************************************    Seleccion de Paciente del CASO    *************************** ?>	

	
	<div hidden id="divSeleccionPaciente" name="divSeleccionPaciente" style="width:100%; align: center;"> 	
		
	<?php // ************************************    Lista Pacientes    *************************** ?>	
	
		<table width="100%" align="center" border="0" cellpadding="2">																	
			<tr align="center"><td><label for="divBuscarPacienteLista" class="Titulo1">Lista de pacientes:</label><br/></td></tr>
			<tr align="center"><td>		
					<div id="divListaPacientes" name="divListaPacientes" style="height:350px;width:1000px;overflow:scroll; border: 1px solid #2982C6;text-align: center;align: center;">
					</div></td>
			</tr>						
		</table>
			
				
	<?php // ************************************    BUSCAR/FILTAR Pacientes    *************************** ?>				
	
	
	
		<div id="divBuscarPacienteFiltrosYlista" name="divBuscarPacienteFiltrosYlista" style="width:100%; align: center;">
		
			<table width="100%" align="center" border="0" cellpadding="4">	
				<tr align="center">
					<td>
						<input class="Boton" type="button" id="btnFiltarPacientes" name="btnFiltarPacientes"  style="width:460px;" value="Mostrar/Filtar" onclick="btnFiltarPacientes_OnClick();"/>	
					</td>
				</tr>					
			</table>	
			<table width="100%" align="center" border="1" cellpadding="0">																	
				<tr align="left">
				
					<td width="40%" class="LabelCampo" scope="col"><label style="width:100%;">Tipo Documento</label></td>
					<td>								                     
						<select class="InputCampo" id="FiltroIdTipoDocIdent" name="FiltroIdTipoDocIdent"  style="width: 99%;" size="1">	
							<option value=-1 selected >Seleccionar...</option>									
							<?php echo $tipodocident_options;?>
						</select>
					</td>
					<tr align="left">
						<td width="40%" class="LabelCampo" scope="col"><label class="LabelCampo" for="FiltroNumeroDocIdentidad">Número</label></td>
						<td><input class="InputCampo" type="text" id="FiltroNumeroDocIdentidad" value=""  style="width:99%;" /></td>
					</tr>
					<tr align="left">
						<td width="40%" class="LabelCampo" scope="col"><label class="LabelCampo" for="FiltroPrimerNombre">Primer Nombre</label></td>
						<td>
							<input class="InputCampo" type="text" id="FiltroPrimerNombre" value="" style="width:99%;" /></td>
					</tr>						
					<tr align="left">
						<td width="40%" class="LabelCampo" scope="col"><label class="LabelCampo" for="FiltroPrimerApellido">Primer Apellido</label></td>
						<td>	
							<input class="InputCampo" type="text" id="FiltroPrimerApellido" value=""  style="width:99%;"/></td>				
						</td>
					</tr>														
			</table>
			
			<br/>
		</div>										
	
	<?php // ************************************    Seleccionar/Crear/Limpiar Paciente    *************************** ?>	
		
		<table  width="99%" align="center" border="0" cellpadding="4">
			<tr align="center">
				<td><input class="Boton" id="btnSeleccionarPaciente" type="button" name="btnSeleccionarPaciente" value="Seleccionar y continuar" style="width:680px;" onclick = "btnSeleccionarPaciente_OnClick();" /></td>																																																										
			</tr>
			<tr align="center">	
				<td><input class="Boton" id="btnLimpiarSelPaciente" type="button" name="btnLimpiarSelPaciente" value="Limpiar selección" style="width:680px;" onclick = "btnLimpiarSelPaciente_OnClick();" /></td>																																																									
			</tr>				
			<tr align="center">
				<td><input class="Boton" id="btnCrearNuevoPaciente" type="button" name="btnCrearNuevoPaciente" value="Crear Nuevo Paciente" style="width:680px;" onclick = "mostrarAdicionarNuevoPaciente();" /></td>
			</tr>
		</table>
		
	
	<?php // ************************************    Crear Nuevo Paciente     *************************** ?>
			
		<div hidden id="divCrearNuevoPaciente" name="divCrearNuevoPaciente" style="width:98%; align: center;">
	
			<table  class="Titulo1" width="100%" align="center" border="0" cellpadding="4">Crear nuevo paciente		
				<tr align="left" style="width:99%;">
					<td class="LabelCampo">																															
						Primer Nombre:<br/>
						<input class="InputCampo" type="text" id="NewPrimerNombre" name="NewPrimerNombre" value="" style="width:95%;" /><br/>
						Segundo Nombre:<br/>
						<input class="InputCampo" type="text" id="NewSegundoNombre" name="NewSegundoNombre" value="" style="width:95%;" /><br/>
						<br/>
						Primer Apellido:<br/>
						<input class="InputCampo" type="text" id="NewPrimerApellido" name="NewPrimerApellido"  value=""  style="width:95%;"/><br/>
						Segundo Apellido:<br/>
						<input class="InputCampo" type="text" id="NewSegundoApellido" name="NewSegundoApellido" value=""  style="width:95%;" /><br/>
						<br/>
						Documento:<br/>													                     
							<select class="InputCampo" id="NewIdTipoDocIdent" name="NewIdTipoDocIdent"  style="width: 95%;" size="1">	
								<option value=-1 disabled selected >Seleccionar...</option>							
								<?php echo $tipodocident_options;?>
							</select> <br/>						
						Número Doc.:<br/>
						<input class="InputCampo" type="text" id="NewNumeroDocIdentidad" name="NewNumeroDocIdentidad" value="" style="width:95%;" /><br/>
						<br/>
						Sexo:<br/>
							<select class="InputCampo" id="NewSexo" name="NewSexo"  style="width: 95%;" size="1">	
								<option value=-1 disabled selected >Seleccionar...</option>							
								<option value='M'>Masculino</option>							
								<option value='F'>Femenino</option>							
							</select><br/>												
						Fecha de Nacimiento:<br/>
						<input class="InputCampo" type="date" id="NewFechaNacimiento" id="NewFechaNacimiento" value="" size="3" style="height=200px; width:95%;" /><br/>
						<br/>
						DPTO Nacimiento:<br/>
							<select class="InputCampo" id="NewCODDPTONacimiento" name="NewCODDPTONacimiento"  style="width: 95%;" size="1" onchange="CODDPTO_OnChange('NewCODDPTONacimiento','NewCODMPIONacimiento')">	
								<option value=-1 disabled selected >Seleccionar...</option>							
								<?php echo $departamentos_options;?>
							</select><br/> 						
						MPIO Nacimiento:<br/>
							<select class="InputCampo" id="NewCODMPIONacimiento" name="NewCODMPIONacimiento" style="width: 95%;" size="1">	
							</select><br/> 
						<br/>
						DPTO Residencia:<br/>						 
							<select class="InputCampo" id="NewCODDPTOResidencia" name="NewCODDPTOResidencia"  style="width: 95%;" size="1" onchange="CODDPTO_OnChange('NewCODDPTOResidencia','NewCODMPIOResidencia')">	
								<option value=-1 disabled selected >Seleccionar...</option>							
								<?php echo $departamentos_options;?>
							</select><br/> 						
						MPIO Residencia:<br/>						
							<select class="InputCampo" id="NewCODMPIOResidencia" name="NewCODMPIOResidencia"  style="width: 95%;" size="1">	
							</select><br/>					
						<br/>
						Dirección Residencia:<br/>
						<input class="InputCampo" type="text" id="NewDireccionResidencia" value=""  style="width:95%;" /><br/>
						Teléfono Residencia:<br/>
						<input class="InputCampo" type="text" id="NewTelefonoResidencia" value=""  style="width:95%;" /><br/>
						Teléfono Celular:<br/>
						<input class="InputCampo" type="text" id="NewTelefonoCelular" value=""  style="width:95%;" /><br/>
						<br/>
						Aseguradora:<br/>
						<input class="InputCampo" type="text" id="NewAseguradora" value=""  style="width:95%;" /><br/>
					</td>
				</tr>
				<tr align="center" style="width:100%;">
					<td><input class="Boton" type="button" value="Adicionar Nuevo Paciente" onclick="adicionarNuevoPaciente();" /></td>
				</tr>
				<tr align="center" style="width:100%;">
					<td><input class="Boton" type="button" value="Cancelar" onclick="cancelarNuevoPaciente();"/></td>
				</tr>
			</table>	
		</div>	
	</div>


<?php // ************************************    Crear Caso General     *************************** ?>
		
<div hidden id="divCrearCasoGeneral" name="divCrearCasoGeneral">		
	<table  width="100%" align="center" border="0" cellpadding="2">
		<tr align="center">
			<td>				
				<input class="Boton" style="width:650px;" id="btnCrearCasoGeneral" name="btnCrearCasoGeneral" type="submit" value="Crear Caso General" onclick="crearCasoGeneral()"/>
			</td>
		</tr>
	</table>
</div>	

<div hidden id="divCrearEscenario" name="divCrearEscenario">

	<table width="100%" align="center" border="1" cellpadding="4" cellspacing="0">
		<tr align="left">
			<td width="40%" class="LabelCampo" scope="col">Inicio Escenario:</td>
			<td><input class="InputCampo" type="text" disabled id="FechaHoraInicioEscenario" name="FechaHoraInicioEscenario" value=""/></td>
		</tr>
		<tr align="left">	
			<td width="40%" class="LabelCampo" scope="col">Consecutivo:</td>
			<td><input class="InputCampo" type="text" disabled id="ConsecutivoAdmision" name="ConsecutivoAdmision" value=""/></td>
		</tr>
		<tr align="left">
			<td width="40%" class="LabelCampo" scope="col">IdEscenario:</td>
			<td><input class="InputCampo" disabled type="text" id="IdEscenario" name="IdEscenario" value=""/></td>
		</tr>
	</table>

	<table  width="100%" align="center" border="0" cellpadding="2" cellspacing="0">
		<tr align="center">
			<td>
				<input class="Boton" style="width:650px;" id="btnCrearEscenario" name="btnCrearEscenario" type="submit" value="Crear Escenario" onclick="btnCrearEscenario_OnClick()"/>
			</td>
		</tr>		
	</table>
</div>	

<input type="hidden" id="tempIdPaciente" name="tempIdPaciente" value=""/>                                          
<input type="hidden" id="tempUsuarioID" name="tempUsuarioID" value="<?php echo $UsuarioID;?>"/>     
<input type="hidden" id="tempIdIPSCaso" name="tempIdIPSCaso" value="<?php echo $tempIdIPSCaso;?>"/>
<input type="hidden" id="tempIdTipoEscenario" name="tempIdTipoEscenario" value="<?php echo $tempIdTipoEscenario;?>"/>

		
<div hidden id="divEditarEscenario" name="divEditarEscenario">
	<table>
		<tr align="center">
			<td>
				<form id="form_EditarEscenario" name="form_EditarEscenario" action="" target="_self" method="post" onsubmit="submitformEditarEscenario();">	
					<input type="hidden" id="tempIdCaso" name="tempIdCaso" value=""/>													
					<input type="hidden" id="tempIdEscenario" name="tempIdEscenario" value=""/>
					
					<input class="Boton" style="width:650px;" type="submit" id="btnEditarEscenario" name="btnEditarEscenario" value="Editar Escenario"/>	
				</form>						   					
			</td>
		</tr>										
	</table>
</div>
			
					
<?php		
	     include "footer.php";
?>
    </body>
</html>
           