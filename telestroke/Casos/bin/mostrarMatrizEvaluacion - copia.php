<?php
// *** Validate request to login to this site.
//**** Archivo: adminMatrizProyGrado.php
session_start();

include "../../db.php"; 
	
// print_r($_POST);
										
$IdTipoEscenario = ($_POST['IdTipoEscenario']);
$IdEscenario = ($_POST['IdEscenario']);

						
$IdMatrizEval = ($_POST['IdMatrizEval']);
$divmostraren = ($_POST['divmostraren']);
$tagtotal = ($_POST['tagtotal']);
$btnAsignarValorCalculado = ($_POST['btnAsignarValorCalculado']);
$TotalValorCalculado = ($_POST['TotalValorCalculado']);
$TotalGrupos = ($_POST['TotalGrupos']);
$GruposPendientes = ($_POST['GruposPendientes']);	

$sqlMatrices = "SELECT * FROM matriceseval WHERE  IdMatrizEval = " . $IdMatrizEval;
$resultMatrices = mysqli_query($con, $sqlMatrices) or die(mysqli_error($con));
$row = mysqli_fetch_array($resultMatrices);
$MatEval = myutf8_decode($row['MatEval']);
$descripcionmatriz = myutf8_decode($row['DescripcionMatEval']);

?> 

<p style="color:blue;text-align:center;font-size:40pt;font-weight:bold;"><?php echo $MatEval; ?></p>
<p style="color:black;text-align:center;font-size:30pt;font-weight:bold;"><?php echo $IdMatrizEval . "-" . $descripcionmatriz; ?></p>
                
<?php

$sql='SELECT * FROM matricesevalgrupos WHERE IdMatrizEval = '. $IdMatrizEval . ' ORDER BY Orden ASC';
$result1 = mysqli_query($con, $sql);
?>

<?php
if ($IdMatrizEval > 0) {
?>

<input class="Boton" disabled type="button" id="<?php echo $btnAsignarValorCalculado;?>" name="<?php echo $btnAsignarValorCalculado;?>" value="Asignar valor" 
	onclick="btnAsignarValorCalculado_OnClick(<?php echo "'$IdEscenario','$IdTipoEscenario', '$IdMatrizEval', '$divmostraren', '$tagtotal', '$TotalValorCalculado'";?>);"/>
<br/> 	
Puntaje: <input class="CampoNoEditableTabla" style="width:100px;" readonly type="text" id="<?php echo $TotalValorCalculado;?>" name="<?php echo $TotalValorCalculado;?>" value="0"/>
Faltan: <input class="CampoNoEditableTabla" style="width:100px;" readonly type="text" id="<?php echo $GruposPendientes;?>" name="<?php echo $GruposPendientes;?>" value="0"/>
de: <input class="CampoNoEditableTabla" style="width:100px;" readonly type="text" id="<?php echo $TotalGrupos;?>" name="<?php echo $TotalGrupos;?>" value="0"/>

<div id="matrizEval" >
    <?php		
		
        if(mysqli_num_rows($result1)>0){
            while($row = mysqli_fetch_array($result1)){
    ?>
				<div id="grupoEval-<?php echo $row['IdMatricesEvalGrupos'];?>" class="grupoEval">
	                      
						<table width="100%" border="1">
							<thead class="mith">
								<tr>
									<th width="30px">N</th>
									<th width="200px">Grupo</th>
									<th width="400px">Opciones</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="30px"><textarea width="100%" readonly id="Orden"  cols="3"  rows="2" ><?php echo myutf8_decode($row['Orden']);?></textarea></td>														
									<td width="200px"><textarea width="100%" readonly id="MatrizEvalGrupo"  cols="30"  rows="6" class="grupoEvalText" ><?php echo myutf8_decode($row['MatrizEvalGrupo']);?></textarea></td>														
								
									<td width="500px">
										<div class="opcionEval">
											<table width="100%" border="1">
												<thead class="mith">
													<tr>
														<th >Opción</th>
														<th >Puntaje</th>
													</tr>
												</thead>
												<tbody>
													<?php
															$sql2='SELECT * FROM matricesevalgruposopciones WHERE IdMatricesEvalGrupos = ' . $row['IdMatricesEvalGrupos'] . ' ORDER BY Orden ASC';
															$result2 = mysqli_query($con, $sql2);
															if(mysqli_num_rows($result2)>100000){
																while($row2 = mysqli_fetch_array($result2)){
																
																	$sqlSelect2 = "SELECT * FROM casosmatriceseval WHERE IdTipoEscenario =  '$IdTipoEscenario' AND IdEscenario = '$IdEscenario' AND IdMatricesEvalGruposOpciones = '" . $row2['IdMatricesEvalGruposOpciones'] . "'";
																	$resultadoCaso = mysqli_query($con, $sqlSelect2) or die("Error al leer opci�n de matriz: " . mysqli_error($con) . " sql= " . $sqlSelect2);
																	$seleccionado = "";
																	if ($resultadoCaso){
																		if (mysqli_num_rows($resultadoCaso)>0){
																			$seleccionado = "filaSelec";
																		} else {
																			$seleccionado = "";
																		}
																	} 
														?>
																	<tr class="claseOpcionDeGrupo <?php echo $seleccionado; ?>" id="detalle-<?php echo $row2['IdMatricesEvalGruposOpciones'];?>" name="detalle-<?php echo $row2['IdMatricesEvalGruposOpciones'];?>">
																			<td width="400px"><textarea width="100%" readonly id="MatrizEvalOpcion" name="MatrizEvalOpcion"  cols="50"  rows=1 class="contenidoEvalText"><?php echo myutf8_decode($row2['MatrizEvalOpcion']);?></textarea></td>
																			<td width="30px"><textarea width="100%" readonly id="Puntaje" name="Puntaje" cols="10"  rows=1 border="1" ><?php echo myutf8_decode($row2['Puntaje']);?></textarea></td>
																	</tr>
													<?php
																}
															}
													?>
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

</div>

<?php
}
?>

<?php
mysqli_close($con);
?>