const connection = require('../database/connection')

module.exports = {
    async create(request, response){
        const pokemon_trainer = request.headers.pokemontrainer
        const result = request.headers.result

        if (result === 'win') {

            let sql = `UPDATE Trainer SET trainer_victories = trainer_victories + 1 WHERE trainer_name = "${ pokemon_trainer }"`

            connection.query(sql, (error, results, fields) => {
                if (error) {
                    return response.status(400).json({ error: "Algum erro aconteceu na consulta." })
                }

                return response.json( { message: 'Congratulation, you won.' } )
            });

        } else if(result === 'lose') {

            let sql = `UPDATE Trainer SET trainer_defeats = trainer_defeats + 1 WHERE trainer_name = "${ pokemon_trainer }"`

            connection.query(sql, (error, results, fields) => {
                if (error) {
                    return response.status(400).json({ error: "Algum erro aconteceu na consulta." })
                }

                return response.json( { message: 'You\'ve lost. Better luck next time!.' } )
            });

        } else {
            return response.json({ success: false, message: 'Algum erro aconteceu, favor reiniciar a aplicação.' });
        }
    }
}