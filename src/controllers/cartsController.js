const { createCart, cartItems, deleteCartById, postAddItemToCart, deleteItemOnCartById, deleteAllOnCart } = require('../services/cartServices');
const { getProdById } = require('../services/prodsServices')
const { newOrder } = require('../utils/sendMail')
const { sendWhatsapp } = require('../utils/sendWhatsapp')

async function postCreateCart(req, res){
    let idNewCart = await createCart();
    if(idNewCart){
        res.status(200).json(idNewCart)
    }else{
        res.status(400).json({error: 'No se pudo crear el carrito de compra'})
    }
}

async function deleteCart(req, res){
    try{
        let id = req.params.id
        let deleted = await deleteCartById(id)
        res.status(200).json(deleted)
    }
    catch(error){
        res.json({error: error})
    }
}

async function getProdsOnCart(req, res){
    let id = req.params.id
    let prods = await cartItems(id);
    res.status(200).json(prods.productos);
}

async function postAddToCart(req, res){
    let idCart = req.params.id
    let idProd = req.body.id;
    let prod = await getProdById(idProd)
    console.log(prod)
    if(prod){
        let data = await postAddItemToCart(idCart, prod);
        res.status(200).json(data)
    }else{
        res.status(400).json({error: `Producto con ID ${idProd} no encontrado`})
    }
}

async function deleteItemOnCart(req, res){
    let idCart = req.params.id_cart 
    let idProd = req.params.id_prod;
    let deletedProd = await deleteItemOnCartById(idCart, idProd)
    res.status(200).json(deletedProd)
}

async function deleteAllItemsOnCart(req, res){
    let idCart = req.params.id_cart
    let deleteProd = await deleteAllOnCart(idCart)
    res.status(200).json(deleteProd)
}

async function postConfirmPurchase(req, res){
    const user = req.user;
    let idCart = req.params.id_cart
    let prods = await cartItems(idCart)
    newOrder(user, prods.productos)
    sendWhatsapp(user, prods.productos)

    let deleteProds = await deleteAllOnCart(idCart)
    res.status(200).json(deleteProds)
}

module.exports = {postCreateCart, deleteCart, getProdsOnCart, postAddToCart, deleteItemOnCart, deleteAllItemsOnCart, postConfirmPurchase}