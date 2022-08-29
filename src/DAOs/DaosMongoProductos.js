const ContenedorMongoDB = require('../containers/mongoContainer')
const productoModel = require('../models/mongoProductosModel')

class DaoProductosMongo extends ContenedorMongoDB{
    constructor(){
        super(productoModel)
    }
}

module.exports = DaoProductosMongo;