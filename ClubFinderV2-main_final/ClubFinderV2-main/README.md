# Getting Started CPSC 471 

Currently implemented front end partially bootstrapped with npx

## Before you Begin
All functionality is not complete - see list of implemented functionality and yet-to-be below

## How to Begin Testing
There are 2 main directories :
api/ (for backend)
client/ (for frontend)


## Setting up Database
Database Schema files are included in /schemas
Run the sql files or import them using MySQL Workbench

## Create db.js
$ cd api
$ create file `db.js`

import mysql from "mysql";
```
export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"test@123", // Replace with your MySQL password here
    database: "clubfinder"
})
```

## Running the Web App
Import/Run them in the way you prefer (using MySQL Workbench)

move to client directory

$ cd client
$ npm install *will install modules and packages needed for web app
$ yarn start


Starting Backend Server

$ cd api
$ npm install
$ npm add nodemon 
$ yarn start

Log in with 
username: songjayw
password: songjayw@123
for pre-created clubs and data


webapp address : http://localhost:3000
