const express = require('express')
const { getSignUpError } = require('../controllers/viewsController')
const {Router} = express

const signUpError = Router()

signUpError.get('/', getSignUpError)

module.exports= signUpError