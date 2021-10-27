const mongoose = require('mongoose')
const Schema = mongoose.Schema
const incSchema = new Schema ({
    cod: Number,
    p:Number,
    asunto: String,
    descripcion: String,
    asignado_a: String,
    resolucion: String,
    solucionado: {
        type: Boolean,
        default: false
    }
}, {versionKey:false})
module.exports = mongoose.model('inc', incSchema)


