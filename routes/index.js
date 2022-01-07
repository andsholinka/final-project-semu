const express = require('express');
const router = new express.Router();

const barangRouter = require('./barang')
const penjualanRouter = require('./penjualan')
const pendapatanRouter = require('./pendapatan')
const pengeluaranRouter = require('./pengeluaran')

router.use('/barang', barangRouter)
router.use('/penjualan', penjualanRouter)
router.use('/pendapatan', pendapatanRouter)
router.use('/pengeluaran', pengeluaranRouter)

module.exports = router;