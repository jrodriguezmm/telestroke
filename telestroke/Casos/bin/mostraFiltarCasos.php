<?php
// *** Validate request to login to this site.
//**** Archivo: mostraFiltarCasos.php
session_start();

include "../../db.php";
include "../../cripto.php";

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);

// print_r($_POST);  

$IdIPSLocal = ($_POST['IdIPSLocal']);
$tipoorigen = ($_POST['tipoorigen']);					
$hayfiltro = ($_POST['hayfiltro']);
$filtro = ($_POST['filtro']);


$contador = 0;
	
if ($tipoorigen == 0) {	
	
	$casosSQL = "SELECT casos.IdCaso, casos.IdPaciente, casos.FechaHoraInicioCaso, casos.FechaHoraCierreCaso, casos.Terminado, casos.UsuarioID, casos.IdIPSCaso, 
	ips.Prestador, pacientes.PrimerNombre, pacientes.SegundoNombre, pacientes.PrimerApellido, pacientes.SegundoApellido, pacientes.IdTipoDocIdent, pacientes.NumeroDocIdentidad, pacientes.Sexo 
	FROM (casos INNER JOIN pacientes ON casos.IdPaciente = pacientes.IdPaciente) INNER JOIN ips ON casos.IdIPSCaso = ips.IdIPS";

	if ($hayfiltro == 1){
		$casosSQL .= " WHERE ((IdIPSCaso ='$IdIPSLocal') AND ($filtro)) ORDER BY casos.IdCaso DESC";
	} else {
		$casosSQL .= " WHERE (IdIPSCaso ='$IdIPSLocal') ORDER BY casos.IdCaso DESC";
	}
	
} else if ($tipoorigen == 1) {


	$unionescenarios ="(SELECT escenario1.IdCaso, escenario1.IdIPSEscenario, escenario1.IdIPSReferencia, escenario1.FechaHoraRemisionAIPSReferencia FROM escenario1)
						UNION
						(SELECT escenario2.IdCaso, escenario2.IdIPSEscenario, escenario2.IdIPSReferencia, escenario2.FechaHoraRemisionAIPSReferencia FROM escenario2)
						UNION
						(SELECT escenario3.IdCaso, escenario3.IdIPSEscenario, escenario3.IdIPSReferencia, escenario3.FechaHoraRemisionAIPSReferencia FROM escenario3)";

	$casosSQL = "SELECT casos.IdCaso, casos.IdPaciente, casos.FechaHoraInicioCaso, casos.FechaHoraCierreCaso, casos.Terminado, casos.UsuarioID, casos.IdIPSCaso, 
	ips.Prestador, pacientes.PrimerNombre, pacientes.SegundoNombre, pacientes.PrimerApellido, pacientes.SegundoApellido, pacientes.IdTipoDocIdent, pacientes.NumeroDocIdentidad, pacientes.Sexo,
	escenarios.IdIPSReferencia, escenarios.FechaHoraRemisionAIPSReferencia
	FROM ((casos INNER JOIN pacientes ON casos.IdPaciente = pacientes.IdPaciente) INNER JOIN ($unionescenarios) as escenarios ON casos.IdCaso = escenarios.IdCaso) INNER JOIN ips ON escenarios.IdIPSEscenario = ips.IdIPS";

	if ($hayfiltro == 1){
		$casosSQL .= " WHERE ((IdIPSReferencia ='$IdIPSLocal') AND ($filtro)) ORDER BY casos.IdCaso DESC";
	} else {
		$casosSQL .= " WHERE (IdIPSReferencia ='$IdIPSLocal') ORDER BY casos.IdCaso DESC";
	}
}

$resultCasos = mysqli_query($con, $casosSQL) or die("Error. sql=" . $casosSQL . " ; " . mysqli_error($con));

?>                

<div id="listaCasos" >
	
		<table width="500px" align="left" border="1" cellpadding="2" cellspacing="0">
			<thead class="mith">
				<tr>
					<th >Doc. Ident.</th>
					<th >Número</th>
					<th >Primer Nombre</th>
					<th >Segundo Nombre</th>
					<th >Primer Apellido</th>
					<th >Segundo Apellido</th>
					<th >Inicio Caso</th>
					<th >Sexo</th>
					<th >Prestador</th>
					<th >Terminado</th>
					<th >Cierre Caso</th>
				</tr>
			</thead>
			<tbody>
					
<?php						
        if(mysqli_num_rows($resultCasos) > 0){
            while ($row = mysqli_fetch_array($resultCasos)){				
				$contador = $contador + 1;
?>  	               
				<tr class="filaCasos" id="IdCaso-<?php echo $row['IdCaso'];?>" name="IdCaso-<?php echo $row['IdCaso'];?>" >
				
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 50px"  readonly id="IdTipoDocIdent" name="IdTipoDocIdent" value="<?php echo myutf8_decode($row['IdTipoDocIdent']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 250px"  readonly id="NumeroDocIdentidad" name="NumeroDocIdentidad" value="<?php echo myutf8_decode($telecypher->decrypt($row['NumeroDocIdentidad'], $somekey));?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 220px"  readonly id="PrimerNombre" name="PrimerNombre" value="<?php echo myutf8_decode($telecypher->decrypt($row['PrimerNombre'], $somekey));?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 120px"  readonly id="SegundoNombre" name="SegundoNombre" value="<?php echo myutf8_decode($telecypher->decrypt($row['SegundoNombre'], $somekey));?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 220px"  readonly id="PrimerApellido" name="PrimerApellido" value="<?php echo myutf8_decode($telecypher->decrypt($row['PrimerApellido'], $somekey));?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 120px"  readonly id="SegundoApellido" name="SegundoApellido" value="<?php echo myutf8_decode($telecypher->decrypt($row['SegundoApellido'], $somekey));?>" /></td>																																
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 360px"  readonly id="FechaHoraInicioEscenario" name="FechaHoraInicioEscenario" value="<?php echo myutf8_decode($row['FechaHoraInicioCaso']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 25px"  readonly id="Sexo" name="Sexo" value="<?php echo myutf8_decode($row['Sexo']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 500px" readonly id="Prestador" name="Prestador" value="<?php echo myutf8_decode($row['Prestador']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 20px"  readonly id="Terminado" name="Terminado" value="<?php echo myutf8_decode($row['Terminado']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 360px"  readonly id="FechaHoraCierreEscenario" name="FechaHoraCierreEscenario" value="<?php echo myutf8_decode($row['FechaHoraCierreCaso']);?>" /></td>														
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