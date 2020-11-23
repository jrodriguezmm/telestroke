<?php session_start(); ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link href="../css/telestroke.css" rel="stylesheet" type="text/css"/>

            <title>TelestrokeRU</title>
    </head>

    <body>

        <?php
        include "header.php";

        if (isset($_SESSION['authenticated'])) {

            //Logout

            $_SESSION['authenticated'] = false;
            $_SESSION['login'] = "";
            
            session_unset();
            session_destroy();
                        
            ?>
            <div id="contenido" align="justify">

                <h3 class="Titulo1">Ha cerrado la sesión correctamente.</h3>
                <a class="Boton" href="../index.php">Volver a la página principal</a>

            </div>
            <?php
        } else {
            ?>    
            <div id="contenido" align="justify">

                <h3 class="Titulo1">Por favor ingrese con su usuario y su contraseña</h3>
                <a class="Boton" href="../index.php">Vuelva a intentarlo</a>

            </div> 
    <?php
}

include "footer.php";
?>



    </body>
</html>
