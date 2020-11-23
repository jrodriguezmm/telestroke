<?php
include "../db.php";
include "../cripto.php";

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);

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
				
?>

<table width="100%" align="left" border="1" cellpadding="1" cellspacing="1">
     <thead class="mith">
           <tr>
               <th>N</th>                        
               <th>IdPaciente</th>
               <th>Primer Apellido </th>
               <th>Segundo Apellido </th>			   
               <th>Primer Nombre</th>
               <th>Segundo Nombre</th>
               <th>Doc. Ident.</th>
               <th>Número</th>
               <th>Sexo</th>
               <th>Fecha Nacimiento</th>
               <th>DPTO Nacimiento</th>
               <th>MPIO Nacimiento</th>
               <th>DPTO Residencia</th>
               <th>MPIO Residencia</th>
               <th>Dirección Residencia</th>
               <th>Teléfono Residencia</th>
               <th>Celular</th>
               <th>Aseguradora</th>   
			   <th>Eliminar</th>               
           </tr>
       </thead>
       
       <tbody>
       
<?php
		$sql = "SELECT * FROM pacientes";

		if ($hayfiltro == 1){
			$sql .= " WHERE ($filtro) ORDER BY IdPaciente DESC";
		} else {
			$sql .= " ORDER BY IdPaciente DESC";
		}   
		
        $result = mysqli_query($con, $sql);
        
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
				$i = 0;
                while ($row = mysqli_fetch_array($result)) { 
					$i = $i+1; 
					$idpaciente = myutf8_decode($row['IdPaciente']);												      
?>
						<tr id="registro-<?php echo ($idpaciente);?>" align="left">
	                    
							<td class="InputCampo" readonly width="190px"><?php echo $i;?></td>
	                        
                    		<td><textarea class="InputCampo" id="IdPaciente" readonly style="width:100%;" rows=1><?php echo $idpaciente; ?></textarea></td>
							                                                                   
							<td><textarea class="InputCampo" id="PrimerApellido" style="width:560px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['PrimerApellido'], $somekey)); ?></textarea></td>
							<td><textarea class="InputCampo" id="SegundoApellido" style="width:560px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['SegundoApellido'], $somekey)); ?></textarea></td>                        	                      	                    	                        
							<td><textarea class="InputCampo" id="PrimerNombre" style="width:560px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['PrimerNombre'], $somekey)); ?></textarea></td>
							<td><textarea class="InputCampo" id="SegundoNombre" style="width:560px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['SegundoNombre'], $somekey)); ?></textarea></td>

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
							<select class="InputCampo" id="IdTipoDocIdent" name="IdTipoDocIdent" style="width: 660px;" size="1">	                           									
								<?php echo $tipodocident_options;?>
							</select>                           
							</td>                       
	                                                
							<td><textarea class="InputCampo" id="NumeroDocIdentidad" style="width:500px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['NumeroDocIdentidad'], $somekey));?></textarea></td>
	                                        
							<td>						                     
							<select class="InputCampo" id="Sexo" name="Sexo" style="width: 360px;" size="1">	                           									
								<option value='-1' <?php echo optionSelected(-1, $row['Sexo']);?> >Seleccionar...</option>
								<option value='M' <?php echo optionSelected('M', $row['Sexo']);?> >Masculino</option>
								<option value='F' <?php echo optionSelected('F', $row['Sexo']);?> >Femenino</option>
							</select>   
							</td>                       
	                        
							<td><input type="date" class="InputCampo" id="FechaNacimiento" style="width:800px;" value=<?php echo myutf8_decode($row['FechaNacimiento']); ?> /></td>
	                        
							<td> 
							<?php 
                        		$dpto =  myutf8_decode($row['CODDPTONacimiento']);
								$sqlLista = "SELECT * FROM departamentos ORDER BY DPTO";
								$resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
								$numfilas = mysqli_num_rows($resultLista);
								$departamentos_options = '<option value="-1" ' .  optionSelected(-1, $dpto)   . ' >Seleccionar...' . '</option>';
								while ($rowLista = mysqli_fetch_array($resultLista)) {
									$value = $rowLista['CODDPTO'];		
									$departamentos_options .='<option value=' . $value . optionSelected($value, $dpto) . '>'  . myutf8_decode($rowLista['DPTO']) . '</option>';
								}    
							?>                 
								<select class="InputCampo" id="CODDPTONacimiento-<?php echo $idpaciente;?>" name="CODDPTONacimiento-<?php echo $idpaciente;?>"  style="width: 600px;" size="1" onchange="CODDPTO_OnChange('CODDPTONacimiento-<?php echo $idpaciente;?>','CODMPIONacimiento-<?php echo $idpaciente;?>');">						
									<?php echo $departamentos_options;?>
								</select> 	
							</td>
							<td>
							<?php
                        		$mpio =  myutf8_decode($row['CODMPIONacimiento']);
								$sqlLista = "SELECT * FROM municipios ORDER BY MUNICIPIO";
								$resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
								$numfilas = mysqli_num_rows($resultLista);
								$municipios_options = '<option value="-1" ' .  optionSelected(-1, $mpio)   . ' >Seleccionar...' . '</option>';
								while ($rowLista = mysqli_fetch_array($resultLista)) {
									$value = $rowLista['CODMPIO'];		
									$municipios_options .='<option value=' . $value . optionSelected($value, $mpio) . '>'  . myutf8_decode($rowLista['MUNICIPIO']) . '</option>';
								}
							?>                             				
								<select class="InputCampo" id="CODMPIONacimiento-<?php echo $idpaciente;?>" name="CODMPIONacimiento-<?php echo $idpaciente;?>" style="width: 600px;" size="1">
								<?php echo $municipios_options;?>
								</select>                     
							</td>
	                         
							<td> 
							<?php 
                        		$dpto =  myutf8_decode($row['CODDPTOResidencia']);
								$sqlLista = "SELECT * FROM departamentos ORDER BY DPTO";
								$resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
								$numfilas = mysqli_num_rows($resultLista);
								$departamentos_options = '<option value="-1" ' .  optionSelected(-1, $dpto)   . ' >Seleccionar...' . '</option>';
								while ($rowLista = mysqli_fetch_array($resultLista)) {
									$value = $rowLista['CODDPTO'];		
									$departamentos_options .='<option value=' . $value . optionSelected($value, $dpto) . '>'  . myutf8_decode($rowLista['DPTO']) . '</option>';
								}    
							?>                 
								<select class="InputCampo" id="CODDPTOResidencia-<?php echo $idpaciente;?>" name="CODDPTOResidencia-<?php echo $idpaciente;?>"  style="width: 600px;" size="1" onchange="CODDPTO_OnChange('CODDPTOResidencia-<?php echo $idpaciente;?>','CODMPIOResidencia-<?php echo $idpaciente;?>');">						
									<?php echo $departamentos_options;?>
								</select> 	
							</td>
							<td>
							<?php
                        		$mpio =  myutf8_decode($row['CODMPIOResidencia']);
								$sqlLista = "SELECT * FROM municipios ORDER BY MUNICIPIO";
								$resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
								$numfilas = mysqli_num_rows($resultLista);
								$municipios_options = '<option value="-1" ' .  optionSelected(-1, $mpio)   . ' >Seleccionar...' . '</option>';
								while ($rowLista = mysqli_fetch_array($resultLista)) {
									$value = $rowLista['CODMPIO'];		
									$municipios_options .='<option value=' . $value . optionSelected($value, $mpio) . '>'  . myutf8_decode($rowLista['MUNICIPIO']) . '</option>';
								}
							?>                             				
								<select class="InputCampo" id="CODMPIOResidencia-<?php echo $idpaciente;?>" name="CODMPIOResidencia-<?php echo $idpaciente;?>" style="width: 600px;" size="1">
								<?php echo $municipios_options;?>
								</select>                     
							</td>
	                                         
							<td><textarea class="InputCampo" id="DireccionResidencia" style="width:900px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['DireccionResidencia'], $somekey)); ?></textarea></td>  
							<td><textarea class="InputCampo" id="TelefonoResidencia" style="width:550px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['TelefonoResidencia'], $somekey)); ?></textarea></td>  
							<td><textarea class="InputCampo" id="TelefonoCelular" style="width:550px;" rows=1><?php echo myutf8_decode($telecypher->decrypt($row['TelefonoCelular'], $somekey)); ?></textarea></td>  
	                        	                        
							<td><textarea class="InputCampo" id="Aseguradora" style="width:960px;" rows=1><?php echo myutf8_decode($row['Aseguradora']); ?></textarea></td>  
							<td><input width="50px" type="image" src="img/delete-icon.png" name="borrar" style="float: center" onclick="eliminarPaciente(<?php echo "'".$row['IdPaciente']."'"; ?>)"/></td>
						</tr>
<?php
                }
            }
        }
        mysqli_close($con);        
?>
    </tbody>
</table>
