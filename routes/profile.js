const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const profileController = require('../controllers/profileController');


/*
    ROUTE: api/profile
    METHOD: GET
    DESC: Get current user's profile
*/
router.get('/', auth, profileController.getProfile);


/*
    ROUTE: api/profile
    METHOD: PUT
    DESC: Update user's profile
*/
router.put('/',auth,
    [
        check('email','Please include a valid email').isEmail().optional(),
        check('username', 'Username is required').not().isEmpty().optional(),
        check('fullName', 'Full Name is required').not().isEmpty().optional()

    ],profileController.updateProfile
);

module.exports = router;

