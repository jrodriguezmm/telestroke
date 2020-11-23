<?php 

session_start();

include "../db.php";

// print_r($_SESSION); 

$UsuarioID = "";
if (!isset($_POST['UsuarioID'])){
	$UsuarioID = '';
} else {
	$UsuarioID = $_POST['UsuarioID'];
}


$ipsSQL = "SELECT * FROM ipsusuarios INNER JOIN ips ON ipsusuarios.IdIPS = ips.IdIPS WHERE (ipsusuarios.UsuarioID = '$UsuarioID') ORDER BY IdTipoEscenario, Prestador";

$ipsResult = mysqli_query($con, $ipsSQL) or die("Error al leer IPS de usuarios: " . $ipsSQL . ". " . mysqli_error($con));
$ipsNumRows = mysqli_num_rows($ipsResult);

?>

<div id="listaIPSs">

		<table width="100%" align="left" border="1" cellpadding="4" cellspacing="0">
			<thead class="mith">
				<tr>
					<th >IdIPS</th>
					<th >Esc.</th>
					<th >Prestador</th>
					<th >Código</th>
					<th >CODDPTO</th>
					<th >CODMPIO</th>
                    <th >Eliminar</th>
				</tr>
			</thead>
			<tbody>
		
			
<?php						
        if($ipsNumRows > 0){
            while ($row = mysqli_fetch_array($ipsResult)){				
?>  	               
				<tr class="filaCasos" align="left"  id="IdIPSUsuarios-<?php echo $row['IdIPS'];?>" name="IdIPS-<?php echo $row['IdIPSUsuarios'];?>" >
				
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 140px"  readonly id="IdIPS" name="IdIPS" value="<?php echo myutf8_decode($row['IdIPS']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 40px"  readonly id="IdTipoEscenario" name="IdTipoEscenario" value="<?php echo myutf8_decode($row['IdTipoEscenario']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 740px"  readonly id="Prestador" name="Prestador" value="<?php echo myutf8_decode($row['Prestador']);?>" /></td>																			
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 440px"  readonly id="CodigoPrestador" name="CodigoPrestador" value="<?php echo myutf8_decode($row['CodigoPrestador']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 100px"  readonly id="CODDPTO" name="CODDPTO" value="<?php echo myutf8_decode($row['CODDPTO']);?>" /></td>														
					<td ><input class="CampoNoEditableTabla" type="text" style="width: 200px"  readonly id="CODMPIO" name="CODMPIO" value="<?php echo myutf8_decode($row['CODMPIO']);?>" /></td>																																
					<td><input type="image" src="img/delete-icon.png" name="borrar" style="float: center" onclick="eliminarIPSUsuario(<?php echo "'".$row['IdIPSUsuarios']."'"; ?>)"/></td>
				
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

