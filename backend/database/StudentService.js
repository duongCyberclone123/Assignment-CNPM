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
                PrintingLog.isColorPrinting,
                'active'
            ]
            return new Promise((resolve,reject)=>{
                    client.query(`
                    SELECT * FROM printer
                    WHERE plocation = ? 
                    and pageremain >= ? 
                    and provideColoring = ?
                    and pstatus = ?
                    ORDER BY pageremain DESC
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
                        return res;
                    }
                })
            })
        }
        const params = [
            location,
            PrintingLog.numPagePrint * PrintingLog.numCopy,
            'active'
        ]
        return new Promise(`
            SELECT * FROM printer
            WHERE plocation = ? 
                    and pageremain >= ? 
                    and pstatus = ?
            ORDER BY pageremain DESC
            LIMIT 1
        `, params,(err,res) => {
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
                return res;
            }
        })
    }

    async Printing(location, PrintingLog, docID, studentID){
        const printer = await this.choosePrinter(location, PrintingLog)
        return new Promise((resolve,reject)=>{
            client.query(`
                INSERT INTO TRANSACTION(tpages_per_copy, tcopies, tstatus, tstart_time, tend_time, isdoublesize, ishorizon, iscoloring,sid,did,pid)
                values(?,?,?,?,?,?,?,?,?,?,?)
            `,[PrintingLog.tpage_per_copy, tcopies, tstatus, tstart_time, tend_time,isdoubleside, ishorrizon, iscoloring,printer.sid,docID, studentID], (err, res)=>{
                if (err) {
                    reject({
                        status: 400,
                        msg: err.message,
                        data: null
                    })
                }
                else{
                    resolve({
                        status: 200,
                        msg: 'Printing success',
                        data: res
                    })
                }
            })
        })
    }
}

module.exports = new StudentService;