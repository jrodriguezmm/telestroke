#!/bin/bash

set -e

if [[ "$1" == apache2* ]] || [ "$1" == php-fpm ]; then
		echo >&2 "Validando la instalación de melab"
        if ! [ -f index.php ]; then
                echo >&2 "melab no encontrado en $(pwd) - copiando..."
                tar cf - --one-file-system -C /usr/src/melab . | tar xf -
                chmod +x script.sh
		chmod +x sendmail.sh
		#mv /connect.inc.php ./include/connect.inc.php
		#mv /config_ldap.inc.php ./include/config_ldap.inc.php

		rm -f melab.tar
                echo >&2 "OK! melab ha sido copiado en $(pwd)"
        fi

	
	if ! [ -d /var/www/html/images ]; then
                #if ! [ "$(ls /var/www/html/images)" ]; then
			echo >&2 "Inicializando carpeta de imagenes"
                        mkdir /var/www/html/images
			cp -r /var/www/html/_images/* /var/www/html/images
			chown -R www-data:www-data /var/www/html/images
			echo >&2 "Conectando a $DBUSER"
		php /makedb.php "$DBHOST" "$DBUSER" "$DBPASS" "$DBNAME"
		fi	

        echo >&2 "========================================================================"
        echo >&2
        echo >&2 " Este contenedor esta corriendo melab!"
        echo >&2
        echo >&2 "========================================================================"
fi
chmod 775 -Rf /var/www/html/admin/error_log
echo "Docker container has been started"
/var/www/html/sendmail.sh
declare -p | grep -Ev 'BASHOPTS|BASH_VERSINFO|EUID|PPID|SHELLOPTS|UID' > /container.env

# Setup a cron schedule
echo "SHELL=/bin/bash
BASH_ENV=/container.env
20 18 * * * /var/www/html/script.sh >> /var/log/cron.log 2>&1
# This extra line makes it a valid cron" > scheduler.txt
crontab scheduler.txt
cron &
exec apache2-foreground
