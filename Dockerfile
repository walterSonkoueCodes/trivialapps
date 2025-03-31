FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git unzip zip curl libicu-dev libpq-dev libzip-dev libonig-dev yarn nodejs npm \
    && docker-php-ext-install intl pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN a2enmod rewrite

COPY . /var/www/html
WORKDIR /var/www/html

# ⬇️ ici : on évite les auto-scripts qui causent l'erreur
RUN composer install --no-dev --optimize-autoloader --no-scripts

RUN yarn install && yarn build

RUN chown -R www-data:www-data var public

RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

EXPOSE 80
