#!/bin/bash
echo 'entrypoint'

file='docker-config/on_container_first_start.success'
if [ ! -f "$file" ]; then
    chmod +x phpunit
    chmod +x docker-config/on_container_first_start.sh
    chmod +x docker-config/on_container_start.sh
  
    docker-config/on_container_first_start.sh
    echo > docker-config/on_container_first_start.success
fi

docker-config/on_container_start.sh

php -S 0.0.0.0:8080 -t / index.php > /dev/null &
/bin/bash