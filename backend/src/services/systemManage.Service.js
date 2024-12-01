const client = require('../../database/database'); // Kết nối database

class SystemService {
    static getAllParameters() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CONFIG';
            // Thực thi câu truy vấn
            client.execute(query, (err, rows) => {
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

    static getParameterByConfig_key(config_key) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM CONFIG WHERE config_key = ?';
    
            // Thực thi câu truy vấn với tham số config_key
            client.execute(query, [config_key], (err, rows) => {
                if (err) {
                    // Nếu có lỗi, reject Promise
                    reject({
                        status: 500,
                        msg: 'Error fetching system parameter by ID',
                        error: err.message
                    });
                } else {
                    // Nếu thành công, resolve Promise với dữ liệu trả về
                    resolve(rows);
                }
            });
        });
    }

    static updateParameter(config_key, data) {
        return new Promise((resolve, reject) => {
            const { config_value, description} = data;
    
            // Kiểm tra máy in có tồn tại không
            const checkQuery = 'SELECT * FROM CONFIG WHERE config_key = ?';
            client.execute(checkQuery, [config_key], (err, existingPrinter) => {
                if (err) {
                    reject({ status: 500, message: 'Error checking system parameter', error: err.message });
                    return;
                }
    
                if (existingPrinter.length === 0) {
                    reject({ status: 404, message: 'System parameter not found' });
                    return;
                }
                
                const updateQuery = `
                    UPDATE CONFIG
                    SET config_value = ?
                    WHERE config_key = ?;
                `;
                const params = [
                    config_value || existingPrinter[0].config_value,
                    config_key
                ];
    
                // Thực thi câu lệnh UPDATE
                client.execute(updateQuery, params, (err, result) => {
                    if (err) {
                        reject({ status: 500, message: 'Error updating system parameter', error: err.message });
                        return;
                    }
                    resolve({ config_key, data });
                });
            });
        });
    }
}

module.exports = SystemService;
