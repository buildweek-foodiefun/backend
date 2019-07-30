const db = require('../../data/dbconf');

exports.find = id => {
  return db('reviews').where({ id });
};

exports.findByUserId = userId => {
  return db('reviews').where({ userId });
}

exports.add = reviewObject => {
  return db('reviews').insert(reviewObject);
};
