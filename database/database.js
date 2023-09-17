
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'mustache',
    port: 3307
});

conn.connect(function (err) {
    if (err) throw err;

    console.log("Database Connected!");

    const sql = "CREATE TABLE if not exists user (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(100), password VARCHAR(100), token VARCHAR(250), status bool,createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);"

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    
});

module.exports = conn