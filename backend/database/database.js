const mysql = require('mysql2');

const url = require('url');
const DATABASE_URL='mysql://root:JVcPaHWHYYNQIAspVsnmhwupXcTXwrSD@junction.proxy.rlwy.net:28524/railway'

const parsedUrl = new URL(DATABASE_URL);
const client = mysql.createConnection({

    host: 'localhost',    // Địa chỉ máy chủ MySQL
    user: 'root',         // Tên người dùng MySQL
    password: '1toi9a', // Mật khẩu MySQL
    database: 'cnpm',   // Tên database
    // port: parsedUrl.port,
    // multipleStatements: true

});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = client;