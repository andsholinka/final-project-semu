const express = require('express');
const pengeluaranController = require('../controllers/pengeluaran')
const router = new express.Router();

router.get('/', pengeluaranController.getPengeluaran)
router.get('/today', pengeluaranController.getPengeluaranHarian)

module.exports = router;