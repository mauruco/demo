FROM mysql:5.7

LABEL maintainer mauruco@gmail.com

EXPOSE 3306

COPY docker-config/config-file.cnf /etc/mysql/conf.d/
RUN chmod 0444 /etc/mysql/conf.d/config-file.cnf
COPY docker-config/on_build.sql /docker-entrypoint-initdb.d

ENV MYSQL_ALLOW_EMPTY_PASSWORD yes