<?php

include "../db.php";
include "../cripto.php";

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);
error_reporting(E_ALL);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);

$UsuarioID = ($_POST['UsuarioID']);	
$IdTipoDocIdent = ($_POST['IdTipoDocIdent']);
$NumeroDocIdentidad = ($_POST['NumeroDocIdentidad']);
$PrimerNombre = ($_POST['PrimerNombre']);
$PrimerApellido = ($_POST['PrimerApellido']);

$h_NumeroDocIdentidad = get_hash($NumeroDocIdentidad);
$h_PrimerNombre = get_hash($PrimerNombre);
$h_PrimerApellido = get_hash($PrimerApellido);

$filtro ="";
$hayfiltro = 0;

if ($IdTipoDocIdent != '-1'){
	$filtro = "IdTipoDocIdent='" . $IdTipoDocIdent . "'";
	$hayfiltro = 1;
}
if ($NumeroDocIdentidad != '-1'){
	if ($hayfiltro == 1){
		$filtro .= " AND h_NumeroDocIdentidad='" . $h_NumeroDocIdentidad . "'";
	} else {
		$filtro ="h_NumeroDocIdentidad='" . $h_NumeroDocIdentidad . "'";	
	}
	$hayfiltro = 1;
}
if ($UsuarioID != '-1'){
	if ($hayfiltro == 1){
		$filtro .= " AND UsuarioID='" . $UsuarioID . "'";
	} else {
		$filtro ="UsuarioID='" . $UsuarioID . "'";	
	}
	$hayfiltro = 1;
}
if ($PrimerNombre != '-1'){
	if ($hayfiltro == 1){
		$filtro .= " AND h_PrimerNombre='" . $h_PrimerNombre . "'";
	} else {
		$filtro ="h_PrimerNombre='" . $h_PrimerNombre . "'";	
	}
	$hayfiltro = 1;
}
if ($PrimerApellido != '-1'){
	if ($hayfiltro == 1){
		$filtro .= " AND h_PrimerApellido='" . $h_PrimerApellido . "'";
	} else {
		$filtro ="h_PrimerApellido='" . $h_PrimerApellido . "'";	
	}
	$hayfiltro = 1;
}
			


$numrows = 0;

$sql = "SELECT * FROM usuariosacv";

if ($hayfiltro == 1){
	$sql .= " WHERE ($filtro) ORDER BY PrimerApellido, SegundoApellido, PrimerNombre, SegundoNombre";
} else {
	$sql .= " ORDER BY PrimerApellido, SegundoApellido, PrimerNombre, SegundoNombre";
}   
		
?>

 
<table width="100%" align="left" border="1" cellpadding="2" cellspacing="1">
     <thead class="mith">
           <tr>
               <th>UsuarioID (login)</th>
               <th>Nombre </th>
               <th>P. Nombre</th>
               <th>S. Nombre</th>
               <th>P. Apellido </th>
               <th>S. Apellido </th>
               <th>Documento</th>
               <th>Número</th>
               <th>Sexo</th>
               <th>Tipo</th>                           
               
               <th>Eliminar</th>              
           </tr>
       </thead>
       
       <tbody>
       
<?php
        
        $result = mysqli_query($con, $sql);
		$numrows = mysqli_num_rows($result);
        
        if ($result) {
            if ($numrows > 0) {
                while ($row = mysqli_fetch_array($result)) {
                                        
?>
						<tr class="filaUsuario" id="registro-<?php echo myutf8_decode($row['UsuarioID']);?>">
	                    
							<td><textarea class="InputCampo" id="UsuarioID" disabled style="width:460px;" rows=1><?php echo myutf8_decode($row['UsuarioID']); ?></textarea></td>
							<td><textarea class="InputCampo" id="UsuarioNombre" style="width:550px;" rows=1><?php echo myutf8_decode($row['UsuarioNombre']); ?></textarea></td>
	                        
							<td><textarea class="InputCampo" id="PrimerNombre" style="width:360px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['PrimerNombre'], $somekey)); ?></textarea></td>
							<td><textarea class="InputCampo" id="SegundoNombre" style="width:360px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['SegundoNombre'], $somekey)); ?></textarea></td>
							<td><textarea class="InputCampo" id="PrimerApellido" style="width:360px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['PrimerApellido'], $somekey)); ?></textarea></td>
							<td><textarea class="InputCampo" id="SegundoApellido" style="width:360px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['SegundoApellido'], $somekey)); ?></textarea></td>
							<?php                        
							$sql = "SELECT  * FROM tipodocident";
							$resultLista = mysqli_query($con, $sql) or die("Error tipodocident: " . mysqli_error($con));
							$numfilas = mysqli_num_rows($resultLista);
							$tipodocident_options ="<option value=-1" . optionSelected(-1, $row['IdTipoDocIdent']) . ">Seleccionar...</option>";
							while ($rowOption = mysqli_fetch_array($resultLista)) {
								$value = $rowOption['IdTipoDocIdent'];
								$tipodocident_options .='<option value=' . $value . optionSelected($value, $row['IdTipoDocIdent']) . '>' . myutf8_decode($rowOption['TipoDocIdent']) . '</option>';
							}						
							?>
							<td>						                     
								<select class="InputCampo" id="IdTipoDocIdent" name="IdTipoDocIdent" style="width: 650px;" size="1">	                           									
									<?php echo $tipodocident_options;?>
								</select>                           
							</td>
	                        
							<td><textarea class="InputCampo" id="NumeroDocIdentidad" style="width:650px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['NumeroDocIdentidad'], $somekey));?></textarea></td>
	                       
							<td>						                     
							<select class="InputCampo" id="Sexo" name="Sexo" style="width: 300px;" size="1">	                           									
								<option value='-1' <?php echo optionSelected(-1, $row['Sexo']);?> >Seleccionar...</option>
								<option value='M' <?php echo optionSelected('M', $row['Sexo']);?> >M</option>
								<option value='F' <?php echo optionSelected('F', $row['Sexo']);?> >F</option>
							</select>   
							</td>
	                        
							
							<?php                        
							$sql = "SELECT  * FROM tipousuario";
							$resultLista = mysqli_query($con, $sql) or die("Error tipousuario: " . mysqli_error($con));
							$numfilas = mysqli_num_rows($resultLista);
							$tipousuario_options ="<option value=-1" . optionSelected(-1, $row['IdUsuarioTipo']) . ">Seleccionar...</option>";
							while ($rowOption = mysqli_fetch_array($resultLista)) {
								$value = $rowOption['IdUsuarioTipo'];
								$tipousuario_options .='<option value=' . $value . optionSelected($value, $row['IdUsuarioTipo']) . '>' . myutf8_decode($rowOption['UsuarioTipo']) . '</option>';
							}						
							?>	
							<td>						
								<select class="InputCampo" id="IdUsuarioTipo" name="IdUsuarioTipo" style="width: 650px;" size="1">	                           									
									<?php echo $tipousuario_options;?>
								</select>  							
							</td>
													
							<td><input class="InputCampo" type="image" src="img/delete-icon.png" name="borrar" style="float: center" onclick="eliminarUsuario(<?php echo "'".$row['UsuarioID']."'"; ?>)"/></td>
						</tr>
<?php
                }
            }
        }
        mysqli_close($con);        
?>
    </tbody>
</table>
