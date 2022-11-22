# Stonly 🚀

## Project

Backend NestJS API

## How to start project

1) 🧬 git clone <url> to install project on your computer
2) ✔ run "npm install" or "yarn install" to install all dependencies for a project
3) 💉 "npm start" to start server

## Project description database

To start working with PostgreSQL 🐘 you should write next commands:

1) 🐘 install postgres if you don't have it installed locally yet https://www.postgresql.org/download/
2) 🐋 "sudo -u postgres psql" if you want to work in psql in your terminal or run local PostgreSQL server on your
   computer
3) 🎀 then you should write in psql "create database stonly;"
4) 🧭 create user stonly with encrypted password '123';
5) 🛵 grant all privileges on database stonly to stonly;

## Hot to create Issues

1) ⛔ you should create(register) User
2) 💯 then login to get access token(save this token, you will need it for registration)
3) 🚚 now you can create any issue

❗️Remember to create some issue you must be Authorized. If you use postman: go to Headers -> key: Authorization ->
value: Token <token which you get in registration>

## Features

1) Add User and relations oneToMany with Issues
2) Add AuthGuard to check if we have access to the current route or not
3) Add validation pipes to get all errors in one array
4) Add queryBuilder to check issue author
5) Add columns createdAt and updatedAt to issue
6) Add issue count
7) Add issue sorting by Date
8) Add offset and limit for issue
9) Add slug and methods to find some issue by slug
10) Add decorator to check current user
11) Add middleware to check access token
12) Add a lot of interfaces to make good types
13) Add special errorResponse: IErrorResponse to send correct errors to client

## Tests

If you want to run tests you can have a problem with absolute imports and you need to change them to relative
I am so sorry,but I can't resolve this problem,because I write real e2e or unit tests 5 times in my life and I really
want to learn how to write tests and up my skill

## Prerequisites

1) 🚀 Node v18+
2) 🐘 Postgres v14+
3) 💣 Typeorm 0.3+

## Environment and DB setup

type: 'postgres',
host: 'localhost',
port: 5432,
username: 'stonly',
password: '123',
database: 'stonly',
entities: [__dirname + '/**/*.entity{.ts,.js}'],
synchronize: true,
migrations: [__dirname + '/migrations/**/*{.ts,.js}']
