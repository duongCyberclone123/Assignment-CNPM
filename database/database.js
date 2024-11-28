const mysql = require('mysql2/promise');

// Thiết lập kết nối
const client = mysql.createPool({
    host: 'localhost',    // Địa chỉ máy chủ MySQL
    user: 'root',         // Tên người dùng MySQL
    password: 'hamhoang1603@',   // Mật khẩu MySQL
    database: 'printer_service', // Tên database
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = client;
