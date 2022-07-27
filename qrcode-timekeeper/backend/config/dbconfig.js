// This is for the connection to the MYSQL database on Heroku
require('dotenv').config();

module.exports = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_DB
};