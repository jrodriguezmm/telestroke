<?php

include "../db.php"; 
	
$UsuarioID = "";
if (!isset($_POST['IdIPSRemitente'])){
	$IdIPSRemitente = '';
} else {
	$IdIPSRemitente = $_POST['IdIPSRemitente'];
}

	$sql= "SELECT * FROM ipsreferencias INNER JOIN ips ON ipsreferencias.IdIPSReferencia = ips.IdIPS WHERE (ipsreferencias.IdIPSRemitente = '$IdIPSRemitente') ORDER BY ips.IdTipoEscenario, ips.Prestador";
    
?>

<table width="100%" align="left" border="1" cellpadding="2" cellspacing="0">
     <thead class="mith">
           <tr>
               <th>IdIPS</th>
               <th>Escenario</th>			   
               <th>Prestador</th>
			   <th>DPTO</th>       
               <th>MPIO</th>
               <th>Código</th>

               <th>Eliminar</th>              
           </tr>
       </thead>
       
       <tbody>

<?php
        
        $result = mysqli_query($con, $sql);
        
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_array($result)) {        
?>
                    <tr class="filaIPS" align="left" id="ips-<?php echo myutf8_decode($row['IdIPSReferencias']);?>">
						
                        <td ><input class="CampoNoEditableTabla" type="text" style="width: 160px"  readonly id="IdIPS" name="IdIPS" value="<?php echo myutf8_decode($row['IdIPS']);?>" /></td>														
						<td ><input class="CampoNoEditableTabla" type="text" style="width: 60px"  readonly id="IdTipoEscenario" name="IdTipoEscenario" value="<?php echo myutf8_decode($row['IdTipoEscenario']);?>" /></td>														 
						<td ><input class="CampoNoEditableTabla" type="text" style="width: 900px"  readonly id="Prestador" name="Prestador" value="<?php echo myutf8_decode($row['Prestador']);?>" /></td>														                          
						<td ><input class="CampoNoEditableTabla" type="text" style="width: 160px"  readonly id="CODDPTO" name="CODDPTO" value="<?php echo myutf8_decode($row['CODDPTO']);?>" /></td>														
                        <td ><input class="CampoNoEditableTabla" type="text" style="width: 300px"  readonly id="CODMPIO" name="CODMPIO" value="<?php echo myutf8_decode($row['CODMPIO']);?>" /></td>	                        
                        <td ><input class="CampoNoEditableTabla" type="text" style="width: 500px"  readonly id="CodigoPrestador" name="CodigoPrestador" value="<?php echo myutf8_decode($row['CodigoPrestador']);?>" /></td>														
                        <td><input class="CampoNoEditableTabla" type="image" src="img/delete-icon.png" name="borrar" style="float: center" onclick="eliminarIPSReferencia(<?php echo "'".$row['IdIPSReferencias']."'"; ?>)"/></td>
                    </tr>
<?php
                }
            }
        }
        mysqli_close($con);        
?>
    </tbody>
</table>
