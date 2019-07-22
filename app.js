const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express')

const app = express();
const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const mongoose = require('mongoose');

// set the view engine to Ejs
app.set('view engine', 'ejs');

// A directory or an array of directories for the application's views.
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// req.body contains key-value pairs of data submitted in the request body.
// By default, it is undefined, and is populated when use body-parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
// load public css files
app.use(express.static(path.join(__dirname, 'public')));

// registered for incoming request, a middleware, 
// after server successfully started
app.use((req, res, next) => {
    User.findById('5d357f5fd7f0c949dc45422c')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use(shopRoutes);
app.use('/admin', adminRoutes);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://kevinLiuRW:liuguanxi1995.@cluster0-ghwpk.azure.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true })
    .then(app.listen(3000))
    .catch(err => console.log(err))