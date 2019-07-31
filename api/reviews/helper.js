exports.formatDateReview = review => {
  if (review.dateOfVisit.includes('T')) {
    let temp = review;
    temp.dateOfVisit = review.dateOfVisit.split('T')[0];

    return temp;
  }

  return review;
};
