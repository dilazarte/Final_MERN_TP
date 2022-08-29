const express = require('express')
const { getProductsFaker } = require('../controllers/viewsController');
const {Router} = express

const prodTest = Router();

prodTest.get('/', getProductsFaker)

module.exports = prodTest