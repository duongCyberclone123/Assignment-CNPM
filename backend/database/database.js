const mysql = require('mysql2');

const url = require('url');
const DATABASE_URL='mysql://root:JVcPaHWHYYNQIAspVsnmhwupXcTXwrSD@junction.proxy.rlwy.net:28524/railway'

const parsedUrl = new URL(DATABASE_URL);
const client = mysql.createConnection({

    host: parsedUrl.hostname,    // Địa chỉ máy chủ MySQL
    user: parsedUrl.username,         // Tên người dùng MySQL
    password: parsedUrl.password, // Mật khẩu MySQL
    database: parsedUrl.pathname.split('/')[1],   // Tên database
    port: parsedUrl.port,
    multipleStatements: true

});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = client;