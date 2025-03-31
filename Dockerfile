# Dockerfile
FROM php:8.2-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git unzip zip curl libicu-dev libpq-dev libzip-dev libonig-dev \
    nodejs npm \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Activer mod_rewrite d'Apache (utile pour Symfony et React Router)
RUN a2enmod rewrite

# Copier le code source dans le container
COPY . /var/www/html
WORKDIR /var/www/html

# Désactiver les scripts Composer auto (symfony-cmd absent)
RUN composer install --no-dev --optimize-autoloader --no-scripts

# ⚙️ Définir l'environnement de build JS
ENV NODE_ENV=production

# Installer les dépendances JS + build Webpack (React via Encore)
RUN npm install --legacy-peer-deps && npm run build

# Assurer les bons droits sur les dossiers Symfony
RUN chown -R www-data:www-data var public

# Config Apache pour autoriser les .htaccess dans public/
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

# Exposer le port Apache
EXPOSE 80
