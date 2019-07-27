const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const keys = require('../keys/key');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: keys.SENDGRIDAPIKEY
  }
}));

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  message = message.length > 0? message[0]:null;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'login',
    errorMessage: message
  })
}

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  message = message.length > 0? message[0]:null;
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign Up',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'invalid email or password');
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            // ensure the session successfully created
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/');
            })
          }
          req.flash('error', 'invalid email or password');
          res.redirect('/login')
        })
        .catch(err => {
          res.redirect('/login');
          console.log(err);
        });
    })
    .catch(err => console.log(err));
}

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then(userDetail => {
      if (userDetail) {
        req.flash('error', 'E-mail exists already.');
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'shop@node-complete.com',
            subject: 'Sign up succeeded!',
            html: '<h1>Success!</h1>'
          }).catch(err => {
            console.log('err: ', err);
          })
        })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/');
  })
}