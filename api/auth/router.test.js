const express = require('express');
const router = require('./router');
const request = require('supertest');
const db = require('../../data/dbconf');
const User = require('../users/model');

const server = express();
server.use(express.json());
server.use(router);

beforeEach(async () => {
  await db('users').truncate();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe('Register endpoint', () => {
  it('should register a user', async () => {
    let user = await User.findByUsername('test');
    expect(user).toBe(undefined);
    const response = await request(server)
      .post('/register')
      .send({ username: 'test', password: 'password' });
    user = await User.findByUsername('test');
    expect(user.username).toBeDefined();
    expect(response.status).toBe(201);
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
    expect(response.body.token.length).toBeGreaterThan(0);
  });
});
