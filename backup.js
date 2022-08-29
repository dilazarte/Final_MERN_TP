const express = require('express')
const {Router} = express

//const {DaoProductosFS} =  require('../DAOs/productos/DaoProductosFS')
//const daoProds = new DaoProductosFS()

const {DaoProductosMongo} =  require('../DAOs/DaosMongoProductos')
const daoProdsMongo = new DaoProductosMongo()

// const {DaoProductosFirebase} =  require('../DAOs/productos/DaoProductosFirebase')
// const daoProdsFb = new DaoProductosFirebase()

const routerProductos = Router()
let admin = true;
//GET
routerProductos.get('/:id?', async(req, res)=>{
    const id = req.params.id;
    //const productos = await daoProds.getAll()
    const productos = await daoProdsMongo.getAllDoc() //mongoDB
    //const productos = await daoProdsFb.getAllDoc() //mongoDB
    if(id){
        //const productoById = await daoProds.getById(id)//Filesystem
        const productoById = await daoProdsMongo.getDocById(id)//mongoDB
        //const productoById = await daoProdsFb.getDocById(id)
        if(productoById){
            res.status(200).json(productoById)
        }else{
            res.status(404).json({'Error': `Producto no encontrado con id ${id}`})
        }
    }else{
        res.status(200).json(productos)
    }
})
//POST
routerProductos.post('/', async(req, res)=>{
    let newProducto = req.body
    if(newProducto && newProducto.nombre && newProducto.descripcion && newProducto.foto && newProducto.codigo && newProducto.precio && newProducto.stock){
        newProducto.precio = parseInt(newProducto.precio)
        newProducto.stock = parseInt(newProducto.stock)
        //let id = await daoProds.save(newProducto) //filesystem
        //res.status(200).json({Success:`Se agrego correctamente el nuevo producto con ID: ${id}`})

        let id = await daoProdsMongo.addDoc(newProducto) //mongoDB
        res.status(200).json({Success:`Se agrego correctamente el nuevo producto con ID: ${id._id}`}) //res de mongoDB

        // let id = await daoProdsFb.addDoc(newProducto) //firebase
        // res.status(200).json({Success:`Se agrego correctamente el nuevo producto con ID: ${id}`}) //res de firebase
    }else{
        res.status(200).json({Error:`No se pudo agregar el producto, verifique los datos`})
    }
    
})
//PUT
routerProductos.put('/:id', async(req, res)=>{
    try{
        //let data = await daoProds.editById(req.params.id, req.body) //filesystem
        let data = await daoProdsMongo.updateDoc(req.params.id, req.body) //mongoDB
        //let data = await daoProdsFb.updateDoc(req.params.id, req.body) //firebase
        res.status(200).json({Success: data})
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})
//DELETE
routerProductos.delete('/:id', async (req, res)=>{
    if(admin){
        try{
            //let id = parseInt(req.params.id) //Filesystem
            //await daoProds.deleteById(id) //Filesystem

            let id = req.params.id //mongoDB
            let deletedItem = await daoProdsMongo.deleteDoc(id) //mongoDB

            // let id = req.params.id //firebase
            // let deletedItem = await daoProdsFb.deleteDoc(id) //firebase
            res.status(200).json(deletedItem)
        }
        catch(error){
            res.json({error: error})
        }
    }else{
        res.json({error: `No se puede eliminar el producto, se requiere admin`})
    }
})

module.exports = {routerProductos}

const express = require('express')
const {Router} = express
const { newOrder } = require('../utils/sendMail')

//////////////// FILESYSTEM //////////////////
        // const {DaoCarritoFS} = require('../DAOs/carritos/DaoCarritoFS')
        // const daoCarts = new DaoCarritoFS()
        // const {DaoProductosFS} =  require('../DAOs/productos/DaoProductosFS') //filesystem
        // const daoProds = new DaoProductosFS() //filesystem
/////////////////////////////////////////////

//////////////// MONGODB /////////////////////
        const DaoCarritoMongo = require('../DAOs/DaosMongoCarrito')
        const daoCartsMongo = new DaoCarritoMongo()
        const DaoProductosMongo =  require('../DAOs/DaosMongoProductos')
        const { sendWhatsapp } = require('../utils/sendWhatsapp')
        const daoProdsMongo = new DaoProductosMongo()
//////////////////////////////////////////////

//////////////// FIREBASE /////////////////////
        // const {DaoCarritoFirebase} = require('../DAOs/carritos/DaoCarritoFirebase')
        // const DaoCartsFb = new DaoCarritoFirebase()
        // const {DaoProductosFirebase} =  require('../DAOs/productos/DaoProductosFirebase')
        // const DaoProdsFb = new DaoProductosFirebase()
//////////////////////////////////////////////

//defino la ruta.-
const routerCarrito = Router()

let admin = true
//POST (crea un carrito)
routerCarrito.post('/', async(req, res)=>{
    //let idNewCart = await daoCarts.createCart(); //filesystem
    let idNewCart = await daoCartsMongo.createCart(); //mongoDB
    //let idNewCart = await DaoCartsFb.createCart()
    if(idNewCart){
        res.status(200).json(idNewCart)
    }else{
        res.status(400).json({'Error':`No se pudo crear el carrito de compra`})
    }
})
//DELETE
routerCarrito.delete('/:id', async(req, res)=>{
    try{
        //let id = parseInt(req.params.id) //filesystem
        // await daoCarts.deleteById(id) //filesystem

        let id = req.params.id //mongoDB
        let deleted = await daoCartsMongo.deleteDoc(id)
        res.status(200).json(deleted)
    }
    catch(error){
        res.json({"error": error})
    }
})
//GET (ver productos por id de carrito)
routerCarrito.get('/:id/productos', async(req, res)=>{
    if(admin){
        //let id = parseInt(req.params.id) // filesystem
        //let prods = await daoCarts.getById(id) //filesystem
        //res.status(200).json(prods) // filesystem

        let id = req.params.id; //mongoDB
        let prods = await daoCartsMongo.getDocById(id) //mongoDB
        res.status(200).json(prods[0].productos) //mongoDB 

        // let id = req.params.id; //firebase
        // let prods = await DaoCartsFb.getDocById(id) //firebase
        // res.status(200).json(prods.productos) //firebase
    }else{
        res.status(200).json({Error: 'Necesita ser admin'})
    }
})
//POST agrega un producto al carrito
routerCarrito.post('/:id/productos', async(req, res)=>{
    // let idCart = parseInt(req.params.id) //filesystem
    // let idProd = parseInt(req.body.id); //filesystem
    // let prod = await daoProds.getById(idProd) // filesystem

    let idCart = req.params.id //mongoDB
    let idProd = req.body.id; //mongoDB
    let prod = await daoProdsMongo.getDocById(idProd) // mongoDB

    // let idCart = req.params.id //firebase
    // let idProd = req.body.id; //firebase
    // let prod = await DaoProdsFb.getDocById(idProd) // firebase
    //console.log(prod)
    
    if(prod){
        //let data = await daoCarts.addToCart(idCart, prod) // filesystem
        let data = await daoCartsMongo.addToCart(idCart, prod) // mongoDB
        //let data = await DaoCartsFb.addToCart(idCart, prod) // firebase
        res.status(200).json(data)
    }else{
        res.status(400).json({error: `Producto con ID ${idProd} no encontrado`})
    }
})
//DELETE borra un producto por id de carrito
routerCarrito.delete('/:id_cart/productos/:id_prod', async(req, res)=>{
    //let idCart = parseInt(req.params.id_cart) //filesystem
    //let idProd = parseInt(req.params.id_prod); //filesystem
    //let deleteProd = await daoCarts.deleteProdOnCartById(idCart, idProd) //filesystem

    let idCart = req.params.id_cart //mongoDB
    let idProd = req.params.id_prod; //mongoDB
    let deleteProd = await daoCartsMongo.deleteProdOnCartById(idCart, idProd) //mongoDB

    // let idCart = req.params.id_cart //firebase
    // let idProd = req.params.id_prod; //firebase
    // let deleteProd = await DaoCartsFb.deleteProdOnCartById(idCart, idProd) //firebase

    res.status(200).json(deleteProd)
})

routerCarrito.delete('/:id_cart/productos/all', async(req, res)=>{
    //let idCart = parseInt(req.params.id_cart) //filesystem
    //let idProd = parseInt(req.params.id_prod); //filesystem
    //let deleteProd = await daoCarts.deleteProdOnCartById(idCart, idProd) //filesystem

    let idCart = req.params.id_cart //mongoDB
    let deleteProd = await daoCartsMongo.deleteAllProdsOnCartById(idCart) //mongoDB

    // let idCart = req.params.id_cart //firebase
    // let idProd = req.params.id_prod; //firebase
    // let deleteProd = await DaoCartsFb.deleteProdOnCartById(idCart, idProd) //firebase

    res.status(200).json(deleteProd)
})

routerCarrito.post('/:id_cart/confirmPurchase', async(req, res)=>{
    const user = req.user;
    let idCart = req.params.id_cart //mongoDB
    let prods = await daoCartsMongo.getDocById(idCart)
    newOrder(user, prods[0].productos)
    sendWhatsapp(user, prods[0].productos)

    let deleteProds = await daoCartsMongo.deleteAllProdsOnCartById(idCart) //mongoDB
    res.status(200).json(deleteProds)
})

module.exports = {routerCarrito}