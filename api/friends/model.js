const db = require('../../data/dbconf');

exports.addFriend = (requester, receiver) => {
  return db('friendships').insert({ requester: requester, receiver: receiver });
};
