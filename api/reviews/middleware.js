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
