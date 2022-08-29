const express = require('express')
const {Router} = express
const {notFoundPage} = require('../controllers/viewsController')

const notFound = Router()

notFound.get('/', notFoundPage)

module.exports= notFound