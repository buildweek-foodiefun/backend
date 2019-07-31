const express = require('express');
const router = require('./router');
const request = require('supertest');
const db = require('../../data/dbconf');
const User = require('../users/model');

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

describe('Register endpoint', () => {
  it('should register a user', async () => {
    try {
      let user = await User.findByUsername('test');
      expect(user).toBe(undefined);
      const response = await request(server)
        .post('/register')
        .send({ username: 'test', password: 'password' });
      user = await User.findByUsername('test');
      expect(response.status).toBe(201);
      expect(user.username).toBeDefined();
    } catch (error) {
      console.log(error);
    }
  });

  it('should return a 400 status if no username or no password is sent', async () => {
    let response = await request(server)
      .post('/register')
      .send({ username: 'test' });
    expect(response.status).toBe(400);
    response = await request(server)
      .post('/register')
      .send({ password: 'password' });
    expect(response.status).toBe(400);
  });

  it('should return a 422 status if the username already exists', async () => {
    let response = await request(server)
      .post('/register')
      .send({ username: 'test', password: 'password' });
    expect(response.status).toBe(422);
  });
});

describe('Login endpoint', () => {
  it('should get a token when logged in', async () => {
    await request(server)
      .post('/register')
      .send({ username: 'test', password: 'password' });
    const response = await request(server)
      .post('/login')
      .send({ username: 'test', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  it('should return a 400 status code if there is a missing required field', async () => {
    let response = await request(server)
      .post('/login')
      .send({ username: 'test' });
    expect(response.status).toBe(400);
    response = await request(server)
      .post('/login')
      .send({ password: 'password' });
    expect(response.status).toBe(400);
  });

  it('should return a 401 status code if there is no a matching combination of username and password in the database', async () => {
    const response = await request(server)
      .post('/login')
      .send({ username: 'whatever_account', password: 'password' });
    expect(response.status).toBe(401);
  });
});
