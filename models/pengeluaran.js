const db = require('../config/db')
const momentTz = require('moment-timezone')

class pengeluaranModel {

    createPengeluaran(idBarang, pengeluaran) {

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const barang = db('tb_pengeluaran').insert({
            'id_barang': idBarang,
            'pengeluaran': pengeluaran,
            'created_at': currentDate
        })
        return barang;
    }

    sumPengeluaran() {
        const pengeluaran = db.from('tb_pengeluaran').sum('pengeluaran As total')
        return pengeluaran;
    }

    getPengeluaran() {
        const pengeluaran = db.from('tb_pengeluaran').select('id_pengeluaran', 'id_barang', 'pengeluaran')
        return pengeluaran;
    }

    sumPengeluaranToday() {
        const pengeluaran = db.raw('select sum(pengeluaran) AS total from tb_pengeluaran where created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY')
        return pengeluaran;
    }

    getPengeluaranHarian() {
        const pengeluaran = db.raw('select id_pengeluaran, id_barang, pengeluaran from tb_pengeluaran where created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY')
        return pengeluaran;
    }

}

module.exports = new pengeluaranModel()