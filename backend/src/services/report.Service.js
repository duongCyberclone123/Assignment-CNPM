const client = require('../../database/database'); // Kết nối database

class ReportService {
    static getOveralYearlyReport(year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    COUNT(DISTINCT t.TID) AS total_transactions,          -- Số giao dịch
                    SUM(t.Tpages_per_copy * t.Tcopies) AS total_papers_used, -- Tổng số giấy sử dụng
                    COUNT(DISTINCT t.PID) AS total_printers_used,         -- Số máy in được sử dụng
                    COUNT(DISTINCT t.SID) AS total_students_used          -- Số sinh viên sử dụng máy in
                FROM TRANSACTION t
                WHERE YEAR(t.Tend_time) = ?;
                `
                ;
            // Thực thi câu truy vấn
            client.execute(query, [year], (err, rows) => {
                if (err) {
                    // Nếu có lỗi, reject Promise
                    reject({
                        status: 500,
                        msg: 'Error fetching system parameters',
                        error: err.message
                    });
                } else {
                    // Nếu thành công, resolve Promise với dữ liệu trả về
                    resolve(rows);
                }
            });
        });
    }

    static getOveralMonthlyReport(month, year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    COUNT(DISTINCT t.TID) AS total_transactions, 
                    SUM(t.Tpages_per_copy * t.Tcopies) AS total_papers_used, 
                    COUNT(DISTINCT t.PID) AS total_printers_used, 
                    COUNT(DISTINCT t.SID) AS total_students_used
                FROM TRANSACTION t
                WHERE YEAR(t.Tend_time) = ? AND MONTH(t.Tend_time) = ?;
                `
                ;
            // Thực thi câu truy vấn
            client.execute(query, [year, month], (err, rows) => {
                if (err) {
                    // Nếu có lỗi, reject Promise
                    reject({
                        status: 500,
                        msg: 'Error fetching system parameters',
                        error: err.message
                    });
                } else {
                    // Nếu thành công, resolve Promise với dữ liệu trả về
                    resolve(rows);
                }
            });
        });
    }

    static getDetailYearlyReport(year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    p.PID AS printer_id, 
                    COUNT(DISTINCT t.SID) AS num_students_used, 
                    COUNT(t.TID) AS num_transactions, 
                    COALESCE(SUM(t.Tpages_per_copy * t.Tcopies), 0) AS total_papers_used
                FROM 
                    PRINTER p
                LEFT JOIN 
                    TRANSACTION t ON p.PID = t.PID
                WHERE YEAR(t.Tend_time) = ?
                GROUP BY 
                    p.PID;
                `
                ;
            // Thực thi câu truy vấn
            client.execute(query, [year], (err, rows) => {
                if (err) {
                    // Nếu có lỗi, reject Promise
                    reject({
                        status: 500,
                        msg: 'Error fetching system parameters',
                        error: err.message
                    });
                } else {
                    // Nếu thành công, resolve Promise với dữ liệu trả về
                    resolve(rows);
                }
            });
        });
    }

    static getDetailMonthlyReport(month, year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    p.PID AS printer_id, 
                    COUNT(DISTINCT t.SID) AS num_students_used, 
                    COUNT(t.TID) AS num_transactions, 
                    COALESCE(SUM(t.Tpages_per_copy * t.Tcopies), 0) AS total_papers_used
                FROM 
                    PRINTER p
                LEFT JOIN 
                    TRANSACTION t ON p.PID = t.PID
                WHERE YEAR(t.Tend_time) = ? AND MONTH(t.Tend_time) = ?
                GROUP BY 
                    p.PID;
                `
                ;
            // Thực thi câu truy vấn
            client.execute(query, [year, month], (err, rows) => {
                if (err) {console.log(err);
                    // Nếu có lỗi, reject Promise
                    reject({
                        status: 500,
                        msg: 'Error fetching system parameters',
                        error: err.message
                    });
                } else {
                    // Nếu thành công, resolve Promise với dữ liệu trả về
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = ReportService;
