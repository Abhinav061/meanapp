
var mysql = require('mysql');


// var db_config = {
//     connectionLimit  : 10,
//     host            : 'localhost',
//     user            : 'root',
//     password        : '',
//     database        : 'nodejs',
//    connectTimeout: 10000
// };

var db_config = {
    connectionLimit  : 10,
    host            : 'localhost',
    user            : 'shreedu1_nodeuser',
    password        : 'N*BLYmV2uB1[',
    database        : 'shreedu1_nodejs_db',
   connectTimeout: 10000
};


var pool  = mysql.createPool(db_config);

pool.on('error', function(err) {
  console.log(err.code);
});

module.exports = pool;