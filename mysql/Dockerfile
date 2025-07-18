FROM mysql:8
ADD database_dump.sh /docker-entrypoint-initdb.d/database_dump.sh
ADD application_database.sql /home/application_database.sql
RUN chmod -R 775 /docker-entrypoint-initdb.d
ENV MYSQL_ROOT_PASSWORD rootpassword
