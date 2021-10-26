var mysql = require('mysql');

exports.connection = function() {
    return mysql.createConnection(require("../mysql.json"));
};
