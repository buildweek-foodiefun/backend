const db = require('../../data/dbconf');

exports.insert = ({ username, password }) => {
  return db.insert({ username, password });
};
