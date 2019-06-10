const http = require('http'); //import files
const bodyParser = require('body-parser');
const path = require('path');
// const expressHbs = require('express-handlebars');

const express = require('express')

const app = express();
const errorController = require('./controllers/error')
// register Handlebars
// expressHbs() returns the initialized view engine
// app.engine('handlebars', expressHbs({
//     layoutsDir:'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'handlebars'
// }));
// app.set('view engine', 'handlebars');

// set the view engine to Ejs
app.set('view engine', 'ejs');

// the default engine extension to use when omitted
//app.set('view engine', 'pug');

// A directory or an array of directories for the application's views.
app.set('views', 'views');


const adminRoutes  = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// req.body contains key-value pairs of data submitted in the request body.
// By default, it is undefined, and is populated when use body-parsing middleware
app.use(bodyParser.urlencoded({extended:false}));
// load public css files
app.use(express.static(path.join(__dirname,'public')));

app.use(shopRoutes);
app.use('/admin',adminRoutes);
app.use(errorController.get404);

const server = http.createServer(app);

server.listen(3000);  //listen for incoming request
