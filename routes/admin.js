const express = require('express');

const Router = express.Router();

Router.get('/add-product',(req,res,next)=>{
    res.send('<html><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button><form></html>');
})

Router.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/')   
});

module.exports = Router;
