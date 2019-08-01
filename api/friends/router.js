const express = require('express');
const authMiddleware = require('../auth/middleware');
const controller = require('./controller');

const router = express.Router();

router.get('/', authMiddleware.restricted, controller.getFriends);

router.post(
  '/add/:username',
  authMiddleware.restricted,
  controller.addFriend
);

module.exports = router;
