const http = require('http'); //import files
const bodyParser = require('body-parser');

const express = require('express')

const app = express();

const adminRoutes  = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

app.use(shopRoutes);
app.use(adminRoutes);

// const routes = require ('./routes')
//http module
// function rqListener(req,res){
// }
// http.createServer(rqListener);

// http.createServer(function(req,res){
// })

// console.log(routes.sometext);

// const server = http.createServer(routes);

// const server = http.createServer(routes.handler);
const server = http.createServer(app);

server.listen(3000);  //listen for incoming request
