НАПИСАТЬ РИДМИ КАК ЗАПУСТИТЬ
напиши в ридми в каком формате передавать данніе типа валидацию на енам добавить

To start working with PostgresQl you should write sudo -u postgres psql if you want to work in psql or run pg service
local on your computer

Then we write in psql:
create database stonly;
create user stonly with encrypted password '123';
grant all privileges on database stonly to stonly;

Authorization Token <token>