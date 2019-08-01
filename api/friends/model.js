const db = require('../../data/dbconf');

exports.addFriend = (requester, receiver) => {
  return db('friendships').insert({ requester: requester, receiver: receiver });
};

exports.findReciprocalFriendsForId = async id => {
  let friendsId = [];
  const sentFriendshipsRequest = await db('friendships').where({ requester: id });
  for (let request of sentFriendshipsRequest) {
   const isReciprocal = await db('friendships').where({ requester: request.receiver, receiver: request.requester} ).first();
   if (isReciprocal) {
     friendsId.push(request.receiver);
   }
  }

  return friendsId;
};
