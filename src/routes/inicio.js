const { FakerError } = require('@faker-js/faker');
const express = require('express');
const {Router} = express
const { getInicio } = require('../controllers/viewsController');

const inicioRouter = Router()

inicioRouter.get('/', getInicio)

module.exports = inicioRouter