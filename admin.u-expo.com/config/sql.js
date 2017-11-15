var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host : '39.106.121.93',
  user : 'root',
  password : 'Hongz1126',
  database : 'expo'
});

module.exports = pool;
