const connection = require('../database/connection')

module.exports = {
    async index(request, response) {

        const trainer_name = request.headers.pokemontrainer

        let sql = `SELECT pokemon, trainer_victories, trainer_defeats FROM Trainer WHERE trainer_name = "${ trainer_name }"`

        connection.query(sql, (error, results, fields) => {
            if (error) {
                console.log(error)
                return response.status(400).json({ error: "Erro ao encontrar as informações." })
            }

            return response.json(results)
        });

    },

    async create(request, response){

        const trainer_name = request.headers.pokemontrainer
        const { pokemon_name } = request.body

        let sql = `UPDATE Trainer SET pokemon = "${ pokemon_name }" WHERE trainer_name = "${ trainer_name }"`

        connection.query(sql, (error, results, fields) => {
            if (error) {
                return response.status(400).json({ error: "Pokemon não inserido na consulta." })
            }

            if (results.affectedRows > 0) {
                return response.json(
                    {
                        insert: true,
                        pokemon_name
                    }
                )
            } else {
                return response.json( { insert: false } )
            }
        });
    },

    async delete(request, response){
        const trainer_name = request.headers.pokemontrainer

        let sql = `UPDATE Trainer SET pokemon = "" WHERE trainer_name = "${ trainer_name }"`

        connection.query(sql, (error, results, fields) => {
            if (error) {
                console.log(error)
                return response.status(400).json({ error: "Pokemon não removido na consulta." })
            }

            if (results.affectedRows > 0) {
                return response.json( { remove: true } )
            } else {
                return response.json( { remove: false } )
            }
        });
    }
}