const Review = require('./model');

exports.validateBodyReview = (req, res, next) => {
  const {
    menuItem,
    restaurantType,
    comments,
    foodRating,
    photoOfOrder,
    dateOfVisit,
    restaurantName,
    price,
    waitTime
  } = req.body;
  if (menuItem && restaurantType && foodRating && dateOfVisit && restaurantName && price && waitTime) {
    const review = {
      menuItem,
      restaurantType,
      foodRating,
      dateOfVisit,
      restaurantName,
      photoOfOrder,
      comments,
      waitTime,
      price,
      userId: req.user.id,
      id: req.params.id ? Number(req.params.id) : undefined
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
    let review = await Review.find(reviewId);
    if (review && user.id === review.userId) {
      review.id = reviewId;
      // eslint-disable-next-line require-atomic-updates
      req.review = review;
      next();
    } else {
      res.status(401).json({ message: 'Wrong credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'There was an error with your request' });
  }
};

exports.parseFilters = (req, res, next) => {
  let filter = req.query;
  if (filter.price) {
    filter.price = Number(filter.price);
  } else if (filter.foodRating) {
    filter.foodRating = Number(filter.foodRating);
  } else if (filter.waitTime) {
    filter.waitTime = Number(filter.waitTime);
  }
  req.filter = filter;
  next();
};
