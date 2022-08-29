// const DaoCarritoMongo = require('../DAOs/DaosMongoCarrito')
// const cartData = new DaoCarritoMongo()

const cartFactory = require('../factories/cartsMongoFactory')
const dbCartsFactory = cartFactory.createInstance()

async function createCart(){
    const data = await dbCartsFactory.createCart()
    return data
}

async function cartItems(cartRef){
    const data = await dbCartsFactory.getCartById(cartRef);
    return data;
}

async function deleteCartById(cartRef){
    const data = await dbCartsFactory.deleteDoc(cartRef)
    return data;
}

async function postAddItemToCart(idCart, prod){
    const data = await dbCartsFactory.addToCart(idCart, prod)
    return data;
}

async function deleteItemOnCartById(idCart, idProd){
    const data = await dbCartsFactory.deleteProdOnCartById(idCart, idProd)
    return data;
}

async function deleteAllOnCart(idCart){
    const data = await dbCartsFactory.deleteAllProdsOnCartById(idCart)
    return data;
}

module.exports = {createCart, cartItems, deleteCartById, postAddItemToCart, deleteItemOnCartById, deleteAllOnCart}