const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};


let Schema = mongoose.Schema;


let pozosSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre del pozo es requerido'] },
    coord: {
        lat: { type: Number, required: [true, 'la latitud es requerida'] },
        lng: { type: Number, required: [true, 'la longitud es requerida'] },
    },
    estado_pozo: { type: String, required: [true, 'El estado del pozo es requerido'] },
    estado: { type: Boolean, default: true },
});

// precioUni: { type: Number, required: [true, 'El precio únitario es necesario'] },
// categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },



pozosSchema.plugin(uniqueValidator, { message: '{PATH} debe se único' });

module.exports = mongoose.model('Pozos', pozosSchema);