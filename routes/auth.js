const express = require('express');
const { check, body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');
const authController = require('../controllers/auth')

router.get('/login', authController.getLogin);

router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password invalid')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()
  ],
  authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter correct email')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('Email forbidden.')
        // }
        // return true;
        return User.findOne({ email: value })
          .then(userDetail => {
            if (userDetail) {
              return Promise.reject('Email already taken.')
            };
          })
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    })
  ],
  authController.postSignup
);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/new-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports = router;