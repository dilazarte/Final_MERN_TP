const {generateOrder, getAllOrders} = require('../services/ordersServices')

async function postOrders(req, res){
    let data = req.body;
    let idOrder = await generateOrder(data);
    res.status(200).json(idOrder)
}

async function getOrders(req, res){
    let orders = await getAllOrders();
    res.status(200).json(orders)
}

module.exports = {postOrders, getOrders}