const http = require('http'); //import files
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express')

const app = express();

const adminRoutes  = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

app.use(shopRoutes);
app.use('/admin',adminRoutes);
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

const server = http.createServer(app);

server.listen(3000);  //listen for incoming request
