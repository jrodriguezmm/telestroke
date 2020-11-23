<?php

include "../db.php";  
	
$hayfiltro = ($_POST['hayfiltro']);
$filtro = ($_POST['filtro']);

		$sql= "SELECT * FROM ips";

		if ($hayfiltro == 1){
			$sql .= " WHERE ($filtro) ORDER BY Prestador,  CODDPTO, CODMPIO, CodigoPrestador, IdTipoEscenario";
		} else {
			$sql .= " ORDER BY Prestador, CODDPTO, CODMPIO, CodigoPrestador, IdTipoEscenario";
		}        
?>

<table width="100%" align="left" border="1" cellpadding="2" cellspacing="1">
     <thead class="mith">
           <tr>
               <th>IdIPS</th>
               <th>Prestador </th>
			   <th>DPTO </th>       
               <th>MPIO</th>
               <th>Escenario</th>
               <th>Código</th>
               <th>Dirección</th>
               <th>Teléfono</th>
               <th>Eliminar</th>              
           </tr>
       </thead>
       
       <tbody>
       
<?php
        
        $result = mysqli_query($con, $sql);
        
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_array($result)) {
					$idips = myutf8_decode($row['IdIPS']);        
?>
                    <tr class="filaIPS" id="registro-<?php echo $idips;?>">
                    
                        <td><textarea class="InputCampo" id="IdIPS" readonly style="width:160px;" rows=1><?php echo myutf8_decode($row['IdIPS']); ?></textarea></td>                        
                        <td><textarea class="InputCampo" id="Prestador" style="width:900px;" rows=1><?php echo myutf8_decode($row['Prestador']); ?></textarea></td>
						<td> 
                        <?php 
                        	$dptoips =  myutf8_decode($row['CODDPTO']);
                            $sqlLista = "SELECT * FROM departamentos ORDER BY DPTO";
                            $resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
                            $numfilas = mysqli_num_rows($resultLista);
                            $departamentos_options = '<option value="-1" ' .  optionSelected(-1, $dptoips)   . ' >Seleccionar...' . '</option>';
                            while ($rowLista = mysqli_fetch_array($resultLista)) {
                                $value = $rowLista['CODDPTO'];		
                                $departamentos_options .='<option value=' . $value . optionSelected($value, $dptoips) . '>'  . myutf8_decode($rowLista['DPTO']) . '</option>';
                            }    
						?>                 
                            <select class="InputCampo" id="CODDPTOips-<?php echo $idips;?>" name="CODDPTOips-<?php echo $idips;?>"  style="width: 660px;" size="1" onchange="CODDPTO_OnChange('CODDPTOips-<?php echo $idips;?>','CODMPIOips-<?php echo $idips;?>');">						
                                <?php echo $departamentos_options;?>
                            </select> 	
                         </td>
                         <td>
                         <?php
                        	$mpioips =  myutf8_decode($row['CODMPIO']);
                            $sqlLista = "SELECT * FROM municipios ORDER BY MUNICIPIO";
                            $resultLista = mysqli_query($con, $sqlLista) or die("Error: " . mysqli_error($con));
                            $numfilas = mysqli_num_rows($resultLista);
                            $municipios_options = '<option value="-1" ' .  optionSelected(-1, $dptoips)   . ' >Seleccionar...' . '</option>';
                            while ($rowLista = mysqli_fetch_array($resultLista)) {
                                $value = $rowLista['CODMPIO'];		
                                $municipios_options .='<option value=' . $value . optionSelected($value, $mpioips) . '>'  . myutf8_decode($rowLista['MUNICIPIO']) . '</option>';
                            }
						?>                             				
                            <select class="InputCampo" id="CODMPIOips-<?php echo $idips;?>" name="CODMPIOips-<?php echo $idips;?>" style="width: 660px;" size="1">
                            <?php echo $municipios_options;?>
                            </select>                     
                        </td>
                        
                        <td><textarea class="InputCampo" id="IdTipoEscenario" style="width:90px;" rows=1><?php echo myutf8_decode($row['IdTipoEscenario']); ?></textarea></td>
                        <td><textarea class="InputCampo" id="CodigoPrestador" style="width:550px;" rows=1><?php echo myutf8_decode($row['CodigoPrestador']); ?></textarea></td>
                        <td><textarea class="InputCampo" id="Direccion" style="width:900px;" rows=1><?php echo myutf8_decode($row['Direccion']); ?></textarea></td>
                        <td><textarea class="InputCampo" id="Telefono" style="width:500px;" rows=1><?php echo myutf8_decode($row['Telefono']); ?></textarea></td>
						<td><input type="image" src="img/delete-icon.png" name="borrar" style="float: center" onclick="eliminarIPS(<?php echo "'".$row['IdIPS']."'"; ?>)"/></td>
                    </tr>
<?php
                }
            }
        }
        mysqli_close($con);        
?>
    </tbody>
</table>
