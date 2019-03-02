const path = require('path');

const express = require('express');

const Router = express.Router();

const rootDir = require('../util/path');
Router.get('/',(req,res,next)=>{
    // res.send('<h1>Hello from express</h1>');
    res.sendFile(path.join(rootDir,'views', 'shop.html'));
})

module.exports = Router;