<?php
session_start();

include "./db.php"; 
                       
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
        <link href="css/telestroke.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="./lib/jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="./lib/funcionesACV.js"></script>
        <script type="text/javascript" src="./lib/funcionesAdminPacientes.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
				mostrarPacientes();
            });
        </script>
        <title>TelestrokeRU</title>        
    </head>

    <body>
      
<?php 
    include "header.php";
    
	include "./PaginaPrincipal/Encabezado.php";    
?>    

	<table id="cont_Pacientes" width="100%" border="0" align="center" border="1" cellpadding="2" cellspacing="2">
	
		<tr align="center">
			<td>
				<form name="form_regeresar" action="seleccion.php" method="post">
					<input class="Boton" name="boton_regresar" type="submit" value="Regresar" id="boton_regresar" style="width:98%;"/>
				</form>
			</td>
		</tr>
			
		<tr align="center">
			<td class="Estilo1">Administración de Pacientes</td>
		</tr>

		<tr align="center" style="width:100%;">
			<td>
				<div hidden id="cuadrosPopup" >																										
					<div hidden id="datosNuevoPaciente" class="">
						
						<br/>
						<table  class="Titulo1" width="100%" align="center" border="0" cellpadding="4">Crear nuevo paciente		
							<tr align="left" style="width:99%;">
								<td class="LabelCampo">								
									Primer Nombre:<br/>
									<input class="InputCampo" type="text" id="PrimerNombre" value=""  style="width:98%;" />
									<br/>
									Segundo Nombre:<br/>
									<input class="InputCampo" type="text" id="SegundoNombre" value="" style="width:98%;" />
									<br/>
									Primer Apellido:<br/>
									<input class="InputCampo" type="text" id="PrimerApellido" value=""  style="width:98%;"/>
									<br/>
									Segundo Apellido:<br/>
									<input class="InputCampo" type="text" id="SegundoApellido" value=""  style="width:98%;" />
									<br/>
									Documento:<br/>													                     
										<select class="InputCampo" id="IdTipoDocIdent" name="IdTipoDocIdent"  style="width: 98%;" size="1">	
											<option value=-1 disabled selected >Seleccionar...</option>									
											<?php echo $tipodocident_options;?>
										</select> 
									<br/>
									Número:<br/>
									<input class="InputCampo" type="text" id="NumeroDocIdentidad" value=""  style="width:98%;" />
									<br/>
									Sexo:<br/>
			                        <select class="InputCampo" id="Sexo" name="Sexo"  style="width: 98%;" size="1">						
			                            <option value='-1' disabled selected >Seleccionar...</option>	
			                            <option value='M' >Masculino</option>	
			                            <option value='F' >Femenino</option>	
			                        </select> 
									<br/>
									<br/>
									Fecha Nacimiento:<br/>
									<input class="InputCampo" type="date" id="FechaNacimiento" value="" size="3" style="height=200px; width:98%;" />
			     					<br/>
									DPTO. Nacimiento:<br/>
			                        <select class="InputCampo" id="CODDPTONacimiento" name="CODDPTONacimiento"  style="width: 98%;" size="1" onchange="CODDPTO_OnChange('CODDPTONacimiento','CODMPIONacimiento');">						
			                            <?php echo $departamentos_options;?>
			                        </select> 
									<br/>
			                        MPIO. Nacimiento:<br/>	
			                        <select class="InputCampo" id="CODMPIONacimiento" name="CODMPIONacimiento" style="width: 98%;" size="1">
			                        </select>                  
									<br/>                   			                        
			     					<br/>
									DPTO. Residencia:<br/>
			                        <select class="InputCampo" id="CODDPTOResidencia" name="CODDPTOResidencia"  style="width: 98%;" size="1" onchange="CODDPTO_OnChange('CODDPTOResidencia','CODMPIOResidencia');">						
			                            <?php echo $departamentos_options;?>
			                        </select> 
									<br/>
			                        MPIO. Residencia:<br/>	
			                        <select class="InputCampo" id="CODMPIOResidencia" name="CODMPIOResidencia" style="width: 98%;" size="1">
			                        </select>                  
									<br/>                             
			  						Dirección Residencia:<br/>
									<input class="InputCampo" type="text" id="DireccionResidencia" value=""  style="width:98%;" />
									<br/>	   
									Teléfono Residencia:<br/>
									<input class="InputCampo" type="text" id="TelefonoResidencia" value=""  style="width:98%;" />
									<br/>													
									Teléfono Celular:<br/>
									<input class="InputCampo" type="text" id="TelefonoCelular" value=""  style="width:98%;" />
									<br/>							
									Aseguradora:<br/>
									<input class="InputCampo" type="text" id="Aseguradora" value=""  style="width:98%;" />
								</td>
							</tr>
						</table>	
																				                    
						<br/>
						<input class="Boton" type="button" value="Crear Nuevo Paciente" onclick="adicionarNuevoPaciente();" />
						<br/>
						<input class="Boton" type="button" value="Cancelar" onclick="mostrarPacientes();"/>

					</div>
              </div>
			</td>
		</tr>
        
        <tr>
        	<td>
                <div id="divBuscarPacienteFiltros">
                    <table width="100%" align="center" border="1" cellpadding="1">																	
                        <tr align="left">Filtros:
                            <td class="LabelCampo" width="40%" align="left">Tipo Documento:</td>													                     
                            <td><select class="InputCampo" id="FiltroIdTipoDocIdent" name="FiltroIdTipoDocIdent"  style="width:100%;" size="1">	
                                        <option value=-1 selected >Seleccionar...</option>									
                                        <?php echo $tipodocident_options;?>
                                </select> 
							</td>
						</tr>
						<tr align="left">
                            <td class="LabelCampo" width="40%" align="left">Número Doc.:</td>													                     
                            <td><input class="InputCampo" type="text" id="FiltroNumeroDocIdentidad" value=""  style="width:100%;" /></td>
						</tr>
						<tr align="left">
						    <td class="LabelCampo" width="40%" align="left">P. Nombre:</td>
                            <td><input class="InputCampo" type="text" id="FiltroPrimerNombre" value="" style="width:100%;" /></td>
       					</tr>
						<tr align="left">
						    <td class="LabelCampo" width="40%" align="left">P. Apellido:</td>
                            <td><input class="InputCampo" type="text" id="FiltroPrimerApellido" value=""  style="width:100%;"/></td>
                        </tr>	
					</table>	
					<table width="100%" align="center" border="1" cellpadding="1">							
                        <tr align="center">
                            <td>
                                <input class="Boton" type="button" class="Estilo1"  id="btnFiltarPacientes" name="btnFiltarPacientes"  style="width:450px;" value="Mostrar/Filtar" onclick="btnFiltarPacientes_OnClick();"/>	
                            </td>
                        </tr>					
                    </table>							
                </div> 
               </td>
           </tr>

			<tr>
            	<td align="center">            
                    <div id="datosPacientesContenido" style="height:600px;width:900px;overflow:scroll; border: 2px solid #2982C6;text-align:center;align:center;">
                    </div>
				</td>
			</tr>
	</table>
        
	<table width="100%" align="center" border="0" cellpadding="1">																	
		<tr align="center">
			<td><input class="Boton" id="btnCrearNuevoPaciente" type="button" name="btnCrearNuevoPaciente" value="Crear Nuevo Paciente" style="width:760px;" onclick = "mostrarAdicionarNuevoPaciente();" /></td>
		</tr>
		<tr align="center">
			<td><input class="Boton" id="btnGuardarPacientes" type="button" name="btnGuardarPacientes" value="Guardar pacientes" style="width:760px;" onclick = "guardarPacientes();" /></td>
		</tr>
	</table>			
<?php		
	     include "footer.php";
?>
    </body>
</html>
           