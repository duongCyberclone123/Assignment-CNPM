const mysql = require('mysql2');

// Setup pgAdmin4 and connect individual
const client = mysql.createConnection({
    host: 'localhost',    // Địa chỉ máy chủ MySQL
    user: 'root',         // Tên người dùng MySQL
    password: '123456', // Mật khẩu MySQL
    database: 'cnpm'   // Tên database
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = client;