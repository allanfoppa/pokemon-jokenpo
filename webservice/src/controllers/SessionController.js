const connection = require('../database/connection')

module.exports = {
    async create(request, response){
        const { trainer_name, trainer_pw } = request.body

        let sql = `SELECT * FROM Trainer WHERE trainer_name = "${trainer_name}" AND trainer_pw = "${trainer_pw}"`;

        connection.query(sql, (error, results, fields) => {
            if (error) {
                return response.status(400).json({ error: "Algum erro aconteceu na consulta." })
            }

            if (results.length > 0) {
                return response.json({find: true})
            } else {
                return response.json({find: false})
            }
        });
    }
}