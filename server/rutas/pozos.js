const express = require('express')
const router = express.Router();
const Pozos = require('../mongodb/modelos/pozos');


router.get('/pozos/mapas', async(req, res) => {

    await Pozos.find({ estado: true }) // para envie solo los campos que quiero -> find({}, 'nombre email') el id siempre lo va a mostrar
        .exec((err, pozosDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.render('partials/mapas/mapa_pozos', {
                encodedJson: encodeURIComponent(JSON.stringify(pozosDB))
            });

        });
});

router.post('/pozos', (req, res) => {

    let body = req.body;

    let pozo = new Pozos({
        nombre: body.nombre,
        coord: {
            lat: body.lat,
            lng: body.lng
        },
        estado_pozo: body.estado_pozo,
    });


    pozo.save((err, pozoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({ // si llega a esta line es xq no se disparo el return de arriba
            ok: true,
            usuario: pozoDB
        });
    });
});

module.exports = router;