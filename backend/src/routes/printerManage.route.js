const express = require('express');
const PrinterController = require('../controller/printerManage.Controller')

const router = express.Router();

// Route thêm máy in

router.get('/:pid?', PrinterController.getPrinter);
router.post('/add', PrinterController.addPrinter);
router.put('/update/:pid', PrinterController.updatePrinter);
router.delete('/:pid?', PrinterController.deletePrinter);
router.get('/viewLog', PrinterController.ViewHistoryLog)
module.exports = router;