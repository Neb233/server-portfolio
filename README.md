NC Games Backend

About

In this project I have created an API for a games rview website, that allows viewing, posting, updating and deleting articles and comments of games reviews from a databse using node-postgress.

A hosted version of this can be found at https://neb233.herokuapp.com/

Cloning the repository

If you would like to work on this repository locally, you will ned to clone it to your local machine

git clone https://github.com/Neb233/server-portfolio.git

Set-Up

This repo makes use of some other packages that need to be installed locally. To do this run the following command in your terminal

npm i

Create two new files in the main directory:

.env.test

and

.env.development

Add one line of code to each file:

PGDATABASE=nc_news_test for the test file

and

PGDATABAASE=nc_news to the development file

Seed the databse by inputting these commands in order:

npm run setup-dbs
npm run seed

To seed the database with test data and run tests, input the following command:

npm test

System Requirements

You will need to install at Node v16.9.1 (min) and PSQL v12.9 to run this repository
