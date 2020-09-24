const express = require('express')
// const dotenv = require('dotenv').config()
const cors = require('cors')
const routes = require('./routes')

const app = express()

// if (dotenv.error) {
//   throw dotenv.error
// }

app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/', function (req, res) {
  res.send('Tudo certo!');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3333;
}

app.listen(port);