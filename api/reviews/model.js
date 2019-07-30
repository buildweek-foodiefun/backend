const db = require('../../data/dbconf');

exports.find = id => {
  return db('reviews')
    .where({ id })
    .first();
};

exports.findByUserId = userId => {
  return db('reviews').where({ userId });
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
