const express = require('express')
const router = express.Router();

const Usuario = require('../mongodb/modelos/usuarios');

const bcrypt = require('bcrypt');

router.post('/usuarios', (req, res) => {

    let body = req.body;

    if (body.password === undefined) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El password es requerido'
            }
        })
    }

    let usuario = new Usuario({
        usuario: body.usuario,
        password: bcrypt.hashSync(body.password, 10),
        nombre: body.nombre,
        seccion: body.seccion,
        email: body.email,
        chatid: body.chatid,
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({ // si llega a esta line es xq no se disparo el return de arriba
            ok: true,
            usuario: usuarioDB
        });
    });

});

module.exports = router;