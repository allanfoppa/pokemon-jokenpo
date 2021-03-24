const mysql = require('mysql')

// LOCAL
const connection = mysql.createConnection({
    host     : 'pokemon_jokenpo_db',
    port     : '3306',
    user     : 'ash',
    password : 'bd2021',
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