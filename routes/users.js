const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');


/*
    ROUTE: api/users/signup
    METHOD: POST
    DESC: Register user
*/
router.post(
    '/signup',
    [
        check('fullName', 'Full Name is required').not().isEmpty(),
        check('username', 'Username  is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({min:6})
    ],
    userController.signup
);


/*
    ROUTE: api/users/login
    METHOD: POST
    DESC:  Authenticate user & get token
*/
router.post(
    '/login',
    [
        check('email','Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],

    userController.login
)

module.exports = router;
