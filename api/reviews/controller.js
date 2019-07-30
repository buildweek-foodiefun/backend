const Review = require('./model');

exports.find = async (req, res) => {
  const user = req.user;
  try {
    const reviews = await Review.find(user.id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'There was an error with your request' });
  }
};
