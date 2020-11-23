FROM php:7.2-apache

#MAINTAINER Collin Maessen “experimentos.economia.uniandes@gmail.com”

# Enable Apache Rewrite Module
RUN a2enmod rewrite

# Install PHP extensions
RUN set -ex; \
	\
	savedAptMark="$(apt-mark showmanual)"; \
	\
	apt-get update; \
	apt-get install -y --no-install-recommends \
		libbz2-dev \
		libjpeg-dev \
		libldap2-dev \
		libmemcached-dev \
		libpng-dev \
		libpq-dev \
		libzip-dev \
		libfreetype6-dev \
        	libmcrypt-dev \
		libc-client-dev \
    		libkrb5-dev \
		libgmp-dev \
        	libjpeg62-turbo-dev \
        	libgeoip-dev \
        	libxml2-dev \
        	libxslt-dev \
        	libtidy-dev \
        	libssl-dev \
        	zlib1g-dev \
        	libwebp-dev \
        	libgmp-dev \
        	libaio1 \
        	apt-file \
        	wget \
	        gnupg \
	        gnupg2 \
	        gcc \
	        g++ \
	        autoconf \
	        libc-dev \
	        pkg-config \ 
	; \
	\
docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-webp-dir=/usr/include/ --with-jpeg-dir=/usr/include/; \
	
docker-php-ext-configure imap --with-imap --with-imap-ssl --with-kerberos; \
	debMultiarch="$(dpkg-architecture --query DEB_BUILD_MULTIARCH)"; \
	docker-php-ext-configure ldap --with-libdir="lib/$debMultiarch"; \
	
	docker-php-ext-install \
		bz2 \
		pdo_pgsql \
		pgsql \
		imap \
		gd \
		calendar \
		gmp \
                ldap \
		sysvmsg \
		pcntl \
		iconv \
		bcmath \
		xml \
		mbstring \
		pdo \
		tidy \
		gettext \
		intl \
		pdo_mysql \
		mysqli \
		simplexml \
		xml \
		xsl \
		xmlwriter \
		zip \
		opcache \
		exif \
		sockets \		
	; \
	\
# pecl will claim success even if one install fails, so we need to perform each install separately
	pecl install APCu-5.1.17; \
	pecl install memcached-3.1.3; \
	pecl install redis-4.3.0; \
	\
	docker-php-ext-enable \
		apcu \
		memcached \
		redis \
	; \
	\
# reset apt-mark's "manual" list so that "purge --auto-remove" will remove all build dependencies
	apt-mark auto '.*' > /dev/null; \
	apt-mark manual $savedAptMark; \
	ldd "$(php -r 'echo ini_get("extension_dir");')"/*.so \
		| awk '/=>/ { print $3 }' \
		| sort -u \
		| xargs -r dpkg-query -S \
		| cut -d: -f1 \
		| sort -u \
		| xargs -rt apt-mark manual; \
	\
	apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
	rm -rf /var/lib/apt/lists/*; \
	\
	echo "ServerName localhost" >> /etc/apache2/conf-available/fqdn.conf; \
	a2enconf fqdn
	

VOLUME /var/www/html/

COPY melab.tar melab.tar
COPY db.sql /db.sql

RUN apt-get update
RUN apt-get install -y cron
RUN apt-get install -y sendmail sendmail-cf m4
RUN mkdir /usr/src/melab && tar -xf melab.tar -C /usr/src/melab && chown -R www-data:www-data /usr/src/melab





# Copy init scripts and custom .htaccess
COPY docker-entrypoint.sh /entrypoint.sh
COPY makedb.php /makedb.php
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 80
CMD ["apache2-foreground"]
