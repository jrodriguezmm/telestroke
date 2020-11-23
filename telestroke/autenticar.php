<?php 
session_start();

 include "cripto.php";
	
    // Desdocumentar esto para que funcione la validación
    error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR | E_COMPILE_WARNING | E_USER_NOTICE | E_USER_WARNING | E_USER_ERROR);

    $login = $_POST['UsuarioID'];
	$pw = $_POST['pass'];

	unset($_POST['UsuarioID']);
	unset($_POST['UsuarioNombre']);	
	
	unset($_POST['pass']);
			
 	if (!($pw && $login)) {
?>			
		<div  align="justify">
			<h3 class="Titulo1">Por favor ingrese con su usuario y su contraseña</h3>
			<a class="Boton" href="index.php">Vuelva a intentarlo</a>
		</div>		
<?php 					
	} else {	
				 			
		if (!isset($_SESSION[$login])) {	    
	        			
				include "db.php";
				
				$LoginRSquery = "SELECT u.* FROM usuariosacv u WHERE u.UsuarioID = '$login'" ;
				$LoginRS = mysqli_query($con,$LoginRSquery) or die(mysqli_error($con));
				$LoginNumRows = mysqli_num_rows($LoginRS);
				$LoginRows = mysqli_fetch_array($LoginRS);
	            	                
					// abre *{ 4     SI USR REPLICADO           
					//Si el usuario esta replicado

					if ($LoginNumRows > 1) {
						die('Error de usuario: Hay varios usuarios registrados con el mismo login');
					} else {
					
						// abre *{ 6	SI HAY SOLO UN USR REGISTRADO AUTENTICAR == TRUE
														
						if ($LoginNumRows == 1) {
						
						
							
							$pwd_bd = $LoginRows['UsuarioClave'];							
							$pwcorrecto = password_verify($pw, $pwd_bd);
				
							if ($pwcorrecto == 1){
																						
									$DatosUsuarioActual = array(
										'authenticated' => true,
										'login'=> $login,
										'UsuarioNombre'=> myutf8_decode($LoginRows['UsuarioNombre']),
										'user_group'=> $LoginRows['IdUsuarioTipo']);
										
									$_SESSION['datoslogin'] = $DatosUsuarioActual;	
															
									$_SESSION['authenticated'] = true;
									$_SESSION['login'] = $login;							
									$_SESSION['UsuarioNombre'] = myutf8_decode($LoginRows['UsuarioNombre']);
									
															
									$_SESSION['user_group'] = $LoginRows['IdUsuarioTipo'];
									
									// CARGAR LA INTERFAZ SI ESTA AUTENTICADO
									
									mysqli_close($con);
									
									if (!headers_sent($file, $line)) {
										header("Location: seleccion.php");
									// Trigger an error here
									} else {
										echo "Headers sent in $file on line $line";
									}  
									
									exit;
									
								} else {
 ?>									
									<div align="justify">
										<h3 style="font-size:60pt">Revise su contraseña.</h3>
										<a style="font-size:60pt" href="index.php">Vuelva a intentarlo</a>
									</div>								
<?php
								}
								
						} else {				
 ?>
							<div align="justify">
								<h3 style="font-size:60pt">Revise su nombre de usuario y su contraseña.</h3>
								<a style="font-size:60pt" href="index.php">Vuelva a intentarlo</a>
							</div>
<?php 
						}
					}
		} else {			
?>	
			<div align="justify">
				<h3 style="font-size:60pt">El usuario: <?php echo $login ?>, ya inicio sesión. Cambie de usuario.</h3>
				<a style="font-size:60pt" href="index.php">Vuelva a intentarlo</a>
			</div>
<?php
		}
	}
?> 
