#!/bin/bash
mysql -u root -prootpassword --execute "CREATE DATABASE IF NOT EXISTS contact_db;"
mysql -u root -prootpassword contact_db < /home/application_database.sql
