# Stonly

## Project

Backend NestJS API

## Project description database

To start working with PostgresQl you should write sudo -u postgres psql if you want to work in psql in your terminal or
run PostgreSQL server local
on your computer

Then you should write in psql:
create database stonly;
create user stonly with encrypted password '123';
grant all privileges on database stonly to stonly;

## Project description issues

If you want to do something with issues:
You need to add in Header
key: Authorization
value: Token <token which you get in registration>

## Tests

If you want to run tests you can have a problem with absolute imports and you need to change them to relative
