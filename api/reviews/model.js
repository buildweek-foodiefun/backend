const db = require('../../data/dbconf');

exports.find = id => {
  return db('reviews')
    .where({ id })
    .first();
};

exports.findByUserId = (userId, filter) => {
  /* Use in case of greater of filter in numeric values
  if (filter.price || filter.waitTime || filter.foodRating) {
    return db('reviews')
      .where({ userId })
      .where(Object.keys(filter)[0], '>=', Object.values(filter)[0]);
  }
  */
  return db('reviews').where({ userId, ...filter });
};

exports.add = reviewObject => {
  return db('reviews').insert(reviewObject);
};

exports.delete = id => {
  return db('reviews')
    .del()
    .where({ id });
};

exports.update = reviewObject => {
  return db('reviews')
    .update(reviewObject)
    .where({ id: reviewObject.id });
};
