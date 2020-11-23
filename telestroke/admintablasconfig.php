<?php
session_start();	
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="pragma" content="no-cache" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="./css/telestroke.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="./lib/jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="./lib/funcionesAdminTablas.js"></script>
        <title>TelestrokeRU</title>        
    </head>

    <body>
      
<?php 
    include "header.php";
    
	include "./PaginaPrincipal/Encabezado.php";    
?>    

	<table id="cont_Administracion" width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
    	<tr align="center">
			<td>
				<form name="form_regeresar" action="seleccion.php" method="post">
					<input class="Boton" class="Boton" name="boton_regresar" type="submit" value="Regresar" id="boton_regresar" style="width:300px;"/>
				</form>
			</td>
		</tr>
	
        <tr>
            <td>
                <div class="tabWrapper">                  
                    <ul id="tabsTablasConfig" class="tabs">
                    
                        <li id="tabhEscenarios"><a href="#tabEscenarios">Escenarios</a></li>
                        <li id="tabhTipoTiempo"><a href="#tabTipoTiempo">Tipo Tiempo</a></li>
                        <li id="tabhTipoACV"><a href="#tabTipoACV">Tipo de ACV</a></li>
                        <li id="tabhTipoHemo"><a href="#tabTipoHemo">Tipo Hemorrágico</a></li>
                        <li id="tabhTipoCircIsque"><a href="#tabTipoCircIsque">Tipo Circulación</a></li>
                        <li id="tabhAnticoagulantesOrales"><a href="#tabAnticoagulantesOrales">Anticoagulantes</a></li>
                        <li id="tabhTipoDocIdent"><a href="#tabTipoDocIdent">Tipo Doc.</a></li>
                        <li id="tabhTipoUsuario"><a href="#tabTipoUsuario">Tipo Usuario</a></li>
                        <li id="tabhTipoContraRM"><a href="#tabTipoContraRM">Tipo Contra. RM</a></li>
                    </ul>
                </div>
			</td>
		</tr>
		<tr>
			<td>	
                <div class="tab_container">
				
					<input type="hidden" id="tabselected" name="tabselected" value=""/>

                    <div id="tabTipoACV" class="tabla_container" style="width:100%;">	
						<table id="tabla_tipoacv" width="100%" border="0" cellpadding="10" cellspacing="2" align="center">
								<tr align="center">
									<td>
										<div id="cuadrosPopup_tipoacv" hidden>
											<div id="datosNuevoEnTabla_tipoacv" >
												<br/>
												<br/>
												<label class="LabelCampo" for="IdTipoACV">IdTipoACV:</label>
												<br/>
												<input class="InputCampo" type="text" id="IdTipoACV" value="" />
												<br/>
												<label class="LabelCampo" for="TipoACV">Tipo ACV:</label>
												<br/>
												<input class="InputCampo" type="text" id="TipoACV" value="" />
												<br/>                     
												<br/>
												<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('tipoacv', 'IdTipoACV', 'TipoACV', $('#IdTipoACV').val(), $('#TipoACV').val());" />
												<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('tipoacv', 'IdTipoACV', 'TipoACV');"/>
											</div>
											<div id="datosEnTabla_tipoacv">
												<div id="datosEnTablaContenido_tipoacv" style="height:750px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr align="center">
									<td>						
										<input class="Boton" id="btnCrearNuevoTabla_tipoacv" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('tipoacv');" />
										<input class="Boton" id="btnGuardarTabla_tipoacv" type="button" name="btnGuardarTabla_tipoacv" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('tipoacv', 'IdTipoACV', 'TipoACV');" />																																																											
									</td>
								</tr>
						</table>												
				</div>
                    
                    <div id="tabTipoHemo" class="tabla_container" style="width:100%;">		
						<table id="tabla_tipohemo" width="100%" border="0" cellpadding="2" cellspacing="2" align="center">
								<tr align="center">
									<td>
										<div id="cuadrosPopup_tipohemo" hidden>
											<div id="datosNuevoEnTabla_tipohemo" >
												<br/>
												<br/>
												<label class="LabelCampo" for="IdTipoHemo">IdTipoHemo:</label>
												<br/>
												<input class="InputCampo" type="text" id="IdTipoHemo" value="" />
												<br/>
												<label class="LabelCampo" for="TipoHemo">Tipo Hemorrágico:</label>
												<br/>
												<input class="InputCampo" type="text" id="TipoHemo" value="" />
												<br/>                     
												<br/>
												<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('tipohemo', 'IdTipoHemo', 'TipoHemo', $('#IdTipoHemo').val(), $('#TipoHemo').val());" />
												<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('tipohemo', 'IdTipoHemo', 'TipoHemo');"/>
											</div>
											<div id="datosEnTabla_tipohemo">
												<div id="datosEnTablaContenido_tipohemo" style="height:75px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
												</div>
											</div>
										</div>
									</td>
								</tr>

								<tr align="center">
									<td>						
										<input class="Boton" id="btnCrearNuevoTabla_tipohemo" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('tipohemo');" />
										<input class="Boton" id="btnGuardarTabla_tipohemo" type="button" name="btnGuardarTabla_tipohemo" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('tipohemo', 'IdTipoHemo', 'TipoHemo');" />																																												
									</td>
								</tr>
							</table>	
						</div>                                

                    </div>
                        
                    <div id="tabTipoTiempo" class="tabla_container" style="width:100%;">	
						<table id="tabla_tipotiempo" width="100%" border="0" cellpadding="2" cellspacing="2" align="center">
								<tr align="center">
									<td>
										<div id="cuadrosPopup_tipotiempo" hidden>
											<div id="datosNuevoEnTabla_tipotiempo" >
												<br/>
												<br/>
												<label class="LabelCampo" for="idtipotiempo">idtipotiempo:</label>
												<br/>
												<input class="InputCampo" type="text" id="idtipotiempo" value="" />
												<br/>
												<label class="LabelCampo" for="tipotiempo">tipo tiempo:</label>
												<br/>
												<input class="InputCampo" type="text" id="tipotiempo" value="" />
												<br/>                     
												<br/>
												<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('tipotiempo', 'idtipotiempo', 'tipotiempo', $('#tipotiempo').val(), $('#tipotiempo').val());" />
												<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('tipotiempo', 'idtipotiempo', 'tipotiempo');"/>
											</div>
											<div id="datosEnTabla_tipotiempo">
												<div id="datosEnTablaContenido_tipotiempo" style="height:750px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr align="center">
									<td>						
										<input class="Boton" id="btnCrearNuevoTabla_tipocontraisque" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('tipotiempo');" />
										<input class="Boton" id="btnGuardarTabla_tipocontraisque" type="button" name="btnGuardarTabla_tipocontraisque" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('tipotiempo', 'idtipotiempo', 'tipotiempo');" />																													
									</td>
								</tr>
						</table>												
					</div>
                        
                    <div id="tabTipoCircIsque" class="tabla_container" style="width:100%;">	
						<table id="tabla_tipocircisque" width="100%" border="0" cellpadding="2" cellspacing="2" align="center">
								<tr align="center">
									<td>
										<div id="cuadrosPopup_tipocircisque" hidden>
											<div id="datosNuevoEnTabla_tipocircisque" >
												<br/>
												<br/>
												<label class="LabelCampo" for="IdTipoCircIsque">IdTipoCircIsque:</label>
												<br/>
												<input class="InputCampo" type="text" id="IdTipoCircIsque" value="" />
												<br/>
												<label class="LabelCampo" for="TipoCircIsque">TipoCircIsque:</label>
												<br/>
												<input class="InputCampo" type="text" id="TipoCircIsque" value="" />
												<br/>                     
												<br/>
												<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('tipocircisque', 'IdTipoCircIsque', 'TipoCircIsque', $('#IdTipoCircIsque').val(), $('#TipoCircIsque').val());" />
												<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('tipocircisque', 'IdTipoCircIsque', 'TipoCircIsque');"/>
											</div>
											<div id="datosEnTabla_tipocircisque">
												<div id="datosEnTablaContenido_tipocircisque" style="height:750px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr align="center">
									<td>						
										<input class="Boton" id="btnCrearNuevoTabla_tipocircisque" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('tipocircisque');" />
										<input class="Boton" id="btnGuardarTabla_tipocircisque" type="button" name="btnGuardarTabla_tipocircisque" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('tipocircisque', 'IdTipoCircIsque', 'TipoCircIsque');" />														
									</td>
								</tr>
						</table>												
					</div>
						
					<div id="tabEscenarios" class="tabla_container" style="width:100%;">	
						<table id="tabla_tipoescenario" width="100%" border="0" cellpadding="2" cellspacing="2" align="center">
								<tr align="center">
									<td>
										<div id="cuadrosPopup_tipoescenario" hidden>
											<div id="datosNuevoEnTabla_tipoescenario" >
												<br/>
												<br/>
												<label class="LabelCampo" for="IdTipoEscenario">IdTipoEscenario:</label>
												<br/>
												<input class="InputCampo" type="text" id="IdTipoEscenario" value="" />
												<br/>
												<label class="LabelCampo" for="TipoACV">Tipo escenario:</label>
												<br/>
												<input class="InputCampo" type="text" id="TipoEscenario" value="" />
												<br/>                     
												<br/>
												<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('tipoescenario', 'IdTipoEscenario', 'TipoEscenario', $('#IdTipoEscenario').val(), $('#TipoEscenario').val());" />
												<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('tipoescenario', 'IdTipoEscenario', 'TipoEscenario');"/>
											</div>
											<div id="datosEnTabla_tipoescenario">
												<div id="datosEnTablaContenido_tipoescenario" style="height:750px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr align="center">
									<td>						
										<input class="Boton" id="btnCrearNuevoTabla_tipoescenario" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('tipoescenario');" />
										<input class="Boton" id="btnGuardarTabla_tipoescenario" type="button" name="btnGuardarTabla_tipoescenario" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('tipoescenario', 'IdTipoEscenario', 'TipoEscenario');" />														
									</td>
								</tr>
						</table>												
					</div>	
						
						
					<div id="tabAnticoagulantesOrales" class="tabla_container" style="width:100%;">	
						<table id="tabla_anticoagulantesorales" width="100%" border="0" cellpadding="2" cellspacing="2" align="center">
								<tr align="center">
									<td>
										<div id="cuadrosPopup_anticoagulantesorales" hidden>
											<div id="datosNuevoEnTabla_anticoagulantesorales" >
												<br/>
												<br/>
												<label class="LabelCampo" for="IdAnticoagulanteOral">IdAnticoagulanteOral:</label>
												<br/>
												<input class="InputCampo" type="text" id="IdAnticoagulanteOral" value="" />
												<br/>
												<label class="LabelCampo" for="AnticoagulanteOral">Anticoagulante Oral:</label>
												<br/>
												<input class="InputCampo" type="text" id="AnticoagulanteOral" value="" />
												<br/>                     
												<br/>
												<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('anticoagulantesorales', 'IdAnticoagulanteOral', 'AnticoagulanteOral', $('#IdAnticoagulanteOral').val(), $('#AnticoagulanteOral').val());" />
												<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('anticoagulantesorales', 'IdAnticoagulanteOral', 'AnticoagulanteOral');"/>
											</div>
											<div id="datosEnTabla_anticoagulantesorales">
												<div id="datosEnTablaContenido_anticoagulantesorales" style="height:750px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr align="center">
									<td>						
										<input class="Boton" id="btnCrearNuevoTabla_anticoagulantesorales" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('anticoagulantesorales');" />
										<input class="Boton" id="btnGuardarTabla_anticoagulantesorales" type="button" name="btnGuardarTabla_anticoagulantesorales" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('anticoagulantesorales', 'IdAnticoagulanteOral', 'AnticoagulanteOral');" />														
									</td>
								</tr>
						</table>												
					</div>	
						
						
					<div id="tabTipoDocIdent" class="tabla_container" style="width:100%;">	
						<table id="tabla_tipodocident" width="100%" border="0" cellpadding="2" cellspacing="2" align="center">
								<tr align="center">
									<td>
										<div id="cuadrosPopup_tipodocident" hidden>
											<div id="datosNuevoEnTabla_tipodocident" >
												<br/>
												<br/>
												<label class="LabelCampo" for="IdTipoDocIdent">IdTipoDocIdent:</label>
												<br/>
												<input class="InputCampo" type="text" id="IdTipoDocIdent" value="" />
												<br/>
												<label class="LabelCampo" for="TipoDocIdent">TipoDocIdent:</label>
												<br/>
												<input class="InputCampo" type="text" id="TipoDocIdent" value="" />
												<br/>                     
												<br/>
												<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('tipodocident', 'IdTipoDocIdent', 'TipoDocIdent', $('#IdTipoDocIdent').val(), $('#TipoDocIdent').val());" />
												<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('tipodocident', 'IdTipoDocIdent', 'TipoDocIdent');"/>
											</div>
											<div id="datosEnTabla_tipodocident">
												<div id="datosEnTablaContenido_tipodocident" style="height:750px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr align="center">
									<td>						
										<input class="Boton" id="btnCrearNuevoTabla_tipodocident" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('tipodocident');" />
										<input class="Boton" id="btnGuardarTabla_tipodocident" type="button" name="btnGuardarTabla_tipodocident" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('tipodocident', 'IdTipoDocIdent', 'TipoDocIdent');" />														
									</td>
								</tr>
						</table>												
					</div>																

					<div id="tabTipoUsuario" class="tabla_container" style="width:100%;">	
						<table id="tabla_tipousuario" width="100%" border="0" cellpadding="2" cellspacing="2" align="center">
								<tr align="center">
									<td>
										<div id="cuadrosPopup_tipousuario" hidden>
											<div id="datosNuevoEnTabla_tipousuario" >
												<br/>
												<br/>
												<label class="LabelCampo" for="IdUsuarioTipo">IdUsuarioTipo:</label>
												<br/>
												<input class="InputCampo" type="text" id="IdUsuarioTipo" value="" />
												<br/>
												<label class="LabelCampo" for="UsuarioTipo">UsuarioTipo:</label>
												<br/>
												<input class="InputCampo" type="text" id="UsuarioTipo" value="" />
												<br/>                     
												<br/>
												<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('tipousuario', 'IdUsuarioTipo', 'UsuarioTipo', $('#IdUsuarioTipo').val(), $('#UsuarioTipo').val());" />
												<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('tipousuario', 'IdUsuarioTipo', 'UsuarioTipo');"/>
											</div>
											<div id="datosEnTabla_tipousuario">
												<div id="datosEnTablaContenido_tipousuario" style="height:750px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr align="center">
									<td>						
										<input class="Boton" id="btnCrearNuevoTabla_tipousuario" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('tipousuario');" />
										<input class="Boton" id="btnGuardarTabla_tipousuario" type="button" name="btnGuardarTabla_tipousuario" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('tipousuario', 'IdUsuarioTipo', 'UsuarioTipo');" />														
									</td>
								</tr>
						</table>												
					</div>
						
					<div id="tabTipoContraRM" class="tabla_container" style="width:100%;">	
							<table id="tabla_tipormcontras" width="100%" border="0" cellpadding="2" cellspacing="2" align="center">
									<tr align="center">
										<td>
											<div id="cuadrosPopup_tipormcontras" hidden>
												<div id="datosNuevoEnTabla_tipormcontras" >
													<br/>
													<br/>
													<label class="LabelCampo" for="IdRMcontraindicacion">IdRMcontraindicacion:</label>
													<br/>
													<input class="InputCampo" type="text" id="IdRMcontraindicacion" value="" />
													<br/>
													<label class="LabelCampo" for="RMcontraindicacion">Contraindicación:</label>
													<br/>
													<input class="InputCampo" type="text" id="RMcontraindicacion" value="" />
													<br/>                     
													<br/>
													<input class="Boton" type="button" value="Adicionar" onclick="adicionarNuevoEnTabla('tipormcontras', 'IdRMcontraindicacion', 'RMcontraindicacion', $('#IdRMcontraindicacion').val(), $('#RMcontraindicacion').val());" />
													<input class="Boton" type="button" value="Cancelar" onclick="mostrarDeTabla('tipormcontras', 'IdRMcontraindicacion', 'RMcontraindicacion');"/>
												</div>
												<div id="datosEnTabla_tipormcontras">
													<div id="datosEnTablaContenido_tipormcontras" style="height:750px;width:100%;overflow:scroll; border: 2px solid #2982C6;text-align: center;align: center;">
													</div>
												</div>
											</div>
										</td>
									</tr>
									<tr align="center">
										<td>						
											<input class="Boton" id="btnCrearNuevoTabla_tipormcontras" type="button" name="btnCrearNuevoTabla" value="Crear nuevo" style="width:500px;" onclick = "mostrarAdicionarNuevoEnTabla('tipormcontras');" />
											<input class="Boton" id="btnGuardarTabla_tipormcontras" type="button" name="btnGuardarTabla_tipormcontras" value="Guardar tabla" style="width:500px;" onclick = "guardarEnTabla('tipormcontras', 'IdRMcontraindicacion', 'RMcontraindicacion');" />														
										</td>
									</tr>
							</table>												
					</div>								

						
                </div>
            </td>
        </tr>
    </table>
			
<?php		
     include "footer.php";
?>
    </body>
</html>
           