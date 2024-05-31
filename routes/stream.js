const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');


/*
    ROUTE: api/stream/start
    METHOD: POST
    DESC: Start a live stream and notify followers
*/
router.post('/start', auth, notificationController.notifyFollowers);

module.exports = router;
