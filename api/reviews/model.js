const db = require('../../data/dbconf');

exports.find = id => {
  return db('reviews').where({ id });
};
