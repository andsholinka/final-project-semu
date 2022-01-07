const pendapatanModel = require('../models/pendapatan');

class barangController {
    async getPendapatan(req, res) {
        try {
            const pendapatan = await pendapatanModel.getPendapatan();
            const sumPendapatan = await pendapatanModel.sumPendapatan();
            res.status(200).send({
                status: res.statusCode,
                message: 'Successfully get All Income',
                data: {
                    'total': parseInt(sumPendapatan[0].total),
                    'daftar pendapatan': pendapatan
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

    async getPendapatanHarian(req, res) {
        try {
            const pendapatan = await pendapatanModel.getPendapatanHarian();
            const sumPendapatan = await pendapatanModel.sumPendapatanToday();

            res.status(200).send({
                status: res.statusCode,
                message: `Successfully get today's Income`,
                data: {
                    'total': parseInt(sumPendapatan[0][0].total),
                    'daftar pendapatan': pendapatan[0]
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