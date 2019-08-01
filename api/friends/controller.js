const User = require('../users/model');
const Friend = require('./model');

exports.getFriends = async (req, res) => {
  const friends = await Friend.findReciprocalFriendsForId(req.user.id);
  res.json(friends);
};

exports.addFriend = async (req, res) => {
  const invitedUsername = req.params.username;
  try {
    const invitedUser = await User.findByUsername(invitedUsername);
    if (invitedUser) {
      const response = await Friend.addFriend(req.user.id, invitedUser.id);
      res.status(201).json(response);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500).json({ message: 'You could not invite that user' });
  }
};
