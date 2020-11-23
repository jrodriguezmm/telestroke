
<?php

session_start();

// print_r($_POST);

include "../db.php"; 
include "../cripto.php";

error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);

$somepass = 'telestrokelogpw';
$telecypher = new telestrokeCypherSF($somepass);
$somekey = $telecypher->getKey($somepass);
	
// echo " tempIdEscenario: " . $_POST['tempIdEscenario'];
	
	
$row ="";

if (!isset($_SESSION['UsuarioID'])){
	$UsuarioID = "";
} else {
	$UsuarioID = $_SESSION['UsuarioID'];
}

if (esVacioONull($_POST['tempIdEscenario'])){
	$IdEscenario = -1;
	exit("Escenario No Seleccionado: tempIdEscenario is not set");
} else {
	$IdEscenario = ($_POST['tempIdEscenario']);
}

		 
	$sql = "select * FROM escenario1 WHERE IdEscenario = '$IdEscenario'";
	$result = mysqli_query($con, $sql) or die("Error LeerEscenario. Sql= " . $sql . mysqli_error($con));

	if ((!$result) || (mysqli_num_rows($result) == 0)){
		echo "No se encontró el escenario. Sql= " . $sql;
		exit("No existe el IdEscenario: " . $IdEscenario);

	} else {
			
		$row = mysqli_fetch_array($result);
		
		// GENERALES
		
		$paramlistaCampos = myutf8_decode($row['listaCampos']); 
		$paramultimomodulo = myutf8_decode($row['ultimomodulo']); 
		
		$paramIdEscenario = myutf8_decode($row['IdEscenario']);
		$paramUsuarioID = myutf8_decode($row['UsuarioID']);		
		$paramIdCaso = myutf8_decode($row['IdCaso']);
		$paramEstadoEdicion = myutf8_decode($row['EstadoEdicion']);

		// ESCENARIO
		
		$paramIdIPSEscenario = myutf8_decode($row['IdIPSEscenario']);
		$paramFechaHoraInicioEscenario = myutf8_decode($row['FechaHoraInicioEscenario']);
		$paramConsecutivoAdmision = myutf8_decode($row['ConsecutivoAdmision']);
		$paramEscenarioCerrado = myutf8_decode($row['EscenarioCerrado']);
		$paramFechaHoraCierreEscenario = myutf8_decode($row['FechaHoraCierreEscenario']);
				
		// TRIAGE Y CODIGO ACV
				
		$paramNivelTriage = myutf8_decode($row['NivelTriage']);
		$paramTriageBreveHC = myutf8_decode($row['TriageBreveHC']);
		$paramTriageMedioIngreso = myutf8_decode($row['TriageMedioIngreso']);
		$paramEscalaBEFAST = myutf8_decode($row['EscalaBEFAST']);
		$paramCodigoACVActivado = myutf8_decode($row['CodigoACVActivado']);
		
		// TIEMPO DEL EVENTO
		
		$paramFechaLlegadaPuertaUrgencias = myutf8_decode($row['FechaLlegadaPuertaUrgencias']);
		$paramHoraLlegadaPuertaUrgencias = myutf8_decode($row['HoraLlegadaPuertaUrgencias']);
		$paramWakeUpStroke = myutf8_decode($row['WakeUpStroke']);
		$paramFechaInicioSintomas = myutf8_decode($row['FechaInicioSintomas']);
		$paramHoraInicioSintomas = myutf8_decode($row['HoraInicioSintomas']);
		$paramTiempoEvolucionHoras = myutf8_decode($row['TiempoEvolucionHoras']);
		$paramIdTipoTiempo = myutf8_decode($row['IdTipoTiempo']);		
		
		// HISTORIA CLINICA
		
		$paramEdad = myutf8_decode($row['Edad']);
		$paramSignosSintomasNeurologicos = myutf8_decode($row['SignosSintomasNeurologicos']);
		$paramAntecedentesMedicosRelevantes = myutf8_decode($row['AntecedentesMedicosRelevantes']);
		$paramHallazgosRelevantes = myutf8_decode($row['HallazgosRelevantes']);
		$paramAntecedenteAnticoagulantesOrales = myutf8_decode($row['AntecedenteAnticoagulantesOrales']);
		$paramIdAnticoagulanteOral = myutf8_decode($row['IdAnticoagulanteOral']);
		
		// LAB
		
		$paramLabGlucometria = myutf8_decode($row['LabGlucometria']);
		
		// PERSISTEN SINTOMAS
				
		$paramPersistenSintomasLuegoDextrosa = myutf8_decode($row['PersistenSintomasLuegoDextrosa']);
		$paramPersistenSintomasGlasgowMayor8 = myutf8_decode($row['PersistenSintomasGlasgowMayor8']);
		
		
		// EXAMEN FISICO
		$paramExamenNeurologico = myutf8_decode($row['ExamenNeurologico']);
		$paramHuboReanimacionCardiopulmonar = myutf8_decode($row['HuboReanimacionCardiopulmonar']);
		$paramEscalaGlasgow = myutf8_decode($row['EscalaGlasgow']);	
		
		// TIA O MIMIC

		$paramAsemejaACVoMimic = myutf8_decode($row['AsemejaACVoMimic']);
		
		$paramEscalaABCD2 = myutf8_decode($row['EscalaABCD2']);
		$paramRiesgoACVa2dias = myutf8_decode($row['RiesgoACVa2dias']);
		$paramRiesgoACVa7dias = myutf8_decode($row['RiesgoACVa7dias']);
		$paramRiesgoACVa90dias = myutf8_decode($row['RiesgoACVa90dias']);
		$paramInicioEstatina = myutf8_decode($row['InicioEstatina']);
		
		// SOSPECHA ACV
		
		$paramEscalaFASTED = myutf8_decode($row['EscalaFASTED']);		
		$paramPredictorACVIsquemicoCircPosterior = myutf8_decode($row['PredictorACVIsquemicoCircPosterior']);
		$paramIdTipoCircIsque = myutf8_decode($row['IdTipoCircIsque']);	
		
		// REMISION
		
		$paramSugerenciaRemision = myutf8_decode($row['SugerenciaRemision']);
		$paramIdIPSReferencia = myutf8_decode($row['IdIPSReferencia']);		
		$paramIdTipoEscenarioReferencia = myutf8_decode($row['IdTipoEscenarioReferencia']);
		$paramFechaHoraRemisionAIPSReferencia = myutf8_decode($row['FechaHoraRemisionAIPSReferencia']);	
		
		// TIEMPOS
		
		$paramTimeFinTriage = myutf8_decode($row['TimeFinTriage']);
		$paramTimeFinTiempoEvento = myutf8_decode($row['TimeFinTiempoEvento']);
		$paramTimeFinActivacionCodigoACV = myutf8_decode($row['TimeFinActivacionCodigoACV']);
		$paramTimeFinHistoriaClinica = myutf8_decode($row['TimeFinHistoriaClinica']);
		$paramTimeFinLaboratorio = myutf8_decode($row['TimeFinLaboratorio']);
		$paramTimeFinExamenFisico = myutf8_decode($row['TimeFinExamenFisico']);
		
		$paramTimeFinEscalaABCD2 = myutf8_decode($row['TimeFinEscalaABCD2']);
		$paramTimeFinEscalaFASTED = myutf8_decode($row['TimeFinEscalaFASTED']);
		$paramTimeFinCircPosterior = myutf8_decode($row['TimeFinCircPosterior']);

	}


	// DATOS CASOS
	
	
	$sql = "select * FROM casos WHERE IdCaso = $paramIdCaso";
	$result = mysqli_query($con, $sql) or die("Error casos: " . mysqli_error($con));
	$rowCaso = mysqli_fetch_array($result);
	
	$IdIPSCaso = myutf8_decode($rowCaso['IdIPSCaso']);
	$IdPaciente = myutf8_decode($rowCaso['IdPaciente']);
	$FechaHoraInicioCaso = myutf8_decode($rowCaso['FechaHoraInicioCaso']);
	$FechaHoraCierreCaso = myutf8_decode($rowCaso['FechaHoraCierreCaso']);
	$Terminado = myutf8_decode($rowCaso['Terminado']);
	
	$sql = "select * FROM ips WHERE IdIPS = $IdIPSCaso";
	$result = mysqli_query($con, $sql) or die("Error ips: " . mysqli_error($con));
	$rowIPS = mysqli_fetch_array($result);	
	$NombreIPSCaso = myutf8_decode($rowIPS['Prestador']);
	
	$sql = "select * FROM ips WHERE IdIPS = $paramIdIPSEscenario";
	$result = mysqli_query($con, $sql) or die("Error ips: " . mysqli_error($con));
	$rowIPS = mysqli_fetch_array($result);
	$NombreIPSEscenario = myutf8_decode($rowIPS['Prestador']);	
	

	// DATOS PACIENTE
	
	$sql = "select * FROM pacientes WHERE IdPaciente = $IdPaciente";
	$result = mysqli_query($con, $sql) or die("Error pacientes: " . mysqli_error($con));
	$rowPaciente = mysqli_fetch_array($result);
	
	$IdTipoDocIdent = myutf8_decode($rowPaciente['IdTipoDocIdent']);
	
	$NumeroDocIdentidad = myutf8_decode($telecypher->decrypt($rowPaciente['NumeroDocIdentidad'], $somekey));
	$PrimerNombre = myutf8_decode($telecypher->decrypt($rowPaciente['PrimerNombre'], $somekey));
	$SegundoNombre = myutf8_decode($telecypher->decrypt($rowPaciente['SegundoNombre'], $somekey));
	$PrimerApellido = myutf8_decode($telecypher->decrypt($rowPaciente['PrimerApellido'], $somekey));
	$SegundoApellido = myutf8_decode($telecypher->decrypt($rowPaciente['SegundoApellido'], $somekey));
	
	$Sexo = myutf8_decode($rowPaciente['Sexo']);
	$FechaNacimiento = myutf8_decode($rowPaciente['FechaNacimiento']);
	
	
	// TIPOS ANTECEDENTES

	$sql = "select * FROM tipoantecedentes ORDER BY IdTipoAntecedente";
	$result = mysqli_query($con, $sql) or die("Error tipoantecedentes: " . mysqli_error($con));
	$numfilas = mysqli_num_rows($result);
	$tipoantecedentes_options = "<option value=-1 disabled selected >Seleccionar...</option>";
	while ($rowOption = mysqli_fetch_array($result)) {
		$value = $rowOption['IdTipoAntecedente'];
		$tipoantecedentes_options .='<option value=' . $value . '>' . myutf8_decode($rowOption['TipoAntecedente']) . '</option>';
	}

			
	$sql = "select * FROM tipotiempo";
	$result = mysqli_query($con, $sql) or die("Error tipotiempo: " . mysqli_error($con));
	$numfilas = mysqli_num_rows($result);
	$tipotiempo_options = '<option value="-1" ' . optionselected(-1, $paramIdTipoTiempo)  . ' >Seleccionar...' . '</option>';
	while ($rowOption = mysqli_fetch_array($result)) {
		$value = $rowOption['IdTipoTiempo'];
		$tipotiempo_options .='<option value=' . $value . optionselected($value, $paramIdTipoTiempo) . '>' . myutf8_decode($rowOption['TipoTiempo']) . '</option>';
	}
	

 	$sql = "select * FROM anticoagulantesorales";
	$result = mysqli_query($con, $sql) or die("Error anticoagulantesorales: " . mysqli_error($con));
	$numfilas = mysqli_num_rows($result);
	$anticoagulantesorales_options = '<option value="-1" ' . optionselected(-1, $paramIdAnticoagulanteOral)  . ' >Seleccionar...' . '</option>';
	while ($rowOption = mysqli_fetch_array($result)) {
		$value = $rowOption['IdAnticoagulanteOral'];
		$anticoagulantesorales_options .='<option value=' . $value . optionselected($value, $paramIdAnticoagulanteOral) . '>' . myutf8_decode($rowOption['AnticoagulanteOral']) . '</option>';
	}
		
		
 	$sql = "select * FROM tipocircisque";
	$result = mysqli_query($con, $sql) or die("Error tipocircisque: " . mysqli_error($con));
	$numfilas = mysqli_num_rows($result);
	$tipocircisque_options = '<option value="-1" ' . optionselected(-1, $paramIdTipoCircIsque)  . ' >Seleccionar...' . '</option>';
	while ($rowOption = mysqli_fetch_array($result)) {
		$value = $rowOption['IdTipoCircIsque'];
		$tipocircisque_options .='<option value=' . $value . optionselected($value, $paramIdTipoCircIsque) . '>' . myutf8_decode($rowOption['TipoCircIsque']) . '</option>';
	}			
	
 	
	$ips_options = '<option value="-1" ' . optionselected(-1, $paramIdIPSReferencia)  . ' >Seleccionar...' . '</option>';
	if ($paramIdTipoEscenarioReferencia == 23){	
		$sql = "select * FROM ipsreferencias INNER JOIN ips ON ipsreferencias.IdIPSReferencia = ips.IdIPS WHERE (ipsreferencias.IdIPSRemitente = '$paramIdIPSEscenario' AND ips.IdTipoEscenario > 1)";
	} else if (($paramIdTipoEscenarioReferencia == 2) || ($paramIdTipoEscenarioReferencia == 3)) {
		$sql = "select * FROM ipsreferencias INNER JOIN ips ON ipsreferencias.IdIPSReferencia = ips.IdIPS WHERE (ipsreferencias.IdIPSRemitente = '$paramIdIPSEscenario' AND ips.IdTipoEscenario = '$paramIdTipoEscenarioReferencia')";
	} else {
		$sql = "select * FROM ipsreferencias INNER JOIN ips ON ipsreferencias.IdIPSReferencia = ips.IdIPS WHERE (ipsreferencias.IdIPSRemitente = '$paramIdIPSEscenario')";
	} 	
	$result = mysqli_query($con, $sql) or die("Error ips lista: " . mysqli_error($con));
	$numfilas = mysqli_num_rows($result);
	while ($rowOption = mysqli_fetch_array($result)) {
		$value = $rowOption['IdIPS'];
		$ips_options .='<option value=' . $value . optionselected($value, $paramIdIPSReferencia) . '>' . myutf8_decode($rowOption['IdTipoEscenario']) . ":" . myutf8_decode($rowOption['Prestador']) . '</option>';
	}
	
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../css/telestroke.css" rel="stylesheet" type="text/css"/>
    <link href="../css/matriceseval.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="../lib/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="../lib/funcionesACV.js"></script>
    <script type="text/javascript" src="./lib/funcionesMatrices.js"></script>        
    <script type="text/javascript" src="./lib/funcionesEscenario1.js"></script>
    <script type="text/javascript" src="./lib/funcionesEscenario1ed.js"></script>
    <script type="text/javascript">
      $(document).ready(function() {
			
				ActualizarControlesYEstado(<?php echo $paramEstadoEdicion;?>);								
      });
    </script>	
    <title>Telestroke-E1</title>    
  </head>

	<body>

<?php 
  include "header.php";
  
	include "../PaginaPrincipal/Encabezado.php";  
?>  
	
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
			<td>
      	<input class="Boton" id="btn_regresar" name="btn_regresar" type="submit" value="Regresar" style="width:300px;" onclick="btnBack_OnClick()"/>
      </td>
		</tr>
	</table>
  
	<table id="tableCrearTexto" name="tableCrearTexto" width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
			<td>
        <input class="Boton" id="btnCrearTextoEscenarioPreview" name="btnCrearTextoEscenarioPreview" type="submit" value="Visualizar texto" style="width:400px;" onclick="crearTextoEscenarioPreview()"/>
        <input class="Boton" id="btnCrearTextoEscenarioFile" name="btnCrearTextoEscenarioFile" type="submit" value="Exportar texto" style="width:400px;" onclick="crearTextoEscenarioFile()"/>
      </td>
		</tr>
	</table>  
  
<div id="Escenario" name="Escenario">

<?php
	// ********************************************** CASO GENERAL **************************************************************
?>	
	
	<table width="100%" align="center" border="1" cellpadding="2">				
		<tr align="center">		
			<td class="EscenarioTituloModulo"><label>Caso General</label></td>
		</tr>
	</table>
	
	<table width="100%" align="center" border="1" cellpadding="2">				
		<tr>
			<td width="40%" scope="col" class="LabelCampo"><label>IPS que inició caso:</label></td>
		</tr>	
		<tr>	
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="NombreIPSCaso" name="NombreIPSCaso" value="<?php echo $NombreIPSCaso;?>"/></td>
		</tr>
	</table>
		
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr>
			<td width="40%" scope="col" class="LabelCampo"><label>Inicio:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="datetime" readonly id="FechaHoraInicioCaso" name="FechaHoraInicioCaso" value="<?php echo $FechaHoraInicioCaso;?>"/></td>
		</tr>	
		<tr>
			<td class="LabelCampo"><label>Cierre:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="datetime" readonly id="FechaHoraCierreCaso" name="FechaHoraCierreCaso" value="<?php echo $FechaHoraCierreCaso;?>"/></td>
		</tr>	
		<tr>
			<td class="LabelCampo"><label>IdCaso:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="IdCaso" name="IdCaso" value="<?php echo $paramIdCaso;?>"/></td>
		</tr>	
		<tr>
			<td class="LabelCampo"><label>Usuario:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="UsuarioID" name="UsuarioID" value="<?php echo $UsuarioID;?>"/></td>
		</tr>
		<tr>
			<td class="LabelCampo"><label>Id IPS:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="IdIPSCaso" name="IdIPSCaso" value="<?php echo $IdIPSCaso;?>"/></td>
		</tr>	
		<tr>
			<td class="LabelCampo"><label>Terminado:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="Terminado" name="Terminado" value="<?php echo $Terminado;?>"/></td>
		</tr>
	</table>
		

<?php
	// ********************************************** DATOS DEL PACIENTE **************************************************************
?>	
	
	<table width="100%" align="center" border="1" cellpadding="2">				
		<tr align="center">		
			<td class="EscenarioTituloModulo"><label>Datos del Paciente</label></td>
		</tr>
	</table>	
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr>
			<td width="40%" scope="col" class="LabelCampo"><label>IdPaciente:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="IdPaciente" name="IdPaciente" value="<?php echo $IdPaciente;?>"/></td>
		</tr>	
		<tr>						
			<td class="LabelCampo"><label>Primer Nombre:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="PrimerNombre" name="PrimerNombre" value="<?php echo $PrimerNombre;?>"/></td>
		</tr>	
		<tr>	
			<td class="LabelCampo"><label>Segundo Nombre:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="SegundoNombre" name="SegundoNombre" value="<?php echo $SegundoNombre;?>"/></td>
		</tr>
		<tr>			
			<td class="LabelCampo"><label>Primer Apellido:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="PrimerApellido" name="PrimerApellido" value="<?php echo $PrimerApellido;?>"/></td>
		</tr>	
		<tr>
			<td class="LabelCampo"><label>Segundo Apellido:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="SegundoApellido" name="SegundoApellido" value="<?php echo $SegundoApellido;?>"/></td>
		</tr>
		<tr>			
			<td class="LabelCampo"><label>Tipo documento:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="IdTipoDocIdent" name="IdTipoDocIdent" value="<?php echo $IdTipoDocIdent;?>"/></td>
		</tr>	
		<tr>
			<td class="LabelCampo"><label>Número:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="NumeroDocIdentidad" name="NumeroDocIdentidad" value="<?php echo $NumeroDocIdentidad;?>"/></td>
		</tr>
		<tr>			
			<td class="LabelCampo"><label>Sexo:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="Sexo" name="Sexo" value="<?php echo $Sexo;?>"/></td>
		</tr>	
		<tr>
			<td class="LabelCampo"><label>Fecha de nacimiento:</label></td>
			<td><input class="InputCampo" style="width:99%;" type="date" readonly id="FechaNacimiento" name="FechaNacimiento" value="<?php echo $FechaNacimiento;?>"/></td>
		</tr>	
	</table>	
	

<?php
	mysqli_close($con);	
	// ********************************************** INICIAR CONTROLES - ESCENARIO 1 **************************************************************
?>		
	
	<table width="100%" border="1" align="center" cellspacing="2">				
		<tr align="center">		
			<td class="EscenarioTituloModulo"><label>Escenario 1</label></td>
		</tr>
	</table>	

	<table width="100%" align="center" border="1" cellpadding="2">				
		<tr>
			<td width="40%" scope="col" class="LabelCampo"><label>IPS inició escenario:</label></td>
		</tr>	
		<tr>	
			<td><input class="InputCampo" style="width:99%;" type="text" readonly id="NombreIPSEscenario" name="NombreIPSEscenario" value="<?php echo $NombreIPSEscenario;?>"/></td>
		</tr>
	</table>
			
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label>Consecutivo:</label></td>
			<td><input class="InputCampo" type="text" id="ConsecutivoAdmision" name="ConsecutivoAdmision" style="width:99%;" value="<?php echo $paramConsecutivoAdmision;?>" /></td>
		</tr>	
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="IdIPSEscenario">IPS:</label></td>
			<td><input class="InputCampo" disabled type="text" id="IdIPSEscenario" name="IdIPSEscenario" style="width:20%;" value="<?php echo $paramIdIPSEscenario;?>" /></td>
		</tr>
		
		<tr align="left">
			<td width="30%" scope="col" class="LabelCampo"><label>Inicio:</label></td>
			<td><input class="InputCampo" disabled type="datetime" id="FechaHoraInicioEscenario" name="FechaHoraInicioEscenario" style="width:99%;" value="<?php echo $paramFechaHoraInicioEscenario;?>" /></td>
		</tr>
		<tr align="left">	
			<td class="LabelCampo"><label>Cierre:</label></td>
			<td><input class="InputCampo" disabled type="datetime" id="FechaHoraCierreEscenario" name="FechaHoraCierreEscenario" style="width:99%;" value="<?php echo $paramFechaHoraCierreEscenario;?>" /></td>
		</tr>					
		<tr align="left">	
			<td class="LabelCampo"><label>Cerrado:</label></td>
			<td><input class="InputCampo" disabled type="text" id="EscenarioCerrado" name="EscenarioCerrado"  style="width:20%;" value="<?php echo $paramEscenarioCerrado;?>" /></td>			
		</tr>		
		<tr align="left">
			<td class="LabelCampo"><label>IdEscenario:</label></td>
			<td><input class="InputCampo" disabled type="text" id="IdEscenario" name="IdEscenario"  style="width:20%;" value="<?php echo $paramIdEscenario;?>" /></td>
		</tr>
	</table>
									
<?php
	// ********************************************** TRIAGE **************************************************************
?>			

<div  id="mudulo_triage" name="mudulo_triage">

	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
    	<td class="EscenarioTituloModulo"><label>Triage</label></td>
    </tr>
	</table>
		
	<table width="100%" align="center" border="1" cellpadding="2">	
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="TriageBreveHC">*Breve Historia Clínica:</label></td>
			<td><textarea rows=5 id="TriageBreveHC" name="TriageBreveHC" class="InputCampo" style="width:99%; height:180px;"><?php echo $paramTriageBreveHC;?></textarea><br></td>
		</tr>						
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="NivelTriage">*Nivel de Triage:</label></td>
			<td>
				<select class="InputCampo" id="NivelTriage" name="NivelTriage" style="width: 100%;" size="1" onchange="NivelTriage_OnChange()">	
					<option value=-1 <?php echo optionselected(-1,$paramNivelTriage);?> disabled >Seleccionar...</option>
					<option value=1 <?php echo optionselected(1,$paramNivelTriage);?> >1</option>
					<option value=2 <?php echo optionselected(2,$paramNivelTriage);?> >2</option>
				</select>
			</td>
		</tr>
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="TriageMedioIngreso">*Medio de Ingreso del paciente:</label></td>
			<td><textarea rows=3 id="TriageMedioIngreso" name="TriageMedioIngreso" class="InputCampo" style="width:99%; height:180px;"><?php echo $paramTriageMedioIngreso;?></textarea><br>(propios medios, remisión o traslado en ambulancia)</td>
	</table>	
	
	<table width="100%" align="center" border="1" cellpadding="2">						
		<tr align="center"><td>				
				<input class="Boton" class="Titulo1" id="btnContinuarEnTriage" name="btnContinuarEnTriage" type="submit" value="Guardar Triage y continuar" onclick="btnContinuarEnTriage_OnClick()"/>
			</td></tr>
	</table>
</div>		
	
<?php
	// ********************************************** TIEMPO DEL EVENTO **************************************************************
?>	

<div hidden id="mudulo_tiempoevento" name="mudulo_tiempoevento">
		
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
			<td class="EscenarioTituloModulo"><label>Tiempo del evento</label></td>
    	</tr>
	</table>	
	
	<table width="100%" align="center" border="1" cellpadding="2">	
		<tr align="left">
			<td width="40%">
				<label class="LabelCampo" style="width:100%;">Llegada a puerta de Urgencias:</label>
			</td>
			<td>			
				<input class="InputCampo" type="date" id="FechaLlegadaPuertaUrgencias" name="FechaLlegadaPuertaUrgencias" style="width:99%;" value="<?php echo $paramFechaLlegadaPuertaUrgencias;?>" />
				<input class="InputCampo" type="time" id="HoraLlegadaPuertaUrgencias" name="HoraLlegadaPuertaUrgencias" style="width:99%;" value="<?php echo $paramHoraLlegadaPuertaUrgencias;?>" />
				<input class="Boton" id="btnFechaHoraLlegadaPuertaUrgencias" name="btnFechaHoraLlegadaPuertaUrgencias" type="submit" value="Fecha/Hora actual" onclick="$('#FechaLlegadaPuertaUrgencias').val(fechaActual());$('#HoraLlegadaPuertaUrgencias').val(horaActual());"/>
			</td>
		</tr>				
	</table>
	
			
	<table width="100%" align="center" border="1" cellpadding="2">							
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="WakeUpStroke">*¿ACV del despertar o no presenciado?</label></td><td style="width:80%;">			
				<select class="InputCampo" id="WakeUpStroke" name="WakeUpStroke" style="width: 100%;" size="1" onchange="WakeUpStroke_OnChange()">	
					<option value=-1 <?php echo optionselected(-1,$paramWakeUpStroke);?> disabled >Seleccionar...</option>
					<option value=0 <?php echo optionselected(0,$paramWakeUpStroke);?> >NO</option>
					<option value=1 <?php echo optionselected(1,$paramWakeUpStroke);?> >SI</option>	
				</select>
			</td>
		</tr>
	</table>

	<table hidden id="tableInicioSintomas" name="tableInicioSintomas" width="100%" align="center" border="1" cellpadding="2">							
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label >Inicio de los síntomas:</label></td>
			<td>			
				<input class="InputCampo" type="date" id="FechaInicioSintomas" name="FechaInicioSintomas" style="width:99%;" value="<?php echo $paramFechaInicioSintomas;?>" />
				<input class="InputCampo" type="time" id="HoraInicioSintomas" name="HoraInicioSintomas" style="width:99%;" value="<?php echo $paramHoraInicioSintomas;?>" />
			</td>
		</tr>
									
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="TiempoEvolucionHoras">Tiempo de Evolución (horas):</label></td>
			<td>			
				<input class="InputCampo" type="text" id="TiempoEvolucionHoras" name="TiempoEvolucionHoras" style="width:220px;" value="<?php echo $paramTiempoEvolucionHoras;?>" onchange="TiempoEvolucionHoras_OnChange();" /> horas 
				<input class="Boton" id="calcularTiempoEvolucionHoras" name="calcularTiempoEvolucionHoras" type="submit" value="Calcular horas" 
					onclick="calcularTiempoEvolucionHoras_OnClick();"/>
			</td>
		</tr>	

		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="IdTipoTiempo">*Ventana de Tiempo:</label></td>
			<td>			
				<select class="InputCampo" id="IdTipoTiempo" name="IdTipoTiempo" style="width:100%;" size="1" onchange="IdTipoTiempo_OnChange()">	
					<?php echo $tipotiempo_options;?>
				</select>
			</td>
		</tr>
	</table>

	<table width="100%" align="center" border="1" cellpadding="2">						
		<tr align="center"><td>				
				<input class="Boton" id="btnContinuarEnTiempoEvento" name="btnContinuarEnTiempoEvento" type="submit" value="Guardar Tiempo y continuar" onclick="btnContinuarEnTiempoEvento_OnClick()"/>
			</td></tr>
	</table>
			
</div>		
	
<?php
	// ********************************************** ACTIVACION CODIGO ACV **************************************************************
?>	

<div hidden id="mudulo_activacioncodigoacv" name="mudulo_activacioncodigoacv">
	
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
    	<td class="EscenarioTituloModulo"><label>Activación código ACV</label></td>
    </tr>
	</table>
		
	<table width="100%" align="center" border="1" cellpadding="2">				
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="EscalaBEFAST">*Escala BE-FAST:</label></td>
			<td>
				<input class="InputCampo" type="text" id="EscalaBEFAST" name="EscalaBEFAST" style="width:60px;" value="<?php echo $paramEscalaBEFAST;?>" onchange="EscalaBEFAST_OnChange();" />
				<input class="Boton" id="btnCalcEscalaBEFAST" name="btnCalcEscalaBEFAST" type="submit" value="Iniciar" 
						onclick="btnCalcMatriz_OnClick(<?php echo $paramIdEscenario;?>, 3, 24, 'divEscalaBEFAST', 'EscalaBEFAST')"/>
				<br/>
				<input class="Boton" id="btnCalcEscalaBEFASTAbrir" name="btnCalcEscalaBEFASTAbrir" type="submit" value="Abrir" 
						onclick="$('#divEscalaBEFAST').show();"/>					
				<input class="Boton" id="btnCalcEscalaBEFASTCerrar" name="btnCalcEscalaBEFASTCerrar" type="submit" value="Cerrar" 
						onclick="$('#divEscalaBEFAST').hide();"/><br>
			</td>
		</tr>
	</table>		
	<table width="100%" align="center" border="1" cellpadding="2">				
    <tr>
       <td>
				<div hidden id="divEscalaBEFAST" name="divEscalaBEFAST" style="width:100%; border:1px">                  
        </div>
       </td>
		</tr>
	</table>
	
	<table id="tableCodigoACVActivado" name="tableCodigoACVActivado" width="100%" align="center" border="1" cellpadding="2">						
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="CodigoACVActivado">*¿Activar Código ACV?</label></td><td style="width:80%;">
				<select class="InputCampo" disabled id="CodigoACVActivado" name="CodigoACVActivado" style="width: 100%;" size="1" onchange="CodigoACVActivado_OnChange();">	
					<option value=-1 <?php echo optionselected(-1,$paramCodigoACVActivado);?> disabled >Seleccionar...</option>
					<option value=0 <?php echo optionselected(0,$paramCodigoACVActivado);?> >NO</option>
					<option value=1 <?php echo optionselected(1,$paramCodigoACVActivado);?> >SI</option>
				</select>
			</td>
		</tr>	
	</table>		

	<table width="100%" align="center" border="1" cellpadding="2">						
		<tr align="center"><td>				
				<input class="Boton" id="btnContinuarEnActivacionCodigoACV" name="btnContinuarEnActivacionCodigoACV" type="submit" value="Guardar Activar y continuar" onclick="btnContinuarEnActivacionCodigoACV_OnClick()"/>
			</td></tr>
	</table>
	
</div>				

<?php
	// ********************************************** HISTORIA CLINICA **************************************************************
?>

<div hidden id="mudulo_historiaclinica" name="mudulo_historiaclinica">


	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
    	<td class="EscenarioTituloModulo"><label>Historia Clínica</label></td>
  	</tr>
	</table>
	
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label>*Edad (años):</label></td>
			<td class="InputCampo">
				<input class="InputCampo" type="number" id="Edad" name="Edad" style="width:150px;" value="<?php echo $paramEdad;?>" /> años <br/>
				<input class="Boton" id="btnCalcularEdad" name="btnCalcularEdad" type="submit" value="Calcular edad" onclick="calcularEdad_OnClick();"/>
			</td>
		</tr>
	</table>
	
	<table width="100%" align="center" border="1" cellpadding="2">		
		<tr align="left">
			<td width="100%" class="LabelCampo" colspan="2"><label for="SignosSintomasNeurologicos">*Signos y síntomas neurológicos:</label></td>
    </tr> 
    <tr align="left">
    	<td width="100%" colspan="2"><textarea class="InputCampo" rows=10 id="SignosSintomasNeurologicos" name="SignosSintomasNeurologicos" style="width:99%; height:150px;"><?php echo $paramSignosSintomasNeurologicos;?></textarea></td>
		</tr>
		<tr align="left">
			<td width="40%" class="LabelCampo" colspan="2"><label for="AntecedentesMedicosRelevantes">Antecedentes médicos relevantes:</label></td>
    </tr> 
    <tr align="left">      
      <td width="100%" colspan="2">
      	<textarea class="InputCampo" rows=10 id="AntecedentesMedicosRelevantes" name="AntecedentesMedicosRelevantes" style="width:99%; height:150px;"><?php echo $paramAntecedentesMedicosRelevantes;?></textarea>
      </td>
		</tr>
 	</table>
   
 	<table id="tableIdTipoAntecedente" name="tableIdTipoAntecedente" width="100%" align="center" border="1" cellpadding="2">	   
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="IdTipoAntecedente">agregar antecedente:</label></td>  
    </tr>
    <tr align="left">
    	<td>	
				<select class="InputCampo" id="IdTipoAntecedente" name="IdTipoAntecedente" style="width: 100%;" size="1" onchange="IdTipoAntecedente_OnChange()">	
					<?php echo $tipoantecedentes_options;?>
				</select>
			</td>
		</tr>
  </table>		

  <table width="100%" align="center" border="1" cellpadding="2">		
		<tr align="left">
			<td width="100%" class="LabelCampo" colspan="2"><label for="Hallazgos relevantes">Hallazgos Relevantes:</label></td>
     </tr> 
    <tr align="left"> 
    	<td width="100%" colspan="2">       
				<textarea class="InputCampo" rows=10 id="HallazgosRelevantes" name="HallazgosRelevantes" style="width:99%; height:150px;"><?php echo $paramHallazgosRelevantes;?></textarea></td>
		</tr>		
	</table>	

	<table width="100%" align="center" border="1" cellpadding="2">		
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label>*¿Antecedente anticoagulante oral?</label></td>
			<td>	
				<select class="InputCampo" id="AntecedenteAnticoagulantesOrales" name="AntecedenteAnticoagulantesOrales" style="width: 100%;" size="1" onchange="AntecedenteAnticoagulantesOrales_OnChange()">	
					<option value=-1 <?php echo optionselected(-1,$paramAntecedenteAnticoagulantesOrales);?> disabled >Seleccionar...</option>
					<option value=0 <?php echo optionselected(0,$paramAntecedenteAnticoagulantesOrales);?> >NO</option>
					<option value=1 <?php echo optionselected(1,$paramAntecedenteAnticoagulantesOrales);?> >SI</option>
				</select>						
			</td>
		</tr>
	</table>	
		
	<table hidden id="TableIdAnticoagulanteOral" name="TableIdAnticoagulanteOral" width="100%" align="center" border="1" cellpadding="2">		
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="IdAnticoagulanteOral">¿cuál?</label>
			</td>
			<td>		
				<select class="InputCampo" id="IdAnticoagulanteOral" name="IdAnticoagulanteOral" style="width: 100%;" size="1">	
					<?php echo $anticoagulantesorales_options;?>
				</select>
			</td>
		</tr>		
	</table>
	
	<table width="100%" align="center" border="1" cellpadding="2">						
		<tr align="center"><td>				
				<input class="Boton" id="btnContinuarEnHistoriaClinica" name="btnContinuarEnHistoriaClinica" type="submit" value="Guardar Historia y continuar" onclick="btnContinuarEnHistoriaClinica_OnClick()"/>
			</td></tr>
	</table>	
</div>	

	
<?php
	// ********************************************** LABORATORIO **************************************************************
?>

<div hidden id="mudulo_laboratorio" name="mudulo_laboratorio">

	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
			<td width="100%"><label class="EscenarioTituloModulo">Resultados de Laboratorio</label></td>
		</tr>
	</table>	
	
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label>*Glucometría inicial:</label></td>
			<td>
				<input class="InputCampo" type="text" id="LabGlucometria" name="LabGlucometria"  style="width:200px;" value="<?php echo $paramLabGlucometria;?>" onchange="Glucometria_OnChange();" /><br>
			</td>
		</tr>
	</table>
	
	<table hidden id="tablePersistenSintomasLuegoDextrosa" name="tablePersistenSintomasLuegoDextrosa" width="100%" align="center" border="1" cellpadding="2">							
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="PersistenSintomasLuegoDextrosa">¿Persisten los síntomas luego de suministrar Dextrosa?</label></td>
			<td>			
				<select class="InputCampo" id="PersistenSintomasLuegoDextrosa" name="PersistenSintomasLuegoDextrosa" style="width: 100%;" size="1" onchange="PersistenSintomasLuegoDextrosa_OnChange()">	
					<option value=-1 <?php echo optionselected(-1,$paramPersistenSintomasLuegoDextrosa);?> disabled >Seleccionar...</option>
					<option value=0 <?php echo optionselected(0,$paramPersistenSintomasLuegoDextrosa);?> >NO</option>
					<option value=1 <?php echo optionselected(1,$paramPersistenSintomasLuegoDextrosa);?> >SI</option>	
				</select>
			</td>
		</tr>
	</table>	

	<table width="100%" align="center" border="1" cellpadding="2">						
		<tr align="center"><td>				
				<input class="Boton" id="btnContinuarEnLaboratorio" name="btnContinuarEnLaboratorio" type="submit" value="Guardar Laboratorio y continuar" onclick="btnContinuarEnLaboratorio_OnClick()"/>
			</td></tr>
	</table>	
</div>	

<?php
	// ********************************************** EXAMEN FISICO **************************************************************
?>

<div hidden id="mudulo_examenfisico" name="mudulo_examenfisico">

	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
    	<td class="EscenarioTituloModulo"><label>Examen Físico</label></td>
    </tr>
		<tr align="left">
			<td width="100%" class="LabelCampo"><label for="ExamenNeurologico">*Examen Neurológico:</label></td>
     </tr> 
    <tr align="left">
    	<td width="100%">      
				<textarea class="InputCampo" rows=10 id="ExamenNeurologico" name="ExamenNeurologico" style="width:100%; height:150px;"><?php echo $paramExamenNeurologico;?></textarea>
    	</td>
		</tr>	
	</table>	
	
	<table width="100%" align="center" border="1" cellpadding="2">							
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="HuboReanimacionCardiopulmonar">*¿Hubo necesidad de reanimación cardiopulmonar?</label></td><td style="width:80%;">			
				<select class="InputCampo" id="HuboReanimacionCardiopulmonar" name="HuboReanimacionCardiopulmonar" style="width: 100%;" size="1">	
					<option value=-1 <?php echo optionselected(-1,$paramHuboReanimacionCardiopulmonar);?> disabled >Seleccionar...</option>
					<option value=0 <?php echo optionselected(0,$paramHuboReanimacionCardiopulmonar);?> >NO</option>
					<option value=1 <?php echo optionselected(1,$paramHuboReanimacionCardiopulmonar);?> >SI</option>	
				</select>
			</td>
		</tr>
	</table>
	
	<table width="100%" align="center" border="1" cellpadding="2">				
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="EscalaGlasgow">*Escala Coma Glasgow (Nivel de conciencia):</label></td><td style="width:80%;">
				<input class="InputCampo" type="text" id="EscalaGlasgow" name="EscalaGlasgow" style="width:200px;" value="<?php echo $paramEscalaGlasgow;?>" onchange="EscalaGlasgow_OnChange();" />
				<input class="Boton" id="btnCalcEscalaGlasgow" name="btnCalcEscalaGlasgow" type="submit" value="Iniciar" 
						onclick="btnCalcMatriz_OnClick(<?php echo $paramIdEscenario;?>, 1, 1, 'divEscalaGlasgow', 'EscalaGlasgow')"/>
				<br/>
				<input class="Boton" id="btnCalcEscalaGlasgowAbrir" name="btnCalcEscalaGlasgowAbrir" type="submit" value="Abrir" 
						onclick="$('#divEscalaGlasgow').show();"/>					
				<input class="Boton" id="btnCalcEscalaGlasgowCerrar" name="btnCalcEscalaGlasgowCerrar" type="submit" value="Cerrar" 
						onclick="$('#divEscalaGlasgow').hide();"/>
				<br>
			</td>
		</tr>
	</table>		
	<table width="100%" align="center" border="1" cellpadding="2">				
    <tr>
       <td>
				<div hidden id="divEscalaGlasgow" name="divEscalaGlasgow" style="width:100%; border:1px">                  
        </div>
       </td>
		</tr>
	</table>
		
	<table width="100%" align="center" border="1" cellpadding="2">						
		<tr align="center"><td>				
				<input class="Boton" id="btnContinuarEnExamenFisico" name="btnContinuarEnExamenFisico" type="submit" value="Guardar Examen y continuar" onclick="btnContinuarEnExamenFisico_OnClick()"/>
			</td></tr>
	</table>			
			
</div>					
	

<?php
	// ********************************************** EVALUACION DE VENTANA **************************************************************
?>						
	

<div hidden id="mudulo_evaluacionventana" name="mudulo_evaluacionventana">

	<table width="100%" align="center" border="1" cellpadding="2">
		<tr class="EscenarioTituloModulo" align="center"><td >Evaluación de Ventana de Tratamiento y de Escalas</label></td></tr>
	</table>		
	
	<table width="100%" align="center" border="1" cellpadding="2">		
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="InicioEstatina">Recomienda Inicio Prevención con Antiplaquetario y Estatina:</label></td>
			<td style="width:80%;"><input class="InputCampo" disabled type="text" id="InicioEstatina" name="InicioEstatina" style="width:40px;" value="<?php echo $paramInicioEstatina;?>" /><br></td>
		</tr>
	</table>	
			
	<table id="tabla_persistensintomasGlasgowMayor8" name="tabla_persistensintomasGlasgowMayor8" width="100%" align="center" border="1" cellpadding="2">							
		<tr align="left">
			<td width="40%" scope="col" class="LabelCampo"><label for="PersistenSintomasGlasgowMayor8">*¿Persisten los síntomas con Glasgow mayor a 8?</label></td><td style="width:80%;">			
				<select class="InputCampo" id="PersistenSintomasGlasgowMayor8" name="PersistenSintomasGlasgowMayor8" style="width: 100%;" size="1" onchange="PersistenSintomasGlasgowMayor8_OnChange();">	
					<option value=-1 <?php echo optionselected(-1,$paramPersistenSintomasGlasgowMayor8);?> disabled >Seleccionar...</option>
					<option value=0 <?php echo optionselected(0,$paramPersistenSintomasGlasgowMayor8);?> >NO</option>
					<option value=1 <?php echo optionselected(1,$paramPersistenSintomasGlasgowMayor8);?> >SI</option>	
				</select>
			</td>
		</tr>
	</table>	
	
	<div hidden id="tableMatrizEscalaFASTED" name="tableMatrizEscalaFASTED">
	
		<table width="100%" align="center" border="1" cellpadding="2">
			<tr class="EscenarioTituloModulo" align="center"><td>Sospecha de ACV isquémico</label></td></tr>
		</table>
	
		<table width="100%" align="center" border="1" cellpadding="2">									
			<tr align="left">
				<td width="40%" scope="col" class="LabelCampo"><label for="EscalaFASTED">*Escala FAST-ED (probabilidad de oclusion de vaso grande):</label></td><td style="width:80%;">
					<input class="InputCampo" type="text" id="EscalaFASTED" name="EscalaFASTED" style="width:40px;" value="<?php echo $paramEscalaFASTED;?>" onchange="EscalaFASTED_OnChange();"/>
					<input class="Boton" id="btnCalcEscalaFASTED" name="btnCalcEscalaFASTED" type="submit" value="Iniciar" onclick="btnCalcMatriz_OnClick(<?php echo $paramIdEscenario;?>, 1, 7, 'divMatrizEscalaFASTED', 'EscalaFASTED')"/>
					<input class="Boton" id="btnCalcMatrizEscalaFASTEDAbrir" name="btnCalcMatrizEscalaFASTEDAbrir" type="submit" value="Abrir" 
							onclick="$('#divMatrizEscalaFASTED').show();"/>				
					<input class="Boton" id="btnCalcMatrizEscalaFASTEDCerrar" name="btnCalcMatrizEscalaFASTEDCerrar" type="submit" value="Cerrar" 
							onclick="$('#divMatrizEscalaFASTED').hide();"/>							
					<br>
				</td>
			</tr>
		</table>
		<table width="100%" align="center" border="1" cellpadding="2">						
			<tr>
				<td>
					<div hidden id="divMatrizEscalaFASTED" name="divMatrizEscalaFASTED" style="width:100%; border:1px">
					
					</div>
				</td>
		</tr>
		</table>
	</div>	
		
	<div hidden id="tablaPredictorACVIsquemicoCircPosterior" name="tablaPredictorACVIsquemicoCircPosterior">
		<table width="100%" align="center" border="1" cellpadding="2">				
			<tr align="left">
				<td width="40%" scope="col" class="LabelCampo"><label for="PredictorACVIsquemicoCircPosterior">*Predictor ACV isquémico de circulación Posterior:</label></td><td style="width:80%;">
					<input class="InputCampo" type="text" id="PredictorACVIsquemicoCircPosterior" name="PredictorACVIsquemicoCircPosterior" style="width:40px;" value="<?php echo $paramPredictorACVIsquemicoCircPosterior;?>" 
					onchange="PredictorACVIsquemicoCircPosterior_OnChange();" />
					<input class="Boton" id="btnCalcPredictorACVIsquemicoCircPosterior" name="btnCalcPredictorACVIsquemicoCircPosterior" type="submit" value="Iniciar" onclick="btnCalcMatriz_OnClick(<?php echo $paramIdEscenario;?>, 1, 5, 'divMatrizPredictorACVIsquemicoCircPosterior', 'PredictorACVIsquemicoCircPosterior')"/>
					<input class="Boton" id="btnCalcPredictorACVIsquemicoCircPosteriorAbrir" name="btnCalcPredictorACVIsquemicoCircPosteriorAbrir" type="submit" value="Abrir" 
							onclick="$('#divMatrizPredictorACVIsquemicoCircPosterior').show();"/>				
					<input class="Boton" id="btnCalcPredictorACVIsquemicoCircPosteriorCerrar" name="btnCalcPredictorACVIsquemicoCircPosteriorCerrar" type="submit" value="Cerrar" 
							onclick="$('#divMatrizPredictorACVIsquemicoCircPosterior').hide();"/>									
					<br>
				</td>
			</tr>
		</table>
		<table width="100%" align="center" border="1" cellpadding="2">						
			<tr>
				<td>
					<div hidden id="divMatrizPredictorACVIsquemicoCircPosterior" name="divMatrizPredictorACVIsquemicoCircPosterior" style="width:100%; border:1px">					
					</div>
				</td>
			</tr>
		</table>
		
		<table hidden id="tableIdTipoCircIsque" name="tableIdTipoCircIsque" width="100%" align="center" border="1" cellpadding="2">						
			<tr align="left">
				<td width="40%" scope="col" class="LabelCampo"><label for="IdTipoCircIsque">*Tipo de Circulación Isquémica:</label></td><td style="width:80%;">			
					<select class="InputCampo" disabled id="IdTipoCircIsque" name="IdTipoCircIsque" style="width: 100%;" size="1" onchange="IdTipoCircIsque_OnChange()">	
						<?php echo $tipocircisque_options;?>
					</select>
				</td>
			</tr>
		</table>
				
	</div>	

<?php
	//  ********************************************** TIA O MIMIC  **************************************************************
?>	
	
	<div hidden id="mudulo_tiaomimic" name="mudulo_tiaomimic">
		
		<table width="100%" align="center" border="1" cellpadding="2">
			<tr class="EscenarioTituloModulo" align="center"><td >AIT o MIMIC</label></td></tr>
		</table>
					
		<table id="tableAsemejaACVoMimic" name="tableAsemejaACVoMimic" width="100%" align="center" border="1" cellpadding="2">						
			<tr align="left">
				<td width="40%" scope="col" class="LabelCampo"><label for="AsemejaACVoMimic">*¿Asemeja a ACV o Mimic? (epilepsia, parálisis facial, trastorno conversivo...)</label></td><td style="width:80%;">
					<select class="InputCampo" id="AsemejaACVoMimic" name="AsemejaACVoMimic" style="width: 100%;" size="1" onchange="AsemejaACVoMimic_OnChange()">	
						<option value=-1 <?php echo optionselected(-1,$paramAsemejaACVoMimic);?> disabled >Seleccionar...</option>
						<option value=0 <?php echo optionselected(0,$paramAsemejaACVoMimic);?> >NO</option>
						<option value=1 <?php echo optionselected(1,$paramAsemejaACVoMimic);?> >SI</option>
					</select>
				</td>
			</tr>
		</table>
				
		<div hidden id="tableEscalaABCD2" name="tableEscalaABCD2">		
			<table width="100%" align="center" border="1" cellpadding="2">	
				<tr align="left">
					<td width="40%" scope="col" class="LabelCampo"><label for="EscalaABCD2">*Sospecha de AIT. Escala ABCD2 (Riesgo ACV luego de AIT):</label></td><td style="width:80%;">
						<input class="InputCampo" type="text" id="EscalaABCD2" name="EscalaABCD2" style="width:40px;" value="<?php echo $paramEscalaABCD2;?>" onchange="EscalaABCD2_OnChange();"/>
						<input class="Boton" id="btnCalcEscalaABCD2" name="btnCalcEscalaABCD2" type="submit" value="Iniciar" onclick="btnCalcMatriz_OnClick(<?php echo $paramIdEscenario;?>, 1, 6, 'divMatrizEscalaABCD2', 'EscalaABCD2')"/>
						<input class="Boton" id="btnCalcEscalaABCD2Abrir" name="btnCalcEscalaABCD2Abrir" type="submit" value="Abrir" 
								onclick="$('#divMatrizEscalaABCD2').show();"/>										
						<input class="Boton" id="btnCalcEscalaABCD2Cerrar" name="btnCalcEscalaABCD2Cerrar" type="submit" value="Cerrar" 
								onclick="$('#divMatrizEscalaABCD2').hide();"/>							
						<br>
					</td>
				</tr>
			</table>
			<table width="100%" align="center" border="1" cellpadding="2">						
				<tr>
					<td>
						<div hidden id="divMatrizEscalaABCD2" name="divMatrizEscalaABCD2" style="width:100%; border:1px">						
						</div>
					</td>
			</tr>
			</table>
			<table width="100%" align="center" border="1" cellpadding="2">	    
				<tr align="left">
					<td width="40%" scope="col" class="LabelCampo"><label for="RiesgoACVa2dias">Riesgo de ACV a 2 días:</label></td>
					<td><input class="InputCampo" disabled type="text" id="RiesgoACVa2dias" name="RiesgoACVa2dias" style="width:40px;" value="<?php echo $paramRiesgoACVa2dias;?>" /></td>
				</tr>
				<tr align="left">
					<td width="40%" scope="col" class="LabelCampo"><label for="RiesgoACVa7dias">Riesgo de ACV a 7 días:</label></td>
					<td><input class="InputCampo" disabled type="text" id="RiesgoACVa7dias" name="RiesgoACVa7dias"  style="width:40px;" value="<?php echo $paramRiesgoACVa7dias;?>" /></td>
				</tr>
				<tr align="left">
					<td width="40%" scope="col" class="LabelCampo"><label for="RiesgoACVa90dias">Riesgo de ACV a 90 días:</label></td>
					<td><input class="InputCampo" disabled type="text" id="RiesgoACVa90dias" name="RiesgoACVa90dias"  style="width:40px;" value="<?php echo $paramRiesgoACVa90dias;?>" /></td>
				</tr>
			</table>
		</div>	
			
	</div>	
		
</div>		


<?php
	// ********************************************** SUGERENCIA DE REMISION **************************************************************
?>
	
<div hidden id="mudulo_sugerenciaremision" name="mudulo_sugerenciaremision">
	
	<table width="100%" align="center" border="1" cellpadding="2">
		<tr align="center">
    	<td class="EscenarioTituloModulo"><label>Sugerencia de remisión/salida</label></td>
  	</tr>
	</table>	
	
	<table width="100%" align="center" border="1" cellpadding="2">		
		<table width="100%" align="center" border="1" cellpadding="2">		
			<tr align="left">
				<td width="100%" scope="col" class="LabelCampo"><label >Sugerencia de Remisión o Salida</label></td>
			</tr>
			<tr>
				<td><textarea readonly class="InputCampo" rows=5 id="SugerenciaRemision" name="SugerenciaRemision" style="width:99%; height:120px;overflow:auto;"><?php echo $paramSugerenciaRemision;?></textarea></td>					
			</tr>					
		</table>
		
		<table id="tableIdIPSReferencia" name="tableIdIPSReferencia" width="100%" align="center" border="1" cellpadding="2">		
			<tr align="left">
				<td width="100%" class="LabelCampo"><label for="IdIPSReferencia">*IPS de Referencia:</label></td>
          	</tr> 
         	<tr align="left"> 
            	<td width="100%">         		
					<select class="InputCampo" id="IdIPSReferencia" name="IdIPSReferencia" style="width: 100%;" size="1" onchange="IdIPSReferencia_OnChange()">	
						<?php echo $ips_options;?>
					</select>
				</td>
			</tr>	
		</table>
		
		<table width="100%" align="center" border="1" cellpadding="2">				
			<tr align="left">
				<td class="LabelCampo"><label style="width:100%;">*Fecha/Hora remisión o salida:</label></td>
		    </tr> 
		    <tr align="left"> 
		        <td width="100%">         
					<input class="InputCampo" type="datetime" id="FechaHoraRemisionAIPSReferencia" name="FechaHoraRemisionAIPSReferencia" style="width:99%;" value="<?php echo $paramFechaHoraRemisionAIPSReferencia;?>"/>
				</td>
			</tr>		
			<tr align="center">
				<td>					
					<input class="Boton" id="btnAsignarFechaHoraRemisionAIPSReferencia" name="btnAsignarFechaHoraRemisionAIPSReferencia" type="submit" value="Fecha/Hora actual" onclick="$('#FechaHoraRemisionAIPSReferencia').val(fechahoraActual());"/>
				</td>
			</tr>
		</table>
</div>			

<?php
	// ********************************************** GUARDAR Y CERRAR **************************************************************
?>

<div id="divGuardarEscenario" name="divGuardarEscenario">	
	<table width="100%" align="center" border="1" cellpadding="2">				
		<tr align="center">
			<td>		
				<input class="Boton" id="btnGuardarEscenario" name="btnGuardarEscenario" type="button" style="width:300px;" value="Guardar" onclick="btnGuardarEscenario_OnClick();"/>
				<input class="Boton" id="btn_cerrar" name="btn_cerrar" type="button" style="width:500px;" value="Cerrar y suspender" onclick="btnGuardarEscenario_OnClick(); btnBack_OnClick();"/>
								
				<div hidden id="divCerrarEscenario" name="divCerrarEscenario">
					<form name="form_regeresar" action="../seleccion.php" target="" method="post" onsubmit="return onsubmit_CerrarEscenario();">					
						<input class="Boton" id="btnCerrarEscenario" name="btnCerrarEscenario" type="submit" style="width:600px;" value="Guardar y terminar"/>
					</form>			
				</div>
			</td>
		</tr>
	</table>
</div>
				
</table>	
	    	
<input type="hidden" id="IdTipoEscenarioReferencia" name="IdTipoEscenarioReferencia" value="<?php echo $paramIdTipoEscenarioReferencia;?>"/>

<input type="hidden" id="listaCampos" name="listaCampos" value="<?php echo $paramlistaCampos;?>"/>
<input type="hidden" id="ultimomodulo" name="ultimomodulo" value="<?php echo $paramultimomodulo;?>"/>

<?php
	// ********************************************** TIEMPOS **************************************************************
?>

<input type="hidden" id="TimeFinTriage" name="TimeFinTriage" value="<?php echo $paramTimeFinTriage;?>"/>
<input type="hidden" id="TimeFinTiempoEvento" name="TimeFinTiempoEvento" value="<?php echo $paramTimeFinTiempoEvento;?>"/>
<input type="hidden" id="TimeFinActivacionCodigoACV" name="TimeFinActivacionCodigoACV" value="<?php echo $paramTimeFinActivacionCodigoACV;?>"/>
<input type="hidden" id="TimeFinHistoriaClinica" name="TimeFinHistoriaClinica" value="<?php echo $paramTimeFinHistoriaClinica;?>"/>
<input type="hidden" id="TimeFinLaboratorio" name="TimeFinLaboratorio" value="<?php echo $paramTimeFinLaboratorio;?>"/>
<input type="hidden" id="TimeFinExamenFisico" name="TimeFinExamenFisico" value="<?php echo $paramTimeFinExamenFisico;?>"/>

<input type="hidden" id="TimeFinEscalaABCD2" name="TimeFinEscalaABCD2" value="<?php echo $paramTimeFinEscalaABCD2;?>"/>
<input type="hidden" id="TimeFinEscalaFASTED" name="TimeFinEscalaFASTED" value="<?php echo $paramTimeFinEscalaFASTED;?>"/>
<input type="hidden" id="TimeFinCircPosterior" name="TimeFinCircPosterior" value="<?php echo $paramTimeFinCircPosterior;?>"/>


</div>	
	    	
<?php		
	  include "footer.php";
?>
  </body>
</html>

				     