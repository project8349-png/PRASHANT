const express = require('express');
const auth = require('../middleware/auth');
const { sendFriendRequest, acceptFriendRequest, getFriendRequests, getFriends, removeFriend } = require('../controllers/friendController');

const router = express.Router();

router.post('/request', auth, sendFriendRequest);
router.post('/accept', auth, acceptFriendRequest);
router.get('/requests', auth, getFriendRequests);
router.get('/list', auth, getFriends);
router.post('/remove', auth, removeFriend);

module.exports = router;
