#!/bin/bash
echo 'Container first start'

apt-get update && apt-get install --assume-yes apt-utils
DEBIAN_FRONTEND=noninteractive apt-get install --assume-yes php7.2-cli php7.2-mbstring php7.2-xml php7.2-mysql zip unzip php7.2-zip curl

curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
&& ln -s $(composer config --global home) /root/composer \
&& export PATH="$PATH:/root/composer/vendor/bin"

composer install
export PATH="$PATH:~/.composer/vendor/bin"
chmod -R 777 vendor

php artisan migrate
php artisan db:seed