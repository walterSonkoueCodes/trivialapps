# Dockerfile
FROM php:8.2-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git zip unzip curl libicu-dev libpq-dev libzip-dev libonig-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activer mod_rewrite Apache pour Symfony
RUN a2enmod rewrite

# Copier les fichiers du projet
COPY . /var/www/html/

WORKDIR /var/www/html/

# Installer les dépendances Symfony
RUN composer install --no-dev --optimize-autoloader

# Droits sur le dossier var/
RUN chown -R www-data:www-data var

# Configurer le VirtualHost pour Symfony
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony
