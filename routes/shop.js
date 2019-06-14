const express = require('express');

const Router = express.Router();

const shopController = require('../controllers/shop')
Router.get('/', shopController.getIndex)

Router.get('/products', shopController.getProducts);

Router.get('/cart',shopController.getCart);

Router.get('/orders',shopController.getOrders);

Router.get('/checkout', shopController.getCheckOut);

module.exports = Router;