const express = require('express');
const ReportController = require('../controller/report.Controller')

const router = express.Router();

// Route thêm máy in

router.get('/overal', ReportController.getOveralReport);
router.get('/detail', ReportController.getDetailReport);

module.exports = router;