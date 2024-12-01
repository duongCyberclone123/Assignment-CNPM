const client = require('./database');
const { v4: uuidv4 } = require('uuid')
class UserService {
    constructor() { };
    async findByEmail(email) {
        return new Promise((resolve, reject) => {
            client.query(`
                SELECT * FROM account
                WHERE email = ?
            `, [email], (err, res) => {
                if (err) {
                    reject({
                        status: 400,
                        msg: err.message,
                        data: null
                    });
                }
                else if (res.length === 0) {
                    resolve({
                        status: 404,
                        msg: 'The email is not exist',
                        data: null
                    });
                }
                else {
                    resolve({
                        status: 200,
                        msg: 'Fetch success',
                        data: res
                    });
                }
            })
        })
    }
}



module.exports = new UserService;