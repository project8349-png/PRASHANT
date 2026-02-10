const Friendship = require('../models/Friendship');
const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;

    if (req.userId === friendId) {
      return res.status(400).json({ message: 'Cannot friend yourself' });
    }

    let friendship = await Friendship.findOne({
      $or: [
        { userId: req.userId, friendId: friendId },
        { userId: friendId, friendId: req.userId }
      ]
    });

    if (friendship) {
      return res.status(400).json({ message: 'Friend request already exists' });
    }

    friendship = new Friendship({
      userId: req.userId,
      friendId: friendId,
      requestSentBy: req.userId,
      status: 'pending'
    });

    await friendship.save();
    res.status(201).json({ message: 'Friend request sent', friendship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendshipId } = req.body;

    const friendship = await Friendship.findByIdAndUpdate(
      friendshipId,
      { status: 'accepted' },
      { new: true }
    );

    res.json({ message: 'Friend request accepted', friendship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const requests = await Friendship.find({
      friendId: req.userId,
      status: 'pending'
    }).populate('userId', 'username profilePic email');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const friendships = await Friendship.find({
      $or: [
        { userId: req.userId, status: 'accepted' },
        { friendId: req.userId, status: 'accepted' }
      ]
    }).populate('userId', 'username profilePic email')
      .populate('friendId', 'username profilePic email isOnline');

    const friends = friendships.map(f => {
      return f.userId._id.toString() === req.userId ? f.friendId : f.userId;
    });

    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const { friendId } = req.body;

    await Friendship.deleteOne({
      $or: [
        { userId: req.userId, friendId: friendId },
        { userId: friendId, friendId: req.userId }
      ]
    });

    res.json({ message: 'Friend removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
