const express = require('express')
const { getLoginError } = require('../controllers/viewsController')
const {Router} = express

const loginError = Router()

loginError.get('/', getLoginError)

module.exports= loginError