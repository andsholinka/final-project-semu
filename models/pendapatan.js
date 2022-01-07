const db = require('../config/db')
const momentTz = require('moment-timezone')

class pendapatanModel {

    createPendapatan(idPendapatan, keuntungan) {

        var currentDate = momentTz().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const barang = db('tb_pendapatan').insert({
            'id_penjualan': idPendapatan,
            'keuntungan': keuntungan,
            'created_at': currentDate
        })
        return barang;
    }

    sumPendapatan() {
        const pendapatan = db.from('tb_pendapatan').sum('keuntungan As total')
        return pendapatan;
    }

    getPendapatan() {
        const pendapatan = db.from('tb_pendapatan').select('id_pendapatan', 'id_penjualan', 'keuntungan')
        return pendapatan;
    }

    sumPendapatanToday() {
        const pendapatan = db.raw('select sum(keuntungan) AS total from tb_pendapatan where created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY')
        return pendapatan;
    }

    getPendapatanHarian() {
        const pendapatan = db.raw('select id_pendapatan, id_penjualan, keuntungan from tb_pendapatan where created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY')
        return pendapatan;
    }

}

module.exports = new pendapatanModel()