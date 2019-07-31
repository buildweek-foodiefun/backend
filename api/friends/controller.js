exports.addFriend = (req, res) => {
  res.json({
    message: `${req.user.username} is inviting ${req.params.username}`
  });
};
