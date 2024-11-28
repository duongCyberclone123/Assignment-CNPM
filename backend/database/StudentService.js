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
            const {dname, dsize, dformat, dpage_num} = newFile
            const date = new Date();
            const dupload_time = date.toISOString().slice(0, 19).replace('T', ' ');
            client.query(
                `INSERT INTO DOCUMENT(dname, dsize, dformat, dpage_num, dupload_time,sid) 
                VALUES (?,?, ?, ?, ?, ?);`,
                [dname, parseInt(dsize), dformat, dpage_num, dupload_time, studentID],
                (err, res) => {
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
        })
    }

    async sortPrintersByLocation(place, building, room) {
        try {
            let params = [];
            let query = 'SELECT * FROM PRINTER';
            
            if (place) {
                params = [place];
                query += ' WHERE pfacility = ?';
            }
    
            if (building && place) {
                query += ' AND pbuilding = ?';
            }
            else if (building) {
                query += ' WHERE pbuilding = ?';
                params.push(building);
            }
    
            if (room && (building || place)) {
                query += ' AND proom = ?';
                params.push(room);
            }
            else if (room) {
                query += ' WHERE proom = ?';
                params.push(room);
            }
            
            console.log(query);
            console.log(params);
            
            const locationDescription = [place, building, room].filter(Boolean).join(', ');
    
            // Sử dụng await để chờ query
            const result = await new Promise((resolve, reject) => {
                client.query(query, params, (err, res) => {
                    if (err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        });
                    } else {
                        resolve({
                            status:200,
                            msg: "Printers in " + locationDescription,
                            data: res
                        });
                    }
                });
            });
    
            // Sau khi nhận được kết quả từ query
            return result
        } catch (err) {
            return {
                status: 400,
                msg: err.message,
                data: null
            };
        }
    }

    async receivePrintingRequest(PrintingLog){
        console.log(PrintingLog)
        const date = new Date();
        const mysqlDatetime = date.toISOString().slice(0, 19).replace('T', ' ');
        return new Promise((resolve, reject) => {
            client.query(`
                    INSERT INTO TRANSACTION (tstatus, tis_double_size, ishorizon,iscoloring, tpage_size,tpages_per_copy, tcopies,tstart_time, tend_time, pid, did, sid)
                    VALUE (?,?,?,?,?,?,?,?,?,?,?,?);
            `,['pending', PrintingLog.isdoublesize, 
                PrintingLog.ishorizon,PrintingLog.iscoloring,PrintingLog.pagesize, PrintingLog.tpages_per_copy, PrintingLog.tcopies, 
                mysqlDatetime, null,
                PrintingLog.pid, PrintingLog.did, PrintingLog.sid],
                async (err, res)=>{
                    if (err){
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    }
                    else{
                        client.query(`
                            UPDATE PRINTER
                            SET    page_remain = page_remain - ?
                            WHERE  pid = ?
                        `,[PrintingLog.tpages_per_copy * PrintingLog.tcopies, PrintingLog.pid],(err,res)=>{
                            if (err){
                                reject({
                                    status: 400,
                                    msg: err.message,
                                    data: null
                                })
                            }
                            else {
                                client.query(`
                                    UPDATE STUDENT
                                    SET Savailable_pages = Savailable_pages - ?
                                    WHERE id = ?
                                `,[PrintingLog.tpages_per_copy * PrintingLog.tcopies,PrintingLog.sid],(err,res)=>{
                                    if (err){
                                        reject({
                                            status: 400,
                                            msg: err.message,
                                            data: null
                                        })
                                    }
                                    else resolve({
                                        status: 200,
                                        msg: 'Student Effected',
                                        data: res
                                    })
                                })
                            }
                        })
                    }
            })
        })
    }

    // async resolveTransaction(printerID){
    //     const queueTransaction = await new Promise((resolve,reject)=>{
    //         client.query(`
    //             SELECT
    //         `)
    //     })    

    // }
}

module.exports = new StudentService;