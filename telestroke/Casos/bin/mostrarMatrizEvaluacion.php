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
$resumenPuntajeMatriz = ($_POST['resumenPuntajeMatriz']);
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

<div class="matrizEval" id="matrizEval-<?php echo $IdMatrizEval;?>">
    <?php		
		
        if(mysqli_num_rows($result1)>0){
            while($row = mysqli_fetch_array($result1)){
    ?>
				<div class="grupoEval" id="grupoEval-<?php echo $row['IdMatricesEvalGrupos'];?>">
	                      
					<table width="100%" border="1">
						<thead class="mith">
							<tr>
								<th width="30px">N</th>
								<th width="200px">Grupo</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td width="30px" align="center"><textarea width="100%" readonly id="Orden"  cols="3"  rows="2" ><?php echo myutf8_decode($row['Orden']);?></textarea></td>														
								<td width="500px" align="left"><textarea class="grupoEvalText" width="100%" readonly id="MatrizEvalGrupo"  cols="30"  rows="3"><?php echo myutf8_decode($row['MatrizEvalGrupo']);?></textarea></td>														
							</tr>
							<tr>
								<td width="30px"></td>
								
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
														if(mysqli_num_rows($result2)>0){
															while($row2 = mysqli_fetch_array($result2)){
															
																$sqlSelect2 = "SELECT * FROM casosmatriceseval WHERE IdTipoEscenario =  '$IdTipoEscenario' AND IdEscenario = '$IdEscenario' AND IdMatricesEvalGruposOpciones = '" . $row2['IdMatricesEvalGruposOpciones'] . "'";
																$resultadoCaso = mysqli_query($con, $sqlSelect2) or die("Error al leer opción de matriz: " . mysqli_error($con) . " sql= " . $sqlSelect2);
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
																		<td width="480px"><textarea width="100%" class="contenidoEvalText" readonly id="MatrizEvalOpcion" name="MatrizEvalOpcion"  cols="30"  rows=3 ><?php echo myutf8_decode($row2['MatrizEvalOpcion']);?></textarea></td>
																		<td width="20px"><textarea width="100%" style="text-align:center;" readonly id="Puntaje" name="Puntaje" cols="10"  rows=1 border="1" ><?php echo myutf8_decode($row2['Puntaje']);?></textarea></td>
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



<table align="center" width="100%" border="0" id="<?php echo $resumenPuntajeMatriz;?>">
	<tr align="center">
		<td style="color:blue;font-size:40pt;font-weight:bold;"><?php echo $MatEval; ?></td>
	</tr>
	<tr>
		<td>
			Puntaje: <input class="CampoNoEditableTabla" style="width:100px;" readonly type="text" id="<?php echo $TotalValorCalculado;?>" name="<?php echo $TotalValorCalculado;?>" value="0"/>
			Faltan: <input class="CampoNoEditableTabla" style="width:100px;" readonly type="text" id="<?php echo $GruposPendientes;?>" name="<?php echo $GruposPendientes;?>" value="0"/>
			de: <input class="CampoNoEditableTabla" style="width:100px;" readonly type="text" id="<?php echo $TotalGrupos;?>" name="<?php echo $TotalGrupos;?>" value="0"/>		
		</td>	
	</tr>
	<tr align="center">	
		<td>
			<input class="Boton" disabled type="button" id="<?php echo $btnAsignarValorCalculado;?>" name="<?php echo $btnAsignarValorCalculado;?>" value="Asignar puntaje" 
				onclick="btnAsignarValorCalculado_OnClick(<?php echo "'$IdEscenario','$IdTipoEscenario', '$IdMatrizEval', '$divmostraren', '$tagtotal', '$TotalValorCalculado'";?>);"/>		
		</td>
	</tr>
</table>
<br/>
<?php
}
?>

<?php
mysqli_close($con);
?>