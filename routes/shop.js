const path = require('path');

const express = require('express');

const Router = express.Router();

const rootDir = require('../util/path');
const adminData = require('./admin')

Router.get('/', (req, res, next) => {
    // res.send('<h1>Hello from express</h1>');
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));

    // use the default templating engine (defined in app.js) and return that template
    const products = adminData.products;
    // render function allow us to pass data that should be added in to view
    res.render('shop', {
        prods: products,
        pageTitle: 'PugShop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
        // don't use the default layout
        // layout: false
    });
})

module.exports = Router;