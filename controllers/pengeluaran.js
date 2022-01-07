const pengeluaranModel = require('../models/pengeluaran');

class barangController {
    async getPengeluaran(req, res) {
        try {
            const pengeluaran = await pengeluaranModel.getPengeluaran();
            const sumPengeluaran = await pengeluaranModel.sumPengeluaran();
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get All Outcome',
                data: {
                    'total': parseInt(sumPengeluaran[0].total),
                    'daftar pengeluaran': pengeluaran
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

    async getPengeluaranHarian(req, res) {
        try {
            const pengeluaran = await pengeluaranModel.getPengeluaranHarian();
            const sumPengeluaran = await pengeluaranModel.sumPengeluaranToday();

            res.status(200).send({
                status: res.statusCode,
                message: `Successfully get today's Outcome`,
                data: {
                    'total': parseInt(sumPengeluaran[0][0].total),
                    'daftar pengeluaran': pengeluaran[0]
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