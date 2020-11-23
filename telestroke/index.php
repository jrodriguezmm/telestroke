<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="css/telestroke.css" rel="stylesheet" type="text/css">
<title>TelestrokeRU-login</title>
    
</head>

<body>

<?php
	include "header.php";
?>              
    <div align="center">
    
        <form name="formulario" action="autenticar.php" method="post" onsubmit="return validate()">        
      		<table width="99%" border=0 cellpadding=2 cellspacing=0>
       			<tr>
          			<td class="Titulo1"></br><div align="center">Ingreso al sistema</div></br></td>
        		</tr>
			</table>
			<table width="99%" border=0 cellpadding=2 cellspacing=20>  	
        		<tr>
          			<td width="30%" class="Login" scope="col"><div align="right">Usuario: </div></td>
          			<td><input style="width:90%; height:80px;" class="Login" value="" type="text" tabindex="1" name="UsuarioID"></td>
        		</tr>
        		<tr>
          			<td class="Login"><div align="right">Contraseña: </div></td>
          			<td><input style="width:90%; height:80px;" class="Login" value="" type="password"  tabindex="2" name="pass"></td>
        		</tr>
        		<tr>
                	<td colspan=2>
                    	<div align="center">
							<br/>
                    		<input class="Boton" name="boton_submit" type="submit" value="Entrar">
							<br/>
                    	</div>
                	</td>
        		</tr>
      		</table>                    		
		</form>
  	</div>    				
                        		  				
<?php
include "footer.php";
?>

   <script language="javascript">
        function validate(){
			if (document.formulario.UsuarioID.value=="") {
                alert("Ingrese el nombre de usuario");
				document.formulario.UsuarioID.focus();    
				return false;
            }
			else if(document.formulario.pass.value=="") {
                alert("Ingrese su clave");
				document.formulario.pass.focus();                 
				return false;
            }
			else {
				return true;
			}
        }
		
	</script>  
    
</body>
</html>