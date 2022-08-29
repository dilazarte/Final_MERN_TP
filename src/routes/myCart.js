const express = require('express');
const { getCart } = require('../controllers/viewsController');


const {Router} = express;
const { authCheck } = require('../middlewares/authCheck')
const myCart = Router();

myCart.get('/',  authCheck, getCart)

module.exports = myCart;