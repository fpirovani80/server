const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};


let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    usuario: { type: String, required: [true, 'El usuario es requerido'] },
    password: { type: String, required: [true, 'La contraseña es requerida'] },
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    seccion: { type: String, required: [true, 'La sección es requerida'] },
    email: { type: String },
    chatid: { type: String },
    img: { type: String },
    role: { type: String, default: 'USER_ROLE', enum: rolesValidos },
    estado: { type: Boolean, default: true },
});

usuarioSchema.methods.toJSON = function() { // para eliminar el campo passowrd del objeto, no se puede usar funcion flecha xq se necesita el this

    let user = this;
    let userObject = user.toObject();
    delete userObject.password

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe se único' });

module.exports = mongoose.model('Usuario', usuarioSchema);