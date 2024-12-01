const client = require('./database');
const { v4: uuidv4 } = require('uuid')

class StudentService{
    constructor(){}
    // Buy pages
    buyPaper = async function(sid, pagesPurchased, PMmethod)  {
        try {
            // 1. Insert giao dịch thanh toán vào bảng PAYMENT
            const paymentQuery = `
                INSERT INTO PAYMENT (PMtime, PMpages_purchased, PMmethod, SID)
                VALUES (NOW(), ?, ?, ?)
            `;
            client.query(paymentQuery, [pagesPurchased, PMmethod, sid]);
    
            // 2. Cập nhật số lượng trang trong bảng STUDENT
            const updateStudentQuery = `
                UPDATE STUDENT
                SET Savailable_pages = Savailable_pages + ?
                WHERE ID = ?
            `;
            const numbersOfPages = pagesPurchased / 500;
            client.query(updateStudentQuery, [numbersOfPages, sid]);
    
            const studentQuery = `
                SELECT * FROM STUDENT
                WHERE ID = ?
            `
            const student = client.query(studentQuery, [sid]);
            console.log(student);
    
            // 3. Hoàn thành
            return {
                status: 200,
                msg: "Paper purchased successfully",
                data: {
                    student: student[0],
                    numbersOfPages : numbersOfPages,
                    pagesPurchased: pagesPurchased,
                    PMmethod: PMmethod,
                }
            };
        } catch (err) {
            console.error("Error during paper purchase:", err);
            return {
                status: 500,
                msg: "Internal Server",
                data: null
            };
        }
    }

    // View history log
    async listAllPrintingLog(studentID, Log){
        let query = 'SELECT * FROM TRANSACTION WHERE SID = ?'
        let params = [studentID]
        if (Log.pid) {
            query += ' AND PID = ?'
            params.push(Log.pid)
        }
        if (Log.startTime){
            query += ' AND TSTART_TIME >= ?'
            params.push(Log.startTime)
        }
        if (Log.endTime){
            query += ' AND TEND_TIME <= ?'
            params.push(Log.endTime)
        }
        return new Promise((resolve, reject) => {
            client.query(
                query, 
                params,
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
        return new Promise(async(resolve,reject) => {
            const nextID = await new Promise((resolve,reject)=>{
                client.query(`
                    SELECT DID FROM DOCUMENT
                    ORDER BY DID DESC
                    LIMIT 1
                `,(err, res)=>{
                    if (err) reject(err)
                    else resolve(res)
                })
            })
            console.log(nextID)
            const did = nextID[0].DID + 1
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
                            data: {did, newFile}
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
                PrintingLog.ishorizon,PrintingLog.iscoloring,PrintingLog.pagesize, 
                PrintingLog.tpages_per_copy, PrintingLog.tcopies, 
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
        })
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async resolveTransaction(printerID){
        const queueTransaction = await new Promise((resolve,reject)=>{
            client.query(`
                SELECT * FROM TRANSACTION 
                WHERE PID = ? AND TSTATUS = ?
            `,[printerID, "pending"],(err,res)=>{
                if (err) reject({ status: 500, message: 'Error fetching transactions', error: err });
                else resolve(res)
            })
        })    
        console.log(queueTransaction);
        if (queueTransaction.length == 0) return null;
        let result = queueTransaction;
        let solvingTime = 0;
        for (let x of queueTransaction){
            console.log("require printing " + x.TID + " - " + x.Tpages_per_copy * x.Tcopies)
            if (true){
                console.log("on printing " + x.TID)
                solvingTime += x.Tpages_per_copy * x.Tcopies
                client.query(`
                    UPDATE TRANSACTION 
                    SET TEND_TIME = DATE_ADD(TSTART_TIME, INTERVAL ? SECOND), TSTATUS = ?
                    WHERE TID = ?
                `,[solvingTime,"Success", x.TID],(err,res)=>{
                    if (err) reject({
                        status: 400,
                        msg: err.message,
                        data: null
                    })
                    else {
                        resolve(res)
                    }   
                })
            }
        }
        return result
    }
}

module.exports = new StudentService;