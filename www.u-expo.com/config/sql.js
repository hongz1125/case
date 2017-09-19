var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host : '121.40.37.200',
  user : 'root',
  password : 'Hongz1126',
  database : 'u-expo'
});

module.exports = pool;
