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
        studentID = parseInt(studentID)
        return new Promise((resolve,reject) => {
            const {dname, dsize, dformat, dpage_num, dupload_time} = newFile
            client.query(`
                SELECT * FROM document
                WHERE dname = ? and sid = ?
            `, [dname, studentID], (err, res) =>{
                if (err){
                    reject({
                        status: 400,
                        msg: err.message,
                        data: null
                    })
                }
                else if (res.length !== 0){
                    console.log('Dup files')
                    resolve({
                        status: 400,
                        msg: 'This file has been uploaded!',
                        data: null
                    })
                }
                else{
                    try{
                        client.query(
                            `INSERT INTO document(dname, dsize, dformat, dpage_num, dupload_time,sid) VALUES (?,?, ?, ?, ?, ?)`,
                            [dname, parseInt(dsize), dformat, dpage_num, dupload_time, studentID],
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

    async choosePrinter(location, PrintingLog){
        if(PrintingLog.isColorPrinting){
            const params = [
                location,
                PrintingLog.numPagePrint * PrintingLog.numCopy,
                PrintingLog.paperSize,
                PrintingLog.isColorPrinting,
                true, true
            ]
            return new Promise((resolve,reject)=>{
                    client.query(`
                    SELECT * FROM printer
                    WHERE plocation = ? 
                    and pageremain >= ? 
                    and find_in_set(?, fileAccepted) > 0
                    and provideColoring = ?
                    and status = ?
                    ORDER BY   queue    ASC, pageremain DESC
                    LIMIT 1
                `,params,(err,res)=> {
                    if (err){
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    }
                    else if (res.length === 0){
                        console.log('No printers available now!')
                        resolve({
                            status: 400,
                            msg: 'No printers available now!',
                            data: null
                        })
                    }
                    else {
                        
                    }
                })
            })
        }
        const params = [
            location,
            PrintingLog.numPagePrint * PrintingLog.numCopy,
            PrintingLog.paperSize
        ]
        return new Promise(`
            SELECT * FROM printer
            WHERE plocation = ? 
            and pageremain >= ? 
            and find_in_set(?, fileAccepted) > 0
            LIMIT 1
        `, params,(err,res) => {

        })
    }

    async Printing(){

    }
}

module.exports = new StudentService;