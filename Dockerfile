# Dockerfile
FROM php:8.2-apache

# Installer les extensions nécessaires à Symfony
RUN apt-get update && apt-get install -y \
    git unzip zip curl libicu-dev libpq-dev libzip-dev libonig-dev yarn nodejs npm \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activer mod_rewrite d'Apache
RUN a2enmod rewrite

# Copier le code source de l'application
COPY . /var/www/html

WORKDIR /var/www/html

# Installer les dépendances Symfony
RUN composer install --no-dev --optimize-autoloader

# Compiler les assets Webpack (React)
RUN yarn install && yarn build

# Assurer les bons droits d'accès
RUN chown -R www-data:www-data var public

# Configurer le VirtualHost pour Symfony
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

# Exposer le port Apache
EXPOSE 80
