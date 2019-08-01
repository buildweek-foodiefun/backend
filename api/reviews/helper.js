exports.formatDateReview = review => {
  if (typeof review.dateOfVisit !== "string") {
    const jsonString = review.dateOfVisit.toJSON();
    if (jsonString.includes('T')) {
      let temp = review;
      temp.dateOfVisit = jsonString.split('T')[0];

      return temp;
    }
  }

  return review;
};
