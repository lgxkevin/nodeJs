const express = require('express');

const Router = express.Router();

const productsController = require('../controllers/products')
Router.get('/', productsController.getProduct)

module.exports = Router;