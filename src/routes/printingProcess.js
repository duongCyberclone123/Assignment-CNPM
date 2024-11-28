const express = require('express');
const router = express.Router();
//const { body, param } = require('express-validator');
const studentController = require('../controller/printingProcess.Controller');
const authMiddleware = require('../middleware/authMiddleware');

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

router.post('/uploadFile?:studentID',upload.single('file'), studentController.uploadFile);

module.exports = router