const express = require('express')
const { postCreateCart, deleteCart, getProdsOnCart, postAddToCart, deleteItemOnCart, deleteAllItemsOnCart, postConfirmPurchase } = require('../controllers/cartsController')
const {Router} = express



//////////////// MONGODB /////////////////////
        // const DaoCarritoMongo = require('../DAOs/DaosMongoCarrito')
        // const daoCartsMongo = new DaoCarritoMongo()

        // const DaoProductosMongo =  require('../DAOs/DaosMongoProductos')
        // const daoProdsMongo = new DaoProductosMongo()

const routerCarrito = Router()

let admin = true
//POST (crea un carrito)
routerCarrito.post('/', postCreateCart)

//DELETE
routerCarrito.delete('/:id', deleteCart)

//GET (ver productos por id de carrito)
routerCarrito.get('/:id/productos', getProdsOnCart)

//POST agrega un producto al carrito
routerCarrito.post('/:id/productos', postAddToCart)

//DELETE borra un producto por id de carrito
routerCarrito.delete('/:id_cart/productos/:id_prod', deleteItemOnCart)

//DELETE borra todos los productos por id de carrito
routerCarrito.delete('/:id_cart/productos/all', deleteAllItemsOnCart)

//POST confirmar compra
routerCarrito.post('/:id_cart/confirmPurchase', postConfirmPurchase)

module.exports = {routerCarrito}