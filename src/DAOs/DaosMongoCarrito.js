const ContenedorMongoDB = require('../containers/mongoContainer');
const carritos = require('../models/mongoCarritoModel')
const { loggerError } = require('../utils/loggers');

class DaoCarritoMongo extends ContenedorMongoDB{
    constructor(){
        super(carritos)
    }

    async getAllCarts(){
        try {
            let carts = await this.getAllDoc();
            return carts;
        } catch (error) {
            loggerError.error(error)
        }
    }

    async getCartById(id){
        try {
            let cartById = await this.getDocById(id);
            return cartById;
        } catch (error) {
            return error
        }
    }

    async createCart(){
        try{
            let newCarrito = {
                productos: []
            }
            let newCart = await this.addDoc(newCarrito)
            return newCart;
        }
        catch(err){
            loggerError.error(err)
        }
    }

    async addToCart(cartID, prod){
        try{
            let cartsArray = await this.getAllCarts();
            let cartById = cartsArray.filter(el => el._id == cartID);
                if(cartById.length > 0) {
                    let prods = cartById[0].productos;
                    prods.push(prod)
                    let productos = {productos: prods}
                    let data = await this.updateDoc(cartID, productos)
                    return data
                }else{
                    return 'Error'
                }
        }
        catch(error){
            return error
        }
    }

    async deleteProdOnCartById(idCart, idProd){
        try{
            let cartID = await this.getDocById(idCart);

            const productosCart = cartID.productos;
            const newCart = productosCart.filter(elem => elem._id != idProd)
            let newData = {productos: newCart}
            let updateCart = await this.updateDoc(idCart, newData)
            return updateCart
        }
        catch(error){
            return error
        }
    }

    async deleteAllProdsOnCartById(idCart){
        try{
            //let cartID = await this.getCartById(idCart);
            // const productosCart = cartID.productos;
            // const newCart = []
            let newData = {productos: []}
            let updateCart = await this.updateDoc(idCart, newData)
            return updateCart
        }
        catch(error){
            return error
        }
    }
}

module.exports = DaoCarritoMongo;