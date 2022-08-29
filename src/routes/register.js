const express = require('express')
const passport = require('passport');
const { getRegister, postRegister } = require('../controllers/viewsController');
const { upload } = require('../middlewares/fileUpload');
const {Router} = express

const registerRouter = Router()


registerRouter.get('/', getRegister)

registerRouter.post('/', upload, passport.authenticate('signup', { failureRedirect: '/signupError' }), postRegister)

module.exports= registerRouter