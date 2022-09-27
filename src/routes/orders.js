const express = require('express');
const {postOrders, getOrders} = require('../controllers/ordersController')
const {Router} = express

const routerOrders = Router();

//POST crea una nueva orden de compra.-
routerOrders.post('/', postOrders)

routerOrders.get('/', getOrders)

module.exports = {routerOrders}