const db = require('../../data/dbconf');

exports.insert = ({ username, password }) => {
  return db('users').insert({ username, password });
};
