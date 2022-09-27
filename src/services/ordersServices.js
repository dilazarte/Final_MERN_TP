const ordersFactory = require('../factories/ordersMongoFactory');
const dbOrdersFactory = ordersFactory.createInstance();

async function generateOrder(obj){
    try {
        let data = await dbOrdersFactory.createOrder(obj)
        return data
    } catch (error) {
        return error
    }
}

async function getAllOrders(obj){
    try {
        let data = await dbOrdersFactory.getAllOrders(obj)
        return data
    } catch (error) {
        return error
    }
}

module.exports = {generateOrder, getAllOrders}