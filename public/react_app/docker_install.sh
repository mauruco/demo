#!/bin/bash
# maintainer mauruco@gmail.com
apt update
apt upgrade --assume-yes
apt install --assume-yes nodejs
apt install --assume-yes npm
npm install --global npm
# restart container