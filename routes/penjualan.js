const express = require('express');
const penjualanController = require('../controllers/penjualan')
const router = new express.Router();

router.post('/', penjualanController.createPenjualan)

module.exports = router;