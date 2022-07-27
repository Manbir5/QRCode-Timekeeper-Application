// This is the actual connecton with the database. It uses createPool instead of createConnection because
// clearDB disconnects when inactive and we need a system to deal with that.

const mysql = require("mysql");
const dbConfig = require("../config/dbconfig.js");

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});


module.exports = connection;