const express = require('express');

const Router = express.Router();

const productsController = require('../controllers/products');

Router.get('/add-product', productsController.getAddProducts);

Router.post('/add-product', productsController.postAddProducts);

// module.exports = Router;
module.exports = Router;
