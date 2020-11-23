<div id="contenido" align="justify">
    <?php
    //Logout

    $_SESSION['authenticated'] = false;
    session_unset();
    session_destroy();
    ?>
    <h3 class="Titulo1">Por favor ingrese con su usuario y su contraseña.</h3>
    <a class="Boton" href="../index.php">Vuelva a intentarlo</a>
</div>
