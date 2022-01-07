const pendapatanModel = require('../models/pendapatan');
const penjualanModel = require('../models/penjualan');
const barangModel = require('../models/barang');

class penjualanController {

    async createPenjualan(req, res) {
        try {
            const checkBarang = await barangModel.getBarangById(req.body.id_barang);

            if (checkBarang.length == 0) throw new Error('Id Barang Tidak Tersedia');

            const checkStok = await barangModel.getBarangById(req.body.id_barang);

            if (checkStok[0].stok <= 0) throw new Error('Stok Barang Kosong');

            const checkAvailableStock = checkStok[0].stok - req.body.jumlah

            console.log(checkAvailableStock);
            if (checkAvailableStock < 0) throw new Error('Stok Barang Tidak Mencukupi');

            const newPenjualan = await penjualanModel.createPenjualan(req.body, checkStok[0].harga_jual);
            console.log("success create new Penjualan");
            res.status(201).send({
                status: res.statusCode,
                message: 'Successfully create new Penjualan',
            })

            await barangModel.updateStok(req.body, req.body.id_barang, checkStok[0].stok);

            const keuntungan = (checkStok[0].harga_jual - checkStok[0].harga_asli) * req.body.jumlah

            await pendapatanModel.createPendapatan(newPenjualan[0], keuntungan);

        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

}

module.exports = new penjualanController()