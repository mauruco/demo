#!/bin/bash
# maintainer mauruco@gmail.com
docker run --detach --tty --publish 3000:3000 --volume $PWD:/var/www/html --workdir /var/www/html --name app_1 ubuntu:18.04