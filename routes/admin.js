const path = require('path');

const express = require('express');

const Router = express.Router();

const rootDir = require ('../util/path');

const products = [];
Router.get('/add-product',(req,res,next)=>{
    //res.send('<html><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button><form></html>');
    res.sendFile(path.join(rootDir,'views','add-product.html'))
})

Router.post('/add-product',(req,res,next)=>{
    products.push({title: req.body.title});
    res.redirect('/')   
});

// module.exports = Router;
exports.routes = Router;
exports.products = products;
