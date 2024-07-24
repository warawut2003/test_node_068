const mysql =  require('mysql2');
const dotenv =  require('dotenv');
const dbConfig = require('./db.config')

const connection = mysql.createPool({
    // host : process.env.DBHOST,
    // user : process.env.DBUSER,
    // password : process.env.DBPASS,
    // database : process.env.DBNAME

    host : dbConfig.DBHOST,
    user : dbConfig.DBUSER,
    password : dbConfig.DBPASS,
    database : dbConfig.DBNAME
});

module.exports = connection.promise();