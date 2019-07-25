const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express')

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');

const mongoose = require('mongoose');
const User = require('./models/user')
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://kevinLiuRW:liuguanxi1995.@cluster0-ghwpk.azure.mongodb.net/test'

const app = express();
const store = new MongodbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

// set the view engine to Ejs
app.set('view engine', 'ejs');

// A directory or an array of directories for the application's views.
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// req.body contains key-value pairs of data submitted in the request body.
// By default, it is undefined, and is populated when use body-parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
// load public css files
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

// registered for incoming request, a middleware, 
// after server successfully started
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));});

app.use(shopRoutes);
app.use('/admin', adminRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI,
    { useNewUrlParser: true })
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => console.log(err))