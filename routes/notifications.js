// routes/notification.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

/*
    ROUTE: api/notifications/notify-followers
    METHOD: POST
    DESC: Notify followers about a live stream
 */
router.post('/notify-followers', auth, notificationController.notifyFollowers);

module.exports = router;
