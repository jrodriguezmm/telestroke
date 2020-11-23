<?php
session_start();

include "./db.php";

$sqlLista = "SELECT * FROM tipodocident";
$resultLista = mysqli_query($con, $sqlLista) or die("Error tipodocident: " . mysqli_error($con));
$numfilas = mysqli_num_rows($resultLista);
$tipodocident_options = "";
while ($rowLista = mysqli_fetch_array($resultLista)) {
	$value = $rowLista['IdTipoDocIdent'];
	$tipodocident_options .='<option value=' .$value . '>' . myutf8_decode($rowLista['TipoDocIdent']) . '</option>';			
}   


$sqlLista = "SELECT * FROM tipousuario";
$resultLista = mysqli_query($con, $sqlLista) or die("Error tipousuario: " . mysqli_error($con));
$numfilas = mysqli_num_rows($resultLista);
$tipousuario_options = "";
while ($rowLista = mysqli_fetch_array($resultLista)) {
	$value = $rowLista['IdUsuarioTipo'];
	$tipousuario_options .='<option value=' .$value . '>' . myutf8_decode($rowLista['UsuarioTipo']) . '</option>';			
}  

$ipsSQL = "SELECT * FROM ips ORDER BY ips.Prestador";

$ipsResult = mysqli_query($con, $ipsSQL) or die("Error: " . mysqli_error($con));
$ipsNumRows = mysqli_num_rows($ipsResult);
$ips_options = '<option value="-1">Seleccionar...' . '</option>';
while ($row = mysqli_fetch_array($ipsResult)) {
	$value = $row['IdIPS'];
	$ips_options .="<option value='$value'>" . myutf8_decode($row['IdTipoEscenario']) . ":" . myutf8_decode($row['Prestador']) . "</option>";
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
        <script type="text/javascript" src="./lib/funcionesAdminUsers.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
				mostrarUsuarios();
            });
        </script>
        <title>TelestrokeRU</title>        
    </head>

    <body>
      
<?php 
    include "header.php";
    
	include "./PaginaPrincipal/Encabezado.php";    
?>    

	<table id="cont_Usuarios" width="100%" border="0" align="center"  cellpadding="2" cellspacing="2">
	
		<tr align="center">
			<td>
				<form name="form_regeresar" action="seleccion.php" method="post">
					<input class="Boton" name="boton_regresar" type="submit" class="Estilo1" value="Regresar" id="boton_regresar" style="width:300px;"/>
				</form>
			</td>
		</tr>
		
		<tr align="center">
			<td class="Estilo1">Administración de Usuarios</td>
		</tr>

		<tr align="center" style="height:250px;width:100%;">
			<td>
				<div id="cuadrosPopup" hidden>

					<div id="datosNuevoUsuario">
						<br/>
						<br/>
						<label class="LabelCampo" for="UsuarioID">UsuarioID:</label>
                        <br/>
						<input class="InputCampo"  style="width: 500px;" type="text" id="UsuarioID" value="" />
						<br/>						<br/>
                        <label class="LabelCampo" for="UsuarioNombre">Nombre:</label>
						<br/>
						<input class="InputCampo"  style="width: 500px;" type="text" id="UsuarioNombre" value="" />
						<br/>
						<label class="LabelCampo" for="UsuarioClave">Clave:</label>
						<br/>
						<input class="InputCampo"  style="width: 500px;" type="password" id="UsuarioClave" value="" />
						<br/>
						<label class="LabelCampo" for="UsuarioClave">Confirmar Clave:</label>
						<br/>
						<input class="InputCampo"  style="width: 500px;"  type="password" id="ConfirmarUsuarioClave" value="" />
						<br/>
						<label class="LabelCampo" for="IdUsuarioTipo">Tipo:</label>	
						<br/>											                     
							<select class="InputCampo"  style="width: 500px;" id="IdUsuarioTipo" name="IdUsuarioTipo"  style="width: 150px;" size="1">	
								<option value=-1 disabled selected >Seleccionar...</option>									
								<?php echo $tipousuario_options;?>
							</select> 						
						<br/>                    
						<label class="LabelCampo" for="PrimerNombre">Primer Nombre:</label>
						<br/>  
						<input class="InputCampo"  style="width: 500px;" type="text" id="PrimerNombre" value="" style="width:360px;" />
						<br/>  
						<label class="LabelCampo" for="SegundoNombre">Segundo Nombre:</label>
						<br/>  
						<input class="InputCampo"  style="width: 500px;" type="text" id="SegundoNombre" value="" style="width:360px;" />
						<br/>
						<label class="LabelCampo" for="PrimerApellido">Primer Apellido:</label>
						<br/>  
						<input class="InputCampo"  style="width: 500px;" type="text" id="PrimerApellido" value=""  style="width:360px;"/>
						<br/>  
						<label class="LabelCampo" for="SegundoApellido">Segundo Apellido:</label>
						<br/>  
						<input class="InputCampo"  style="width: 500px;" type="text" id="SegundoApellido" value=""  style="width:360px;" />
						<br/>
						<label class="LabelCampo" for="IdTipoDocIdent">Documento:</label>
						<br/>  													                     
							<select class="InputCampo"  style="width: 500px;" id="IdTipoDocIdent" name="IdTipoDocIdent"  style="width: 360px;" size="1">	
								<option value=-1 disabled selected >Seleccionar...</option>									
								<?php echo $tipodocident_options;?>
							</select> 
						
						<br/>
						<label for="NumeroDocIdentidad">Número:</label>
						<br/>  
						<input class="InputCampo"  style="width: 500px;" type="text" id="NumeroDocIdentidad" value=""  style="width:360px;" />
						<br/>
						<label class="LabelCampo" for="Sexo">Sexo:</label>
						<br/>  
	                        <select class="InputCampo"  style="width: 500px;" id="Sexo" name="Sexo"  style="width: 100px;" size="1">						
	                            <option value=-1 disabled selected >Seleccionar...</option>	
	                            <option value='M' >Masculino</option>	
	                            <option value='F' >Femenino</option>	
	                        </select> 
						<br/>
                        <br/>
						<input class="Boton" type="button" style="width: 650px;" value="Crear Nuevo Usuario" onclick="adicionarNuevoUsuario();" />
						<input class="Boton" type="button" style="width: 450px;" value="Cancelar" onclick="mostrarUsuarios();"/>
					</div>
				</div>
								
				<table width="100%" align="center" border="1" cellpadding="1">																	
					<tr class="Titulo1" align="center">Filtros: 
						<td class="LabelCampo" align="left">Documento:</td>
						<td>													                     
							<select class="InputCampo"  style="width: 99%;" id="FiltroIdTipoDocIdent" name="FiltroIdTipoDocIdent" size="1">	
								<option value=-1 selected >Seleccionar...</option>									
								<?php echo $tipodocident_options;?>
							</select>
						</td>
					</tr>
					<tr>	
						<td class="LabelCampo" width="40%" align="left">Número:</td>
						<td>													                     
							<input class="InputCampo"  type="text" id="FiltroNumeroDocIdentidad" value=""  style="width:99%;" />
						</td>
					<tr>	
						<td class="LabelCampo" width="40%" align="left">UsuarioID:</td>
						<td>
							<input class="InputCampo"  type="text" id="FiltroUsuarioID" value=""  style="width:99%;"/>
						</td>
					</tr>
					<tr>
						<td class="LabelCampo" width="40%" align="left">Pr. Nombre:</td>
						<td>
							<input class="InputCampo"  type="text" id="FiltroPrimerNombre" value="" style="width:99%;" />
						</td>
					<tr>
						<td class="LabelCampo" width="40%" align="left">Pr. Apellido:</td>
						<td>
							<input class="InputCampo" type="text" id="FiltroPrimerApellido" value=""  style="width:99%;"/>			
						</td>
					</tr>
				</table>	
				<table width="100%" align="center" border="1" cellpadding="1">	
					<tr align="center">
						<td>
							<input class="Boton" type="button" id="btnFiltarUsuarios" name="btnFiltarUsuarios" style="width:450px;" value="Mostrar/Filtar" onclick="btnFiltarUsuarios_OnClick();"/>	
						</td>
					</tr>					
				</table>							
								              
				<div id="datosUsuarios">
					<div id="datosUsuariosContenido" style="height:500px;width:900px;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
					</div>
				</div>				
					
			</td>
		</tr>
		
		<tr align="center">
			<td>			
                <input class="Boton" id="btnCrearNuevoUsuario" type="button" name="btnCrearNuevoUsuario" value="Crear Nuevo Usuario" style="width:650px;" onclick = "mostrarAdicionarNuevoUsuario();" />
				<br/>
				<input class="Boton" id="btnGuardarUsuarios" type="button" name="btnGuardarUsuarios" value="Guardar usuarios" style="width:650px;" onclick = "guardarUsuarios();" />																																																											
			</td>
		</tr>
		
	</table>
	
	<input type="hidden" id="tempUsuarioID" name="tempUsuarioID" value=""/>  
		
	<table id="tableListaIPS" name="tableListaIPS" width="100%" align="center" border="0" cellpadding="2">																	
		<tr align="center">
        	<td>		
            	<label for="datosListaIPS" class="Estilo1">IPSs del usuario:</label><br/>
				<div id="datosListaIPS" name="datosListaIPS" style="height:400px;width:900px;overflow:scroll; border: 1px solid #2982C6;text-align: center;align: center;">
				</div>
                
                <div hidden id="divAddIPAUsuario" id="divAddIPAUsuario"  style="center;align: center;">
                    <label for="ListaIPSs" class="Estilo1">Adicionar IPS al usuario:</label><br/>									
                    <select class="InputCampo"  style="width: 500px;" id="ListaAddIPAUsuario" name="ListaAddIPAUsuario" size="1" style="width: 700px;" onchange="ListaAddIPAUsuario_OnChange();">										
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
           