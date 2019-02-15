const http = require('http'); //import files

const routes = require ('./routes')
//http module
// function rqListener(req,res){
// }
// http.createServer(rqListener);

// http.createServer(function(req,res){
// })

console.log(routes.sometext);

// const server = http.createServer(routes);

const server = http.createServer(routes.handler);

server.listen(3000);  //listen for incoming request
