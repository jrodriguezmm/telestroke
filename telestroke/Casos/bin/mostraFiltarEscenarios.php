<?php
// *** Validate request to login to this site.
//**** Archivo: mostraFiltarEscenarios.php
session_start();

include "../../db.php";
include "../../cripto.php";

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);

// print_r($_POST);  

$IdIPSLocal = ($_POST['IdIPSLocal']);		
$IdTipoEscenario = ($_POST['IdTipoEscenario']);			
$hayfiltro = ($_POST['hayfiltro']);
$filtro = ($_POST['filtro']);

				
$contador = 0;				

	$escenariosSQL ="SELECT escenario$IdTipoEscenario.* FROM escenario$IdTipoEscenario";



	$strSQL = "SELECT casos.*, pacientes.*, escenarios.*
	FROM ((casos INNER JOIN pacientes ON casos.IdPaciente = pacientes.IdPaciente) INNER JOIN ($escenariosSQL) as escenarios ON casos.IdCaso = escenarios.IdCaso)";
					
	if ($hayfiltro == 1){
		$strSQL .= " WHERE ((IdIPSEscenario =$IdIPSLocal) AND ($filtro)) ORDER BY escenarios.IdEscenario DESC";
	} else {
		$strSQL .= " WHERE (IdIPSEscenario =$IdIPSLocal) ORDER BY escenarios.IdEscenario DESC";
	}

$resultEscenario = mysqli_query($con, $strSQL) or die("Error. escenariosSQL=" . $escenariosSQL . " ; " . mysqli_error($con));

?>                

<div id="listaEscenarios" >
	
		<table width="500px" align="left" border="1" cellpadding="4" cellspacing="0">
			<thead class="mith">
				<tr>
					<th >Consecutivo</th>
					<th >Doc. Ident.</th>
					<th >Número</th>
					<th >Primer Nombre</th>
					<th >Segundo Nombre</th>
					<th >Primer Apellido</th>
					<th >Segundo Apellido</th>					
					<th >Inicio Escenario</th>
					<th >Sugerencia Remisión</th>
					<th >Cierre Escenario</th>
					<th >Cerrado</th>
				</tr>
			</thead>
			<tbody>
					
<?php						
        if(mysqli_num_rows($resultEscenario) > 0){
            while ($row = mysqli_fetch_array($resultEscenario)){				
?>  	               
				<tr class="filaEscenarios" id="IdEscenario-<?php echo $row['IdEscenario'];?>" name="IdEscenario-<?php echo $row['IdEscenario'];?>" >
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 250px" readonly id="ConsecutivoAdmision" name="ConsecutivoAdmision" value="<?php echo myutf8_decode($row['ConsecutivoAdmision']);?>" /></td>																			
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 50px"  readonly id="IdTipoDocIdent" name="IdTipoDocIdent" value="<?php echo myutf8_decode($row['IdTipoDocIdent']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 250px"  readonly id="NumeroDocIdentidad" name="NumeroDocIdentidad" value="<?php echo myutf8_decode($telecypher->decrypt($row['NumeroDocIdentidad'], $somekey));?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 220px"  readonly id="PrimerNombre" name="PrimerNombre" value="<?php echo myutf8_decode($telecypher->decrypt($row['PrimerNombre'], $somekey));?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 120px"  readonly id="SegundoNombre" name="SegundoNombre" value="<?php echo myutf8_decode($telecypher->decrypt($row['SegundoNombre'], $somekey));?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 220px"  readonly id="PrimerApellido" name="PrimerApellido" value="<?php echo myutf8_decode($telecypher->decrypt($row['PrimerApellido'], $somekey));?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 120px"  readonly id="SegundoApellido" name="SegundoApellido" value="<?php echo myutf8_decode($telecypher->decrypt($row['SegundoApellido'], $somekey));?>" /></td>																																								
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 360px" readonly id="FechaHoraInicioEscenario" name="FechaHoraInicioEscenario" value="<?php echo myutf8_decode($row['FechaHoraInicioEscenario']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 300px" readonly id="SugerenciaRemision" name="SugerenciaRemision" value="<?php echo myutf8_decode($row['SugerenciaRemision']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 360px" readonly id="FechaHoraCierreEscenario" name="FechaHoraCierreEscenario" value="<?php echo myutf8_decode($row['FechaHoraCierreEscenario']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 20px" readonly id="EscenarioCerrado" name="EscenarioCerrado" value="<?php echo myutf8_decode($row['EscenarioCerrado']);?>" /></td>														
				</tr>
<?php
			}
		}
?>				
			</tbody>
		</table>                  
</div>

<?php


mysqli_close($con);
?>