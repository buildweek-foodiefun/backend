const db = require('../../data/dbconf');

exports.findByUsername = username => {
  return db('users').where({ username }).first();
};

exports.insert = ({ username, password }) => {
  return db('users').insert({ username, password });
};
