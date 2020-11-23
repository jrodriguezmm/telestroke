<?php
// *** Validate request to login to this site.
//**** Archivo: mostraFiltarCasosEscenarios.php
session_start();

include "../../db.php";

// print_r($_POST);
						
$IdCaso = ($_POST['IdCaso']);

$contador = 0;				
					
$unionescenarios ="(SELECT escenario1.IdEscenario, escenario1.IdCaso, escenario1.IdIPSEscenario, escenario1.IdIPSReferencia, escenario1.ConsecutivoAdmision, 
					escenario1.FechaHoraInicioEscenario, escenario1.FechaHoraCierreEscenario, escenario1.EscenarioCerrado, escenario1.FechaLlegadaPuertaUrgencias, 
					escenario1.HoraLlegadaPuertaUrgencias, escenario1.EstadoEdicion, escenario1.UsuarioID,  escenario1.SugerenciaRemision FROM escenario1)
					UNION
					(SELECT escenario2.IdEscenario, escenario2.IdCaso, escenario2.IdIPSEscenario, escenario2.IdIPSReferencia, escenario2.ConsecutivoAdmision, 
					escenario2.FechaHoraInicioEscenario, escenario2.FechaHoraCierreEscenario, escenario2.EscenarioCerrado, escenario2.FechaLlegadaPuertaUrgencias, 
					escenario2.HoraLlegadaPuertaUrgencias, escenario2.EstadoEdicion, escenario2.UsuarioID,  escenario2.SugerenciaRemision FROM escenario2)
					UNION
					(SELECT escenario3.IdEscenario, escenario3.IdCaso, escenario3.IdIPSEscenario, escenario3.IdIPSReferencia, escenario3.ConsecutivoAdmision, 
					escenario3.FechaHoraInicioEscenario, escenario3.FechaHoraCierreEscenario, escenario3.EscenarioCerrado, escenario3.FechaLlegadaPuertaUrgencias, 
					escenario3.HoraLlegadaPuertaUrgencias, escenario3.EstadoEdicion, escenario3.UsuarioID,  escenario3.SugerenciaRemision FROM escenario3)";

$escenariosSQL = "SELECT escenarios.* ,
					ips.IdTipoEscenario, ips.Prestador
					
					FROM ($unionescenarios) as escenarios INNER JOIN ips ON escenarios.IdIPSEscenario = ips.IdIPS 
					WHERE IdCaso= $IdCaso ORDER BY escenarios.IdEscenario DESC";					

$resultEscenario = mysqli_query($con, $escenariosSQL) or die("Error. escenariosSQL=" . $escenariosSQL . " ; " . mysqli_error($con));

?>                

<div id="listaEscenarios" >
	
		<table width="500px" align="left" border="1" cellpadding="4" cellspacing="0">
			<thead class="mith">
				<tr>
					<th >Escenario</th>
					<th >Inicio Escenario</th>
					<th >Consecutivo</th>
					<th >Sugerencia Remisión</th>
					<th >Prestador</th>
					<th >Cierre Escenario</th>
					<th >Cerrado</th>
					<th >Estado</th>
				</tr>
			</thead>
			<tbody>
					
<?php						
        if(mysqli_num_rows($resultEscenario) > 0){
            while ($row = mysqli_fetch_array($resultEscenario)){				
?>  	               
				<tr class="filaEscenarios" id="IdEscenario-<?php echo $row['IdTipoEscenario'];?>-<?php echo $row['IdEscenario'];?>" name="IdEscenario-<?php echo $row['IdEscenario'];?>" >
				
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 50px" readonly id="Escenario" name="Escenario" value="<?php echo "E" . myutf8_decode($row['IdTipoEscenario']);?>" /></td>																			
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 360px" readonly id="FechaHoraInicioEscenario" name="FechaHoraInicioEscenario" value="<?php echo myutf8_decode($row['FechaHoraInicioEscenario']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 250px" readonly id="ConsecutivoAdmision" name="ConsecutivoAdmision" value="<?php echo myutf8_decode($row['ConsecutivoAdmision']);?>" /></td>																			
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 300px" readonly id="SugerenciaRemision" name="SugerenciaRemision" value="<?php echo myutf8_decode($row['SugerenciaRemision']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 500px" readonly id="Prestador" name="Prestador" value="<?php echo myutf8_decode($row['Prestador']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 360px" readonly id="FechaHoraCierreEscenario" name="FechaHoraCierreEscenario" value="<?php echo myutf8_decode($row['FechaHoraCierreEscenario']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 20px" readonly id="EscenarioCerrado" name="EscenarioCerrado" value="<?php echo myutf8_decode($row['EscenarioCerrado']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 20px" readonly id="EstadoEdicion" name="EstadoEdicion" value="<?php echo myutf8_decode($row['EstadoEdicion']);?>" /></td>														
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