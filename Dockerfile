FROM php:8.2-apache

# Installer dépendances système
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

# Installer les dépendances PHP (Symfony)
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Installer les dépendances JS
ENV NODE_ENV=production
RUN npm install --legacy-peer-deps

# 🛠 Force le lien de `encore` en CLI (clé du problème)
RUN ln -s ./node_modules/.bin/encore /usr/local/bin/encore

# ✅ Build avec le lien absolu
RUN encore production --progress

# Droits fichiers Symfony
RUN chown -R www-data:www-data var public

# Apache config pour .htaccess
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

EXPOSE 80
