const express = require('express');
const SystemController = require('../controller/systemManage.Controller')

const router = express.Router();

// Route thêm máy in

router.get('/', SystemController.getParameter);
router.put('/update', SystemController.updateParameter);

module.exports = router;