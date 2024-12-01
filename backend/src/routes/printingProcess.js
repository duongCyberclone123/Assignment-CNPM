const express = require('express');
const router = express.Router();
//const { body, param } = require('express-validator');
const studentController = require('../controller/printingProcess.Controller');
const authMiddleware = require('../middleware/authMiddleware');
const client = require('../../database/database')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'file/'; // Thư mục lưu trữ file
        // Kiểm tra thư mục tồn tại, nếu không thì tạo mới
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // Tạo thư mục và các thư mục con nếu cần
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, performance.now() + path.extname(file.originalname)); // Tên file duy nhất
    }
});
const upload = multer({ storage: storage });
async function listAllPrintingLog(Log) {
    let query = 'SELECT * FROM TRANSACTION'
    let params = []
    if (Log.sid) {
        query += ' WHERE SID = ?'
        params.push(Log.sid)
    }
    if (Log.sid && Log.pid) {
        
        query += ' AND PID = ?'
        params.push(Log.pid)
    }
    else if (Log.pid){
        query += ' WHERE PID = ?'
        params.push(Log.pid)
    }

    if (Log.pid && Log.startTime){
        
        query += ' AND TSTART_TIME >= ?'
        params.push(Log.startTime)
    }
    else if (Log.startTime){
        query += ' WHERE TSTART_TIME >= ?'
        params.push(Log.startTime)
    }


    if (Log.startTime && Log.endTime){
        query += ' AND TEND_TIME <= ?'
        params.push(Log.endTime)
    }
    else if (Log.endTime){
        query += ' WHERE TEND_TIME <= ?'
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

async function ViewHistoryLog(req, res){
    try{
        const log = await listAllPrintingLog(req.body);
        return res.status(200).json({
            status: 200,
            msg: "View Log",
            data: log
        })
    }
    catch(err){
        return res.status(404).json({
            status: 404,
            msg: err,
            data: null
        })
    }
}
router.post('/uploadFile',upload.single('file'), studentController.uploadFile);
router.get('/getPrinters',studentController.PrintersInLocation)
//router.post('/processPrinting/:studentID/:docID',studentController.Printing)
router.post('/receivePrintingRequest',studentController.receivePrintingRequest)
router.post('/Printing',studentController.Printing)
router.get('/viewHistoryLog',studentController.ViewHistoryLog)
router.post('/buyPage', studentController.purchasePaper)
router.get('/viewLog', ViewHistoryLog)
module.exports = router