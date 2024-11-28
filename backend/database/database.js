const mysql = require('mysql2');

const url = require('url');
const DATABASE_URL='mysql://root:JVcPaHWHYYNQIAspVsnmhwupXcTXwrSD@junction.proxy.rlwy.net:28524/railway'

const parsedUrl = new URL(DATABASE_URL);
const client = mysql.createConnection({
<<<<<<< HEAD
    host: parsedUrl.hostname,    // Địa chỉ máy chủ MySQL
    user: parsedUrl.username,         // Tên người dùng MySQL
    password: parsedUrl.password, // Mật khẩu MySQL
    database: parsedUrl.pathname.split('/')[1],   // Tên database
    port: parsedUrl.port,
    multipleStatements: true
=======
    host: 'localhost',    // Địa chỉ máy chủ MySQL
    user: 'root',         // Tên người dùng MySQL
    password: '12345678', // Mật khẩu MySQL
    database: 'cnpm'   // Tên database
>>>>>>> dcf4167579327a04161908d5649942da14d9690c
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = client;