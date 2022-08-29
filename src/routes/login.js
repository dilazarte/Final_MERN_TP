const express = require('express')
const passport = require('passport');
const { getLogin, postLogin } = require('../controllers/viewsController');
const {Router} = express

const loginRouter = Router()


loginRouter.get('/', getLogin)

loginRouter.post('/', passport.authenticate('login', {failureRedirect: '/loginError'}), postLogin)

module.exports= loginRouter