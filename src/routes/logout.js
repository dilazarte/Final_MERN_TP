const express = require('express')
const { getLogout } = require('../controllers/viewsController')
const {Router} = express
const {loggerError} = require('../utils/loggers')

const logoutRouter = Router()

logoutRouter.get('/', getLogout)


module.exports= logoutRouter