<?php
// *** Validate request to login to this site.
//**** Archivo: adminMatrizProyGrado.php
session_start();

include "../db.php";

$matriz = myutf8_decode($_POST['matriz']);
$nombrematriz = myutf8_decode($_POST['nombrematriz']);

$sqlMatrices = "SELECT * FROM matriceseval WHERE  IdMatrizEval = " . $matriz;
$resultMatrices = mysqli_query($con, $sqlMatrices) or die(mysqli_error($con));
$row = mysqli_fetch_array($resultMatrices);
$descripcionmatriz = myutf8_decode($row['DescripcionMatEval']);

?> 

<br/>
<p style="color:blue;text-align:center;font-size:40pt;font-weight:bold;"><?php echo $nombrematriz; ?></p>
<p style="color:black;text-align:center;font-size:30pt;font-weight:bold;"><?php echo $matriz . "-" . $descripcionmatriz; ?></p>
<br/>
                
<?php

$sql='SELECT * FROM matricesevalgrupos WHERE IdMatrizEval = '. $matriz . ' ORDER BY Orden ASC';
$result1 = mysqli_query($con, $sql);
?>

<?php
if ($matriz > 0) {
?>

<br/> 

<input class="Boton" onclick="guardarMatrizEval();" type="button" value="Guardar matriz"/>

<div id="matrizEval" >
    <?php		
		
        if(mysqli_num_rows($result1)>0){
            while($row = mysqli_fetch_array($result1)){
    ?>
				<div id="grupoEval-<?php echo $row['IdMatricesEvalGrupos'];?>" class="grupoEval">
	                      
						<table width="99%">
							<thead class="mith">
								<tr>
									<th width="30px">Orden</th>
									<th width="200px">Grupo</th>
									<th >Borrar</th>
									<th width="400px">Opciones</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="30px"><textarea id="Orden"  cols="1"  rows="1" ><?php echo myutf8_decode($row['Orden']);?></textarea></td>														
									<td width="200px"><textarea id="MatrizEvalGrupo"  cols="1"  rows="5" class="grupoEvalText" ><?php echo myutf8_decode($row['MatrizEvalGrupo']);?></textarea></td>														
									<td><input type="image" src="./img/delete-icon.png" name="borrar" style="float: left" onclick="borrarGrupoEval(<?php echo $row['IdMatricesEvalGrupos']; ?>)"/></td>
								
									<td>
										<div class="opcionEval">
											<table width="100%">
												<thead class="mith">
													<tr>
														<th >Orden</th>
														<th >Opción</th>
														<th >Puntaje</th>
														<th >Borrar</th>
													</tr>
												</thead>
												<tbody>
													<?php
															$sql2='SELECT * FROM matricesevalgruposopciones WHERE IdMatricesEvalGrupos = ' . $row['IdMatricesEvalGrupos'] . ' ORDER BY Orden ASC';
															$result2 = mysqli_query($con, $sql2);
															if(mysqli_num_rows($result2)>0){
																while($row2 = mysqli_fetch_array($result2)){
														?>
																	<tr id="detalle-<?php echo $row2['IdMatricesEvalGruposOpciones']; ?>">
																			<td><textarea id="Orden"  cols="1"  rows=1><?php echo myutf8_decode($row2['Orden']);?></textarea></td>
																			<td width="400px"><textarea  width="100%" id="MatrizEvalOpcion" cols="3"  rows=1 class="contenidoEvalText"><?php echo myutf8_decode($row2['MatrizEvalOpcion']);?></textarea></td>
																			<td width="30px"><textarea width="100%" id="Puntaje" cols="1"  rows=1 ><?php echo myutf8_decode($row2['Puntaje']);?></textarea></td>
																			<td>
																				<input type="image" src="./img/delete-icon-small.png" name="borrar" onclick="borrarOpcionEval(<?php echo $row2['IdMatricesEvalGruposOpciones']; ?>)"/>
																			</td>
																	</tr>
													<?php 
																}
															} else {
																echo "No hay opciones,";
															}
													?>
													<tr>
														<td style="font-size:xx-small; text-align: center"><input type="image" src="./img/add-icon.png" name="adiDetalle" onclick="mostrarAdicionarOpcion(<?php echo $row['IdMatricesEvalGrupos'] ;?>)"/>Nueva<br/>Opción</td>
														<td>&nbsp;</td>
														<td>&nbsp;</td>
														<td>&nbsp;</td>
													</tr>
												</tbody>
											</table>
										</div>
									
									</td>
								</tr>
							</tbody>
						</table>
                                    
            </div>
    <?php
            }
        }
    ?>
            <div id="areaEvalNuevo" class="nombreGrupo">
                <div class="encabezadoEval">
                    <input class="Boton" type="image" src="./img/add-icon.png" id="btnAdicionarGrupo" onclick="mostrarAdicionarGrupo();" style="float: left"/>
                    <div class="nombreGrupo">Nuevo Grupo</div>
                    <div style="clear: both"></div>
               </div>
            </div>

</div>

<?php
}
?>

<?php
mysqli_close($con);
?>