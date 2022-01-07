const barangModel = require('../models/barang');
const pengeluaranModel = require('../models/pengeluaran');

class barangController {
    async getBarang(req, res) {
        try {
            const barang = await barangModel.getBarang();
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get All Barang',
                data: barang
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async getBarangById(req, res) {
        try {
            const barang = await barangModel.getBarangById(req.params.id);

            if (barang.length == 0) throw new Error('Id Barang Tidak Tersedia');

            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get Barang',
                data: barang
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async createBarang(req, res) {
        try {

            const newBarang = await barangModel.createBarang(req.body);
            console.log("success create new Barang");
            res.status(201).send({
                status: res.statusCode,
                message: 'Successfully create new Barang',
            })

            if (req.body.jenis === 'supplier') {

                const pengeluaran = req.body.harga_asli * req.body.stok

                await pengeluaranModel.createPengeluaran(newBarang[0], pengeluaran);

            }

        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async updateBarang(req, res) {
        try {
            const checkIdBarang = await barangModel.getBarangById(req.params.id);

            if (checkIdBarang.length == 0) throw new Error('Id Barang Tidak Tersedia');

            await barangModel.updateBarang(req.body, req.params.id);
            console.log("success update data Barang");
            res.status(201).send({
                status: res.statusCode,
                message: 'Successfully update data Barang',
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async deleteBarangById(req, res) {
        try {
            const checkIdBarang = await barangModel.getBarangById(req.params.id);

            if (checkIdBarang.length == 0) throw new Error('Id Barang Tidak Tersedia');

            await barangModel.deleteBarangById(req.params.id);
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully delete Barang',
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

    async checkStock(req, res) {
        try {
            const barang = await barangModel.checkStock();
            const sumStock = await barangModel.sumStock();
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get Stock Barang',
                data: {
                    'total stok barang': parseInt(sumStock[0].total),
                    'daftar barang': barang
                }
            })
        } catch (e) {
            console.log(e);
            res.status(400).send({
                status: res.statusCode,
                message: e.message
            })
        }
    }

}

module.exports = new barangController()