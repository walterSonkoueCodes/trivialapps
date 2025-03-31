FROM php:8.2-apache

# Installer Node.js 20.x au lieu de la version par défaut
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Installer les autres dépendances système
RUN apt-get update && apt-get install -y \
    git unzip zip libicu-dev libpq-dev libzip-dev libonig-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activer mod_rewrite Apache
RUN a2enmod rewrite

# Copier le code
COPY . /var/www/html
WORKDIR /var/www/html

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Installer les dépendances JS (y compris Encore)
RUN npm install -g npm@latest && \
    npm install --legacy-peer-deps && \
    npm install @symfony/webpack-encore --save-dev

# Build les assets
RUN npm run build

# Droits
RUN chown -R www-data:www-data var public

# Config Apache
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

EXPOSE 80
