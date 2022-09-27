const ContenedorMongoDB = require('../containers/mongoContainer');
const ordenes = require('../models/mongoOrdersModel')
const { loggerError } = require('../utils/loggers');

class DaoOrdenesMongo extends ContenedorMongoDB{
    constructor(){
        super(ordenes)
    } //crer metodos

    async createOrder(data){
        try {
            let id = await this.addDoc(data);
            return id._id;
        } catch (error) {
            loggerError.error(error)
        }
    }

    async getAllOrders(){
        try {
            let orders = await this.getAllDoc();
            return orders;
        } catch (error) {
            loggerError.error(error)
        }
    }
}

module.exports = DaoOrdenesMongo;