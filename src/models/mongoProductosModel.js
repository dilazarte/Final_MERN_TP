const mongoose = require("mongoose");

const productosCollection = 'productos';

const ProductosSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    foto: {type: String, required: true, max: 100},
    codigo: {type: String, required: true, max: 100},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
    timeStamp: {type: Number, required: true}
})

const productos = mongoose.model(productosCollection, ProductosSchema);

module.exports = productos