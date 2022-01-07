const express = require('express');
const pendapatanController = require('../controllers/pendapatan')
const router = new express.Router();

router.get('/', pendapatanController.getPendapatan)
router.get('/today', pendapatanController.getPendapatanHarian)

module.exports = router;