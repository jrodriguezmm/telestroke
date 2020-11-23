<?php 

session_start();
// print_r($_SESSION);

include "./db.php";

if (!isset($_SESSION['login'])){
	$UsuarioID = "";
} else {
	$UsuarioID = $_SESSION['login'];
}
$_SESSION['UsuarioID'] = $UsuarioID;

if (!isset($_SESSION['IdIPSLocal'])){
	$IdIPSLocal = -1;
} else {
	$IdIPSLocal = $_SESSION['IdIPSLocal'];
}
$_SESSION['IdIPSLocal'] = $IdIPSLocal;

$ipsSQL = "SELECT * FROM ipsusuarios INNER JOIN ips ON ipsusuarios.IdIPS = ips.IdIPS WHERE (ipsusuarios.UsuarioID = '$UsuarioID') ORDER BY ips.IdTipoEscenario";

$ipsResult = mysqli_query($con, $ipsSQL) or die("Error: " . mysqli_error($con));
$ipsNumRows = mysqli_num_rows($ipsResult);
$ips_options = '<option value="-1" ' .  optionSelected(-1, $IdIPSLocal)   . ' >Seleccionar...' . '</option>';
while ($row = mysqli_fetch_array($ipsResult)) {
	$value = $row['IdIPS'];
	$ips_options .="<option value='"  . $value . "' " . optionSelected($value, $IdIPSLocal) . " >" . myutf8_decode($row['IdTipoEscenario']) . ":" . myutf8_decode($row['Prestador']) . "</option>";
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
        <script type="text/javascript" src="./lib/funcionesAdminUsers.js"></script>
        <script type="text/javascript" src="./lib/funcionesAdminLecturas.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {

            });
        </script>
        <title>TelestrokeRU-Inicio</title>        
    </head>

    <body>
      
<?php 
    include "./header.php";
 
 
// CARGAR LA INTERFAZ SI ESTA AUTENTICADO

if ((isset($_SESSION['authenticated']) && ($_SESSION['authenticated'])== true)) {

	
	if ((strcmp($_SESSION['user_group'], "MEDGEN") == 0) || (strcmp($_SESSION['user_group'], "MEDURG") == 0) ) {	

?>
 	<div align="center">
<?php 
		include "./PaginaPrincipal/Encabezado.php";
?>

		<table width="100%" align="center" border="0" cellpadding="2" cellspacing="10">		
			<tr align="center">
				<td class="Titulo1"><br/>Seleccioné su entidad:<br/><br/>									
					<select class="InputCampo" id="ListaIPSs" name="ListaIPSs" size="1" style="width: 99%;" onchange="ListaIPSseleccion_OnChange();">										
						<?php echo $ips_options;?>
					</select>
				</td>
			</tr>
		</table>

		<div hidden id="divMenuEscenarios" id="divMenuEscenarios">
			<table width="800" border="0" cellpadding="2" cellspacing="20" align="center">
				<tr align="center">
					<td class="Titulo1"><br/>MENU DE CASOS DE ACV<br/></td>
				</tr>
				<tr align="center">
					<td>
						<form name="form_iniciarcaso" action="./Casos/casoscrear.php" method="get">
							<input class="Boton"  name="boton_iniciarcaso" type="submit" value="Iniciar Caso" id="boton_adminusers" style="width:650px;"/>
						</form>
					</td>
				</tr>
				<tr align="center">
					<td>
						<form name="form_escenariosconsultar" action="./Casos/escenariosconsultar.php" method="get">
							<input class="Boton"  name="boton_escenariosconsultar" type="submit" value="Consultar Escenarios" id="boton_escenariosconsultar" style="width:650px;"/>
						</form>
					</td>
				</tr>
				<tr align="center">
					<td>
						<form name="form_consultarcasos" action="./Casos/casosconsultar.php" method="get">
							<input class="Boton"  name="boton_consultarcasos" type="submit" value="Consultar Casos Loc./Ref." id="boton_consultarcasos" style="width:650px;"/>
						</form>
					</td>
				</tr>
			</table>
		<div>	
		
		</br>
					
	</div>
	<script type="text/javascript"> $(document).ready(function() {
				ListaIPSseleccion_OnChange();
            });
    </script>
			
<?php		
	}
	

	
	if (strcmp($_SESSION['user_group'], "ADMIN") == 0) {	
	
?>
 		<div align="center">
<?php 
		include "./PaginaPrincipal/Encabezado.php";
?>							

			<table width="800" border="0" cellpadding="2" cellspacing="2" align="center">
				<tr align="center">
					<td class="EscenarioTituloModulo">Menú de Admistración</td>
				</tr>
				
				<tr align="center">
					<td>
						<form name="form_adminusers" action="adminusers.php" method="get">
							<input class="Titulo1"  name="boton_adminusers" type="submit" value="Administrar Usuarios" id="boton_adminusers" style="width:99%;"/>
						</form>
					</td>
				</tr>
                
				<tr align="center">
					<td>
						<form name="form_adminips" action="adminips.php" method="get">
							<input class="Titulo1"  name="boton_adminips" type="submit" value="Administrar IPSs" id="boton_adminips" style="width:99%;"/>
						</form>
					</td>
				</tr>                
								
				<tr align="center">
					<td>
						<form name="form_adminpacientes" action="adminpacientes.php" method="get">
							<input class="Titulo1"  name="boton_adminpacientes" type="submit" value="Administrar Pacientes" id="boton_adminpacientes" style="width:99%;"/>
						</form>
					</td>
				</tr>
								
				<tr align="center">
					<td>
						<form name="form_adminTablasConfig" action="admintablasconfig.php" method="get">
							<input class="Titulo1"  name="boton_adminTablasConfig" type="submit" value="Administrar Tablas" id="boton_adminTablasConfig" style="width:99%;"/>
						</form>
					</td>
				</tr>	

				<tr align="center">
					<td>
						<form name="form_adminMatrices" action="adminmatrices.php" method="get">
							<input class="Titulo1"  name="boton_adminMatrices" type="submit" value="Administrar Matrices" id="boton_adminMatrices" style="width:99%;"/>
						</form>
					</td>
				</tr>
				
			</table>
		</div>
<?php	

	}
}	else {
            include './PaginaPrincipal/IngresarContrasenaOut.php';
      }
?>
	
<?php 
     include "./footer.php";
?>  

    </body>
</html>
