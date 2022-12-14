# Break Time

- Tea Break : 12:00 (15 Minutes)
- Lunch Break : 02:00 (50 Minutes)
- Tea Break : 4:15 (15 Minutes)

# Lab Setup

- NodeJS Installer v14
- VS Code
- Permission to install NPM libraries
- MongoDB / MongoDB Cloud (GMAIL Credentials)
- Mongo Compass (GUI)

# NodeJS Installer - 30Mb

- Node Runtime Environment (NRE)
- Node Native Modules
- Node Package Manager (NPM)

# Async Code

- Timers
- XMLHttpRequest (Remote Server) Calls
- Reading / Writing of File
- Obtaining Socket
- Promises / Async...await
- Callbacks

# Array Methods

- find
- findIndex
- map
- forEach
- includes
- join
- sort

# REST API

<!-- Over-fetching -->

- /authors -> [ {id, name,img, email, books, address, contactNumber}, {}, {} ]
  -> What I Want? -> id, name, img
  -> What I get? -> id, name,img, email, books, address, contactNumber

<!-- Under-fetching -->

- /books - [{id, title, isbn, numOfPage, author}, {}, {}]

-> What I Want? -> author - name, books - title, isbn
-> What I get? -> > authors - id, name,img, email, books, address, contactNumber > books - id, title, isbn, numOfPage, author (Over-fetching again)

# GraphQL - No over / under-fetching

- What I Want? -> query {author {name, email} books {title, isbn} }
- What I Get? -> {data : { author : { name, email }, books : {title, isbn } }}

# to generate package.json

> npm init -y

# to install graphql dependencies

> npm install @graphql-yoga/node graphql

# babel dependencies

> npm install @babel/core @babel/cli @babel/preset-env @babel/node -D

# nodemon dependency

> npm install nodemon -D

# to start the dev server

> npm run start:dev

# to load schema.graphql file in GraphQL Server

> @graphql-tools/graphql-file-loader
> @graphql-tools/schema
> @graphql-tools/load

> npm i @graphql-tools/graphql-file-loader @graphql-tools/schema @graphql-tools/load

- Data - authors, posts, comments
- typeDefs - string format
- resolvers -

/grapqhl
/resolvers : Keeps all the resolver functions
/schema : contains the structure for GraphQL Schema

# MongoDB Integration

- Mongo Atlas Cloud - GMAIL Credentials

  > username : user123
  > password : vevVonnvHRiWkS87
  > mongodb+srv://user123:vevVonnvHRiWkS87@cluster0.e9xsq.mongodb.net/optum-db?retryWrites=true&w=majority

- Local installation

> npm install mongoose

# MongoDB Deployment (NoSQL)

- DB (optum-db)
  - Collection (users) - TABLE in RDBMS
    - Document - JSON Format document - Tuple in Table
    - Document
  - Collection
    - Document
    - Document
    - Document
  - Collection
    - Document
    - Document
    - Document
- DB
  - Collection
  - Collection
  - Collection
- DB
  - Collection
  - Collection
  - Collection

# React Project - Create React App

> npx create-react-app frontend
> cd frontend
> npm run start

> npm install @apollo/client graphql bootstrap

# Jest : JavaScript Testing Framework

- test suites
- tests
- tear-down approach
- matchers

# axios : to make remote server calls; Promise based API

# babel-jest

> npm install jest babel-jest axios -D

# Steps for Heroku Postgres Connection

- Add add-ons (Heroku Postgres) on Heroku Cloud
- Access DB credentails (host, usernmae, password, port, database)
- npm install prisma
- npx prisma init
- npx prisma db push / pull
- npx prisma generate (@prisma/client)

# Steps for deploying App on Heroku Cloud

- Download the heroku CLI
- Project upload to Git
- heroku Commands
  - heroku login
  - heroku keys:add : will add .ssh file to heroku
    > optional Step: open Powershell > ssh-keygen
  - heroku create <application-name>
  - git remote
  - git push heroku main
