const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express')

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');
const isAuth = require('./middleware/is-auth');
const shopController = require('./controllers/shop');

const keys = require('./keys/key');
const mongoose = require('mongoose');
const User = require('./models/user')
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const MONGODB_URI = keys.MONGODB_URI;

const app = express();
const store = new MongodbStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

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

// single: handle only one file
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

// load public css files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));
app.use(flash());

app.use((req, res, next) => {
  // every request that is executed, these two fields will be set
  // for the views that are rendered
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

// registered for incoming request, a middleware, 
// after server successfully started
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      // inside async functions, wrap error inside next()
      next(new Error(err));
    });
});

app.post('/create-order', isAuth, shopController.postOrder);
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use('/500', errorController.get500);

app.use(errorController.get404);

// error handler middleware
app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode().render(...));
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Server Error',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  })
});

mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch(err => console.log(err))
