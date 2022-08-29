const mongoose = require("mongoose");

const carritosCollection = 'carritos';

const CarritosSchema = new mongoose.Schema({
    timeStamp: {type: Number, required: true},
    productos: {type: Array, required: true}
})

const carritos = mongoose.model(carritosCollection, CarritosSchema);

module.exports = carritos