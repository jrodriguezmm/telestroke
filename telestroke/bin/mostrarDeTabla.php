<?php

include "../db.php";	

$NombreTabla= ($_POST['NombreTabla']);
$NombreId= ($_POST['NombreId']);
$NombreCampo= ($_POST['NombreCampo']);


$sql= "SELECT $NombreId, $NombreCampo FROM $NombreTabla";

?>

<table width="100%" align="center" border="1" cellpadding="2" cellspacing="2">
     <thead class="mith">
           <tr>
               <th><?php echo $NombreId; ?></th>
               <th><?php echo $NombreCampo; ?></th>
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
                    <tr id="registro-<?php echo '$row[$NombreTabla]-$row[$NombreId]'; ?>">
                        <td><textarea class="CampoNoEditableTabla" id="IdCampo" readonly style="width:150px;" rows=1><?php echo myutf8_decode($row[$NombreId]); ?></textarea></td>
                        <td><textarea class="InputCampo" id="Campo" style="width:550px;" rows=1><?php echo myutf8_decode($row[$NombreCampo]); ?></textarea></td>
                                                
                       <td align='center'><input type="image" src="img/delete-icon.png" name="borrar" style="float: center" onclick="eliminarEnTabla(<?php echo "'$NombreTabla', '$NombreId', '$NombreCampo', '$row[$NombreId]'"; ?>)"/></td>
                    </tr>
<?php
                }
            }
        }
        mysqli_close($con);        
?>
    </tbody>
</table>
