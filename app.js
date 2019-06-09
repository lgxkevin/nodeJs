const http = require('http'); //import files
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express')

const app = express();

// the default engine extension to use when omitted
app.set('view engine', 'pug');
// A directory or an array of directories for the application's views.
app.set('views', 'views');


const adminData  = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(shopRoutes);
app.use('/admin',adminData.routes);
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

const server = http.createServer(app);

server.listen(3000);  //listen for incoming request
