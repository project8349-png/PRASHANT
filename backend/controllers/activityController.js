const Activity = require('../models/Activity');
const moment = require('moment');

exports.addActivity = async (req, res) => {
  try {
    const { studyHours, sleepHours, studyNotes, weeklyGoals } = req.body;
    
    const activity = new Activity({
      userId: req.userId,
      studyHours,
      sleepHours,
      studyNotes,
      weeklyGoals
    });

    await activity.save();
    res.status(201).json({ message: 'Activity recorded', activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodayActivity = async (req, res) => {
  try {
    const today = moment().startOf('day');
    const tomorrow = moment(today).add(1, 'day');

    const activity = await Activity.findOne({
      userId: req.userId,
      date: { $gte: today, $lt: tomorrow }
    });

    res.json(activity || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWeeklyReport = async (req, res) => {
  try {
    const weekAgo = moment().subtract(7, 'days').startOf('day');
    const activities = await Activity.find({
      userId: req.userId,
      date: { $gte: weekAgo }
    }).sort({ date: -1 });

    const totalStudy = activities.reduce((sum, act) => sum + act.studyHours, 0);
    const totalSleep = activities.reduce((sum, act) => sum + act.sleepHours, 0);

    res.json({
      totalStudyHours: totalStudy,
      totalSleepHours: totalSleep,
      activities
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMonthlyReport = async (req, res) => {
  try {
    const monthAgo = moment().subtract(30, 'days').startOf('day');
    const activities = await Activity.find({
      userId: req.userId,
      date: { $gte: monthAgo }
    }).sort({ date: -1 });

    const totalStudy = activities.reduce((sum, act) => sum + act.studyHours, 0);
    const totalSleep = activities.reduce((sum, act) => sum + act.sleepHours, 0);

    res.json({
      totalStudyHours: totalStudy,
      totalSleepHours: totalSleep,
      avgStudyPerDay: (totalStudy / 30).toFixed(2),
      avgSleepPerDay: (totalSleep / 30).toFixed(2),
      activities
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { studyHours, sleepHours, studyNotes, weeklyGoals } = req.body;
    
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { studyHours, sleepHours, studyNotes, weeklyGoals },
      { new: true }
    );

    res.json({ message: 'Activity updated', activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
