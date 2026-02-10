const express = require('express');
const auth = require('../middleware/auth');
const { addActivity, getTodayActivity, getWeeklyReport, getMonthlyReport, updateActivity } = require('../controllers/activityController');

const router = express.Router();

router.post('/add', auth, addActivity);
router.get('/today', auth, getTodayActivity);
router.get('/weekly', auth, getWeeklyReport);
router.get('/monthly', auth, getMonthlyReport);
router.put('/update/:id', auth, updateActivity);

module.exports = router;
