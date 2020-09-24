const mysql = require('mysql')

// LOCAL
const connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : 'bd2020',
    database : 'pokemon_jokenpo'
});

// PRODUCTION
// const connection = mysql.createConnection({
//     host     : '',
//     port     : '',
//     user     : '',
//     password : '',
//     database : ''
// });

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

module.exports = connection;