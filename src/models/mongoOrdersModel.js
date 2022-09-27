const mongoose = require("mongoose");

const ordersCollections = 'ordenes';

const ordersSchema = new mongoose.Schema({
    buyerName: {type: String, required: true, max: 100},
    buyerEmail: {type: String, required: true, max: 100},
    items: {type: Array, required: true},
    status: {type: String, required: true},
    timeStamp: {type: Number, required: true}
})

const ordenes = mongoose.model(ordersCollections, ordersSchema);

module.exports = ordenes