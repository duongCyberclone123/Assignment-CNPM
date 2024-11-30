const client = require('../../database/database'); // Kết nối database

class PrinterService {
    static getAllPrinters() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM PRINTER';
            
            // Thực thi câu truy vấn
            client.execute(query, (err, rows) => {
                if (err) {
                    // Nếu có lỗi, reject Promise
                    reject({
                        status: 500,
                        msg: 'Error fetching printers',
                        error: err.message
                    });
                } else {
                    // Nếu thành công, resolve Promise với dữ liệu trả về
                    resolve(rows);
                }
            });
        });
    }

    static getPrinterById(pid) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM PRINTER WHERE PID = ?';
    
            // Thực thi câu truy vấn với tham số PID
            client.execute(query, [pid], (err, rows) => {
                if (err) {
                    // Nếu có lỗi, reject Promise
                    reject({
                        status: 500,
                        msg: 'Error fetching printer by ID',
                        error: err.message
                    });
                } else {
                    // Nếu thành công, resolve Promise với dữ liệu trả về
                    resolve(rows);
                }
            });
        });
    }
    
    static createPrinter(data) {
        return new Promise((resolve, reject) => {
            const { Pmodel, Pstatus, Pfacility, Pbuilding, Proom, Pname, Plast_maintenance, Pprovide_coloring, EID } = data;
    
            // Kiểm tra đầu vào
            if (!Pmodel || !Pfacility || !Pbuilding || !Proom|| !Pname ) {
                reject({ status: 400, message: 'Pmodel, Pfacility, Pbuilding, Proom and Pname are required' });
                return;
            }
    
            const checkQuery = 'SELECT * FROM PRINTER WHERE Pname = ?';
            client.execute(checkQuery, [Pname], (checkErr, checkResult) => {
                if (checkErr) {
                    reject({ status: 500, message: 'Error checking Pname uniqueness', error: checkErr.message });
                    return;
                }

                if (checkResult.length > 0) {
                    // Nếu Pname đã tồn tại
                    reject({ status: 400, message: `Printer with name "${Pname}" already exists` });
                    return;
                }

                // Câu lệnh SQL chèn máy in
                const query = `
                    INSERT INTO PRINTER (Pmodel, Pstatus, Pfacility, Pbuilding, Proom, Pname, Plast_maintenance, Pprovide_coloring, EID)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
                const params = [Pmodel, Pstatus || 'Active', Pfacility, Pbuilding, Proom, Pname, Plast_maintenance || NULL, Pprovide_coloring || false, EID];
        
                // Thực thi câu truy vấn
                client.execute(query, params, (err, result) => {
                    if (err) {
                        reject({ status: 500, message: 'Error inserting printer', error: err.message });
                        return;
                    }
                    resolve({ id: result.insertId, ...data });
                });
            });
        });
    }

    static updatePrinter(pid, data) {
        return new Promise((resolve, reject) => {
            const { Pmodel, Pstatus, Pfacility, Pbuilding, Proom, Pname, Plast_maintenance, Pprovide_coloring, EID } = data;
    
            // Kiểm tra máy in có tồn tại không
            const checkQuery = 'SELECT * FROM PRINTER WHERE PID = ?';
            client.execute(checkQuery, [pid], (err, existingPrinter) => {
                if (err) {
                    reject({ status: 500, message: 'Error checking printer', error: err.message });
                    return;
                }
    
                if (existingPrinter.length === 0) {
                    reject({ status: 404, message: 'Printer not found' });
                    return;
                }
                
                const checkQuery = 'SELECT * FROM PRINTER WHERE Pname = ?';
                client.execute(checkQuery, [Pname], (checkErr, checkResult) => {
                    if (checkErr) {
                        reject({ status: 500, message: 'Error checking Pname uniqueness', error: checkErr.message });
                        return;
                    }
    
                    if (checkResult.length > 0) {
                        // Nếu Pname đã tồn tại
                        reject({ status: 400, message: `Printer with name "${Pname}" already exists` });
                        return;
                    }

                    // Cập nhật thông tin máy in
                    const updateQuery = `
                        UPDATE PRINTER
                        SET Pmodel = ?, Pstatus  = ?, Pfacility  = ?, Pbuilding  = ?, Proom  = ?, Pname  = ?, Plast_maintenance  = ?, Pprovide_coloring  = ?, EID  = ?
                        WHERE PID = ?;
                    `;
                    const params = [
                        Pmodel || existingPrinter[0].Pmodel,
                        Pstatus || existingPrinter[0].Pstatus,
                        Pname || existingPrinter[0].Pname,
                        Pfacility || existingPrinter[0].Pfacility,
                        Pbuilding || existingPrinter[0].Pbuilding,
                        Proom || existingPrinter[0].Proom,
                        Plast_maintenance || existingPrinter[0].Plast_maintenance,
                        Pprovide_coloring || existingPrinter[0].Pprovide_coloring,
                        EID || existingPrinter[0].EID,
                        pid
                    ];
        
                    // Thực thi câu lệnh UPDATE
                    client.execute(updateQuery, params, (err, result) => {
                        if (err) {
                            reject({ status: 500, message: 'Error updating printer', error: err.message });
                            return;
                        }
                        resolve({ pid, data });
                    });
                });
            });
        });
    }

    static deletePrinter(pid) {
        return new Promise((resolve, reject) => {
            // Kiểm tra sự tồn tại của máy in
            const checkQuery = 'SELECT * FROM PRINTER WHERE PID = ?';
            client.execute(checkQuery, [pid], (err, existingPrinter) => {
                if (err) {
                    reject({ status: 500, message: 'Error checking printer', error: err.message });
                    return;
                }
    
                if (existingPrinter.length === 0) {
                    reject({ status: 404, message: 'Printer not found' });
                    return;
                }
    
                // Câu lệnh SQL xóa máy in
                const deleteQuery = 'DELETE FROM PRINTER WHERE PID = ?';
                
                // Thực thi câu lệnh DELETE
                client.execute(deleteQuery, [pid], (err, result) => {
                    if (err) {
                        reject({ status: 500, message: 'Error deleting printer', error: err.message });
                        return;
                    }
                    resolve({ pid });
                });
            });
        });
    }
    
    async listAllPrintingLog(Log){
        let query = 'SELECT * FROM TRANSACTION'
        let params = []
        if (Log.sid) {
            query += ' AND SID = ?'
            params.push(Log.sid)
        }
        if (Log.pid) {
            query += ' AND PID = ?'
            params.push(Log.pid)
        }
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
}

module.exports = PrinterService;