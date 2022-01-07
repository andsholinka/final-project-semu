const db = require('../config/db')
const momentTz = require('moment-timezone')

class barangModel {
    getBarang() {
        const barang = db.from('tb_barang').select('id_barang', 'nama_barang').where('deleted_at', null)
        return barang;
    }

    getBarangById(id) {
        const barang = db.from('tb_barang').select('id_barang', 'nama_barang', 'harga_asli', 'harga_jual', 'stok', 'jenis').where({
            deleted_at: null,
            id_barang: id
        })
        return barang;
    }

    createBarang(dataBarang) {
        const {
            nama_barang,
            harga_asli,
            harga_jual,
            stok,
            jenis,
        } = dataBarang

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const barang = db('tb_barang').insert({
            'nama_barang': nama_barang,
            'harga_asli': harga_asli,
            'harga_jual': harga_jual,
            'stok': stok,
            'jenis': jenis,
            'created_at': currentDate
        })
        return barang;
    }

    updateBarang(dataBarang, id) {
        const {
            nama_barang,
            harga_asli,
            harga_jual,
            stok,
            jenis,
        } = dataBarang

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const barang = db('tb_barang').where('id_barang', id).update({
            'nama_barang': nama_barang,
            'harga_asli': harga_asli,
            'harga_jual': harga_jual,
            'stok': stok,
            'jenis': jenis,
            'updated_at': currentDate
        })
        return barang;
    }

    deleteBarangById(id) {

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const barang = db('tb_barang').where('id_barang', id).update({
            'deleted_at': currentDate
        })
        return barang;
    }

    updateStok(dataBarang, id, stok) {
        const {
            jumlah
        } = dataBarang

        const newStok = stok - jumlah

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const barang = db('tb_barang').where('id_barang', id).update({
            'stok': newStok,
            'updated_at': currentDate
        })
        return barang;
    }

    checkStock() {
        const barang = db.from('tb_barang').select('id_barang', 'nama_barang', 'stok').where('deleted_at', null)
        return barang;
    }

    sumStock() {
        const barang = db.from('tb_barang').sum('stok As total').where('deleted_at', null)
        return barang;
    }

}

module.exports = new barangModel()