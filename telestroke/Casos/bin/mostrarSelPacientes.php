<?php

include "../../db.php";
include "../../cripto.php";

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

																														
<table width="100%" align="left" border="1" cellpadding="4" cellspacing="0">
     <thead class="mith">
           <tr>
               <th>Núm.</th>
               <th>Primer Apellido </th>
               <th>Segundo Apellido </th>			                           
               <th>Primer Nombre</th>
               <th>Segundo Nombre</th>
               <th>Doc.</th>
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
?>
                    <tr class="filaPaciente" id="IdPaciente-<?php echo myutf8_decode($row['IdPaciente']);?>">
                    
                        <td><?php echo ($i);?></td>
 						<td><input class="CampoNoEditableTabla" type="text" readonly id="PrimerApellido" style="width:340px;" value="<?php echo myutf8_decode($telecypher->decrypt($row['PrimerApellido'], $somekey)); ?>" /></td>
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="SegundoApellido" style="width:340px;" value="<?php echo myutf8_decode($telecypher->decrypt($row['SegundoApellido'], $somekey)); ?>" /></td>                  
                    	<td><input class="CampoNoEditableTabla" type="text" readonly id="PrimerNombre" style="width:340px;" value="<?php echo myutf8_decode($telecypher->decrypt($row['PrimerNombre'], $somekey)); ?>" /></td>
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="SegundoNombre" style="width:340px;" value="<?php echo myutf8_decode($telecypher->decrypt($row['SegundoNombre'], $somekey)); ?>" /></td>
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="IdTipoDocIdent" style="width:60px;" value="<?php echo myutf8_decode($row['IdTipoDocIdent']); ?>" /></td>              
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="NumeroDocIdentidad" style="width:350px;" value="<?php echo myutf8_decode($telecypher->decrypt($row['NumeroDocIdentidad'], $somekey)); ?>" /></td> 
                    	<td><input class="CampoNoEditableTabla" type="text" readonly id="Sexo" style="width:30px;" value="<?php echo myutf8_decode($row['Sexo']); ?>" /></td>
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="FechaNacimiento" style="width:280px;" value="<?php echo myutf8_decode($row['FechaNacimiento']); ?>" /></td>
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="CODDPTONacimiento" style="width:100px;" value="<?php echo myutf8_decode($row['CODDPTONacimiento']); ?>" /></td>
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="CODMPIONacimiento" style="width:200px;" value="<?php echo myutf8_decode($row['CODMPIONacimiento']); ?>" /></td>
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="CODDPTOResidencia" style="width:100px;" value="<?php echo myutf8_decode($row['CODDPTOResidencia']); ?>" /></td>  
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="CODMPIOResidencia" style="width:200px;" value="<?php echo myutf8_decode($row['CODMPIOResidencia']); ?>" /></td>                          
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="DireccionResidencia" style="width:600px;" value="<?php echo myutf8_decode($telecypher->decrypt($row['DireccionResidencia'], $somekey)); ?>" /></td>  
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="TelefonoResidencia" style="width:300px;" value="<?php echo myutf8_decode($telecypher->decrypt($row['TelefonoResidencia'], $somekey)); ?>" /></td>  
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="TelefonoCelular" style="width:300px;" value="<?php echo myutf8_decode($telecypher->decrypt($row['TelefonoCelular'], $somekey)); ?>" /></td>  
                        <td><input class="CampoNoEditableTabla" type="text" readonly id="Aseguradora" style="width:500px;" value="<?php echo myutf8_decode($row['Aseguradora']); ?>" /></td>  
                    </tr>
<?php
                }
            }
        }
        mysqli_close($con);        
?>
    </tbody>
</table>
