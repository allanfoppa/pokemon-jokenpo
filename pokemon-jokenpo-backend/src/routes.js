const express = require('express')
const routes = express.Router()

const RegisterController = require('./controllers/RegisterController')
const PokemonController = require('./controllers/PokemonController')
const SessionController = require('./controllers/SessionController')
const BattleController = require('./controllers/BattleController')

// CADASTRO
routes.post('/cadastrar', RegisterController.create)

// LOGIN
routes.post('/entrar', SessionController.create)

// HOME
routes.get('/home', PokemonController.index)
routes.post('/home', PokemonController.create)
routes.delete('/home', PokemonController.delete)

// BATALHA
routes.put('/batalha', BattleController.create)

module.exports = routes