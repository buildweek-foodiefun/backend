const Review = require('./model');
const helper = require('./helper');

exports.find = async (req, res) => {
  const user = req.user;
  try {
    const filter = req.filter;
    let reviews = await Review.findByUserId(user.id, filter);
    for (let i = 0; i < reviews.length; i++) {
      reviews[i] = helper.formatDateReview(reviews[i]);
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'There was an error with your request' });
  }
};

exports.post = async (req, res) => {
  try {
    const reviewObject = req.review;
    const createdReviewIdArray = await Review.add(reviewObject);
    let createdReview = await Review.find(createdReviewIdArray[0]);
    createdReview = helper.formatDateReview(createdReview);
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
    res.status(500).json({ message: 'There was an error with your request' });
  }
};

exports.update = async (req, res) => {
  try {
    await Review.update(req.review);
    let updatedReview = await Review.find(req.review.id);
    updatedReview = helper.formatDateReview(updatedReview);
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'There was an error with your request' });
  }
};
