<table width="100%" align="center" border="1" cellpadding="2" cellspacing="2">
    <tr>
        <td><div align="left" class="LabelCampo">Usr: </div></td>
        <td><div align="center" class="InputCampo"><?php echo $_SESSION['UsuarioNombre']; ?></div></td>
        <td><div align="center" class="InputCampo"><?php echo $_SESSION['user_group']; ?></div></td>
		<td><div align="center">
			<form name="form_logout" action="logout.php" method="post">
				<input class="Boton" name="boton_logout" type="submit" align="center" value="Salir">
			</form>			
		</div></td>
    </tr>
</table>

