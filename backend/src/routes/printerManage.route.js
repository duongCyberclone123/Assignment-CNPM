const express = require('express');
const PrinterController = require('../controller/printerManage.Controller')

const router = express.Router();




// Route thêm máy in

router.get('/', PrinterController.getPrinter);
router.post('/add', PrinterController.addPrinter);
router.put('/update', PrinterController.updatePrinter);
router.delete('/', PrinterController.deletePrinter);

module.exports = router;