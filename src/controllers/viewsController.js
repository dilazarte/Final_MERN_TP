const { fakerProds } = require('../services/viewsServices');

// const { cartItems } = require('../services/cartServices');
const cartFactory = require('../factories/cartsMongoFactory')
const dbCartsFactory = cartFactory.createInstance()

const { loggerError } = require('../utils/loggers');
const { fork } = require('child_process');

async function notFoundPage(req, res){
    res.render('404')
    loggerError.error(`Pagina no encontrada ${req.baseUrl}`)
}

async function getAdmin(req, res){
        if (req.isAuthenticated()) {
            let user = req.user;
            let cartItems = await dbCartsFactory.getCartById(user.cartRef)
            let Qty = cartItems
            res.render('admin', {
                name: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                cart: user.cartRef,
                cartQty: Qty.productos.length,
                session:true
            })
        } else {
            res.redirect('login')
        }
}

async function getInicio(req, res){
    if(req.isAuthenticated()){
        res.status(200).redirect('admin')
    }else{
        res.status(200).render('main')
    }
}

//Login

async function getLogin(req, res){
    if(req.isAuthenticated()){
        res.redirect('admin')
    }else{
        res.render('login')
    }
}

async function postLogin(req, res){
    if (req.isAuthenticated()) {
        res.redirect('/admin')
    } else {
        res.redirect('/login')
    }
}

async function getLoginError(req, res){
    res.render('loginError')
}

async function getLogout(req, res){
    if (req.isAuthenticated()) {
        let user = req.user;
        req.logout(err =>{
            if(err){ loggerError.error(`Error al cerrar sesion: ${err}`) }
        })
        res.render('logout', {name: user.firstName, lastName: user.lastName, logout: true})
    } else {
        res.render('logout')
    }
}

async function getCart(req, res){
    if (req.isAuthenticated()) {
        let user = req.user;
        let items = await dbCartsFactory.getCartById(user.cartRef)
        let Qty = items
        res.render('myCart', {
            name: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            cart: user.cartRef,
            cartQty: Qty.productos.length,
            session: true
        })
    } else {
        res.redirect('/login')
    }
}

async function getRegister(req, res){
    res.render('register')
}

async function postRegister(req, res){
    if (req.isAuthenticated()) {
        res.redirect('/admin')
    } else {
        res.redirect('/login')
    }
}

async function getSignUpError(req, res){
    res.render('signupError')
}

async function getRandomsNums(req, res){
    let num = parseInt(req.query.cant) || 100000000;
    const forked = fork('src/utils/randomsNum.js')
    forked.send(num);
    forked.on('message', data => {
        res.status(200).json(data)
        forked.send('exit')
    })
}

async function getProductsFaker(req, res){
    const productos = await fakerProds()
    res.status(200).json(productos)
}

module.exports = {
    notFoundPage,
    getAdmin,
    getInicio,
    getLogin,
    postLogin,
    getLoginError,
    getLogout,
    getCart,
    getRegister,
    postRegister,
    getSignUpError,
    getRandomsNums,
    getProductsFaker
}