const Review = require('./model');

exports.validateBodyReview = (req, res, next) => {
  const {
    itemName,
    foodType,
    comments,
    rating,
    photo,
    photoUrl,
    date,
    restaurantName,
    restaurantInfo
  } = req.body;
  if (itemName && foodType && rating && date && restaurantName) {
    const review = {
      itemName,
      foodType,
      rating,
      date,
      restaurantName,
      photo,
      photoUrl,
      comments,
      restaurantInfo,
      userId: req.user.id
    };
    req.review = review;
    next();
  } else {
    res.status(400).json({ message: 'Missing required parameter' });
  }
};

exports.validateReviewIdForUser = async (req, res, next) => {
  try {
    const reviewId = Number(req.params.id);
    const user = req.user;
    const review = await Review.find(reviewId);
    if (review && user.id === review.userId) {
      // eslint-disable-next-line require-atomic-updates
      req.review = review;
      next();
    } else {
      res.status(401).json({ message: 'Wrong credentials' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error with your request' });

  }
};
