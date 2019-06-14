const express = require('express');

const Router = express.Router();

const adminController = require('../controllers/admin');

// /admin/add-product => GET
Router.get('/add-product', adminController.getAddProducts);

// /admin/products => GET
Router.get('/products', adminController.getProducts);

// /admin/add-product => POST
Router.post('/add-product', adminController.postAddProducts);

// module.exports = Router;
module.exports = Router;
