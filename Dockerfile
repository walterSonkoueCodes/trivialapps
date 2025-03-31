FROM php:8.2-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git unzip zip curl libicu-dev libpq-dev libzip-dev libonig-dev \
    nodejs npm \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activer mod_rewrite Apache
RUN a2enmod rewrite

# Copier le code
COPY . /var/www/html
WORKDIR /var/www/html

# Installer PHP (Symfony) sans les scripts auto
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Définir l’environnement JS
ENV NODE_ENV=production

# ✅ Build avec le script `npm run build`
RUN npm install --legacy-peer-deps && npm run build

# Droits
RUN chown -R www-data:www-data var public

# Config Apache
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

EXPOSE 80
