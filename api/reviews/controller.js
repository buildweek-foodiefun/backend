const Review = require('./model');

exports.find = async (req, res) => {
  const user = req.user;
  try {
    const reviews = await Review.findByUserId(user.id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'There was an error with your request' });
  }
};

exports.post = async (req, res) => {
  try {
    const reviewObject = req.review;
    const createdReviewIdArray = await Review.add(reviewObject);
    const createdReview = await Review.find(createdReviewIdArray[0]);
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: 'There was an error with your request' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Review.delete(req.review.id);
    res.json({ message: 'Review deleted', review: req.review });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error with your request' });

  }
}
