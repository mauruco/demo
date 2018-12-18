#!/bin/bash
echo 'Container start'
cp docker-config/php.ini /etc/php/7.2/cli/
echo 'RUN UNIT TEST'
echo 'RUN UNIT TEST'
echo 'RUN UNIT TEST'
echo 'RUN UNIT TEST'
./phpunit
echo 'DONE'
echo 'DONE'
echo 'DONE'
echo 'DONE'