const path = require('path');

const express = require('express');

const Router = express.Router();

Router.get('/',(req,res,next)=>{
    // res.send('<h1>Hello from express</h1>');
    res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
})

module.exports = Router;