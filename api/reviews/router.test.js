const express = require('express');
const router = require('./router');
const request = require('supertest');
const db = require('../../data/dbconf');
const Review = require('./model');
const User = require('../users/model');
const authHelper = require('../auth/helper');

const server = express();
server.use(express.json());
server.use(router);

afterAll(async () => {
  await db.destroy();
});

describe('Reviews router', () => {
  it('should return the created reviews by a logged in user', async () => {
    const response = await request(server)
      .get('/')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});

async function getToken() {
  const userData = {
    username: 'test2',
    password: authHelper.generateHashedPassword('password')
  };
  const userIdArray = await User.add(userData);
  await Review.add({
    userId: userIdArray[0],
    menuItem: 'Escorpion',
    restaurantType: 'Mexican',
    comments:
      'The meat was a little dry and service was slow, but tasted good overall!',
    foodRating: 4,
    waitTime: 30,
    price: 6.4,
    photoOfOrder:
      'https://www.eatingonadime.com/wp-content/uploads/2018/05/easy-street-tacos.jpg',
    dateOfVisit: '2019-05-06',
    restaurantName: 'Escorpion'
  });
  return authHelper.generateToken(userData.username);
}
