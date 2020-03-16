const Usuario = require('../mongodb/modelos/usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express')
const router = express.Router();

// router.get('/', (req, res) => {
//     res.render('login/login');
// });

router.post('/login', async(req, res) => {

    let body = req.body;
    //    let user = 'fpirovani'

    let usuario = await Usuario.findOne({ usuario: body.usuario }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });
        };

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });

        };
    });

    let token = jwt.sign({
        usuario,
    }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_CADUCIDAD });

    usuarioToken = {
        usuario,
        //        token
    }

    // console.log(usuario);
    // console.log(usuarioToken);

    res.render('partials/main', { usuarioToken });
});

module.exports = router;