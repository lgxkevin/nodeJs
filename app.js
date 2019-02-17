const http = require('http'); //import files

const express = require('express')

const app = express();

app.use('/add-product',(req,res,next)=>{
    console.log("In another middleware");
    res.send('<h1>Add product page</h1>');
})

app.use('/',(req,res,next)=>{
    console.log("In another middleware");
    res.send('<h1>Hello from express</h1>');
})
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
