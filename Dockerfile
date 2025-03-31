FROM php:8.2-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git unzip zip curl libicu-dev libpq-dev libzip-dev libonig-dev \
    nodejs npm \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activer mod_rewrite d'Apache (pour Symfony et React routes)
RUN a2enmod rewrite

# Copier le code source
COPY . /var/www/html
WORKDIR /var/www/html

# Installer les dépendances PHP (Symfony) sans exécuter les scripts
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Installer les dépendances JS + build React
RUN npm install --legacy-peer-deps && npm run build

# Appliquer les bons droits
RUN chown -R www-data:www-data var public

# Config Apache pour autoriser .htaccess dans /public
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

EXPOSE 80
