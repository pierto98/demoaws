var mysql = require('mysql');

exports.connection = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'webapp',
        password: 'webapp@mysql',
        database: 'sakila'
    });
};
