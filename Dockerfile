FROM php:8.2-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git unzip zip curl libicu-dev libpq-dev libzip-dev libonig-dev \
    nodejs npm \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activer mod_rewrite
RUN a2enmod rewrite

# Copier le projet
COPY . /var/www/html
WORKDIR /var/www/html

# Installer dépendances PHP
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Build frontend
ENV NODE_ENV=production
RUN npm install --legacy-peer-deps
RUN npm install @symfony/webpack-encore --save-dev
RUN npm run build

# Droits Symfony
RUN chown -R www-data:www-data var public

# Apache config
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

EXPOSE 80
