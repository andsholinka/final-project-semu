const db = require('../config/db')
const momentTz = require('moment-timezone')

class penjualanModel {

    createPenjualan(dataBarang, hargaSatuan) {
        const {
            id_barang,
            jumlah
        } = dataBarang

        const totalHarga = hargaSatuan * jumlah

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const barang = db('tb_penjualan').insert({
            'id_barang': id_barang,
            'harga_satuan': hargaSatuan,
            'total_harga': totalHarga,
            'jumlah': jumlah,
            'created_at': currentDate
        })
        return barang;
    }

}

module.exports = new penjualanModel()