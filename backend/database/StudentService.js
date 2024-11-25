const client = require('./database');
const { v4: uuidv4 } = require('uuid')

class StudentService{
    constructor(){}
    // View history log
    async listPrintingLogByPrinter(studentID, printerID){
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM transaction`, 
                [studentID, printerID],
                (err, res) => {
                    if (err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        });
                    } else {
                        resolve({
                            status: 200,
                            msg: 'Fetch success',
                            data: res
                        });
                    }
                }
            );
        });
    }
    
    async listPrintingLogByTime(studentID, startTime, endTime){
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM transaction`, 
                [studentID, startTime, endTime],
                (err, res) => {
                    if (err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        });
                    } else {
                        resolve({
                            status: 200,
                            msg: 'Fetch success',
                            data: res
                        });
                    }
                }
            );
        });
    }

    async listAllPrintingLog(studentID){
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM transaction`, 
                [studentID, startTime, endTime],
                (err, res) => {
                    if (err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        });
                    } else {
                        resolve({
                            status: 200,
                            msg: 'Fetch success',
                            data: res
                        });
                    }
                }
            );
        });
    }
    // Printing Process
    async uploadFile(studentID, newFile){
        return new Promise((resolve,reject) => {
            const {dname, dsize, dformat, dpage_num, dupload_time} = newFile
            client.query(`
                SELECT * FROM document
                WHERE dname = ? and studentID = ?
            `, [dname, studentID], (err, res) =>{
                if (err){
                    reject({
                        status: 400,
                        msg: err.message,
                        data: null
                    })
                }
                else if (res.length != 0){
                    resolve({
                        status: 400,
                        msg: 'This file has been uploaded!',
                        data: null
                    })
                }
                else{
                    try{
                        const did = uuidv4()
                        client.query(
                            `INSERT INTO document(did, dname, dsize, dformat, dpage_num, dupload_time,studentID) VALUES (?,?, ?, ?, ?, ?,?)`,
                            [did, dname, dsize, dformat, dpage_num, dupload_time, studentID],
                            async (err, res) => {
                                if (err) {
                                    console.log(err)
                                    reject({
                                        status: 400,
                                        msg: err.message,
                                        data: null
                                    })
                                } else {
                                    resolve({
                                        status: 200,
                                        msg: "Upload File successfully!",
                                        data: newFile
                                    })
                                }
                            }
                        )
                        client.end;
                    }
                catch(e){
                    reject(e)
                }
                }
            })
        })
    }

    // async choosePrinter(location, PrintingLog){
    //     return new Promise(`
    //         SELECT TOP 1 FROM printer
    //         WHERE plocation = ${location} and filetype in ${PrintingLog.filetype} and pageremain >= ${PrintingLog.numpageprint * PrintingLog.numcopy}
    //     `)
    // }

    // async Printing(){

    // }
}

module.exports = new StudentService;