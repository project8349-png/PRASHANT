const express = require('express');
const auth = require('../middleware/auth');
const { getAllUsers, getUserProfile, updateProfile, getOnlineUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/online', getOnlineUsers);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;
