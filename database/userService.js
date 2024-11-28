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
    async getHistoryPrinting(sid) {
        const id = sid.sid; // Lấy ID từ input
        console.log("Student ID:", id); // Log ID sinh viên để kiểm tra
    
        try {
            const [rows] = await client.query(`
                SELECT 
                    T.Tstart_time, 
                    T.Tend_time, 
                    T.Tcopies, 
                    T.Tpages_per_copy, 
                    T.Tstatus, 
                    D.Dname, 
                    P.Pname
                FROM TRANSACTION T
                JOIN DOCUMENT D ON T.DID = D.DID
                JOIN PRINTER P ON T.PID = P.PID
                WHERE T.SID = ?
            `, [id]);
    
            if (rows.length === 0) {
                console.log("No records found for student ID:", id);
                return {
                    status: 404,
                    msg: 'No printing history found for the student',
                    data: null
                };
            } else {
                console.log("Query successful, data:", rows);
                return {
                    status: 200,
                    msg: 'Fetch success',
                    data: rows
                };
            }
        } catch (err) {
            console.error("Error during query execution:", err); // Ghi log chi tiết lỗi
            return {
                status: 500,
                msg: 'Internal Server Error',
                data: null
            };
        }
    }

    async getAllHistoryPrinting() {
        try {
            const [rows] = await client.query(`
                SELECT 
                    T.Tstart_time, 
                    T.Tend_time, 
                    T.Tcopies, 
                    T.Tpages_per_copy, 
                    T.Tstatus, 
                    D.Dname, 
                    P.Pname
                FROM TRANSACTION T
                JOIN DOCUMENT D ON T.DID = D.DID
                JOIN PRINTER P ON T.PID = P.PID
            `);
    
            if (rows.length === 0) {
                console.log("No records found for student ID:", id);
                return {
                    status: 404,
                    msg: 'No printing history found for the student',
                    data: null
                };
            } else {
                console.log("Query successful, data:", rows);
                return {
                    status: 200,
                    msg: 'Fetch success',
                    data: rows
                };
            }
        } catch (err) {
            console.error("Error during query execution:", err); // Ghi log chi tiết lỗi
            return {
                status: 500,
                msg: 'Internal Server Error',
                data: null
            };
        }
    }
    
    
    
}



module.exports = new UserService;