const express = require('express');
const barangController = require('../controllers/barang')
const router = new express.Router();

router.get('/', barangController.getBarang)

router.get('/stok', barangController.checkStock)

router.get('/:id', barangController.getBarangById)

router.post('/', barangController.createBarang)

router.put('/:id', barangController.updateBarang)

router.delete('/:id', barangController.deleteBarangById)

module.exports = router;