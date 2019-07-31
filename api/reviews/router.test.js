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

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe('Reviews router', () => {
  it('should return the created reviews by a logged in user', async () => {
    await addReview();
    const response = await request(server)
      .get('/')
      .set('Authorization', await getToken());
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it('should create a new review', async () => {
    const reviews = await Review.findByUserId(userData.id);
    const prevLength = reviews.length;
    const response = await request(server)
      .post('/')
      .set('Authorization', await getToken())
      .send({
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
    expect(response.status).toBe(201);
    const newReviews = await Review.findByUserId(userData.id);
    expect(newReviews.length).toBe(prevLength + 1);
  });
});

let userData = {
  username: 'test2',
  password: authHelper.generateHashedPassword('password')
};

async function addUser() {
  const userIdArray = await User.add(userData);
  // eslint-disable-next-line require-atomic-updates
  userData.id = userIdArray[0];
  return userData.id;
}

async function addReview() {
  await Review.add({
    userId: await addUser(),
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
}

async function getToken() {
  return authHelper.generateToken(userData.username);
}
