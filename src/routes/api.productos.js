const express = require('express')
const {Router} = express

const {getProducts, postProducts, putProducts, deleteProducts} = require('../controllers/prodsController')


const routerProductos = Router()
//GET
routerProductos.get('/:id?', getProducts)
//POST
routerProductos.post('/', postProducts)
//PUT
routerProductos.put('/:id', putProducts)
//DELETE
routerProductos.delete('/:id', deleteProducts)

module.exports = {routerProductos}