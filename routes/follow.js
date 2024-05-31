const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const followController = require('../controllers/followController');

/*
    ROUTE: api/follow
    METHOD: POST
    DESC: Follow User
*/
router.post('/',auth,followController.follow);

/*
    ROUTE: api/follow
    METHOD: DELETE
    DESC: Unfollow User
*/
router.delete('/',auth,followController.unfollow);

module.exports = router;


