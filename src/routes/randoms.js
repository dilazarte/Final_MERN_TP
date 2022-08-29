const express = require('express')
const {Router} = express

const { getRandomsNums } = require('../controllers/viewsController');


const randomsNum = Router()

randomsNum.get('/', getRandomsNums)

module.exports= randomsNum