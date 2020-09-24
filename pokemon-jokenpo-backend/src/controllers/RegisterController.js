const connection = require('../database/connection')

module.exports = {
    async create(request, response){

        const { trainer_name, trainer_pw } = request.body

        const sql = `INSERT INTO Trainer (trainer_name, trainer_pw) VALUES ("${ trainer_name }", "${ trainer_pw }")`

        connection.query(sql, (error, results, fields) => {
            if (error) {
                console.log(error)
                return response.status(400).json({ error: "Usuário(a) não inserido na consulta." })
            }

            if (results.insertId > 0) {
                return response.json(
                    {
                        insert: true,
                        trainer_name
                    }
                )
            } else {
                return response.json(
                    {
                        insert: false
                    }
                )
            }
        });
    }
}