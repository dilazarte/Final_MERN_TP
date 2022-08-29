const mongoose = require("mongoose");

const usuariosCollections = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    address: {type: String, required: true, max: 100},
    age: {type: String, required: true, max: 100},
    phone: {type: String, required: true, max: 100},
    avatar: {type: String, required: true, max: 100},
    cartRef: {type: String, required: true, max: 100}
})

const usuarios = mongoose.model(usuariosCollections, usuariosSchema);

module.exports = usuarios