const express = require('express')
const {Router} = express
const { authCheck } = require('../middlewares/authCheck')
const { getAdmin } = require('../controllers/viewsController')

const adminRouter = Router()

adminRouter.get('/', authCheck, getAdmin)

module.exports= adminRouter