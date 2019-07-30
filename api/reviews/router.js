const express = require('express');
const authMiddleware = require('../auth/middleware');
const reviewMiddleware = require('./middleware');
const controller = require('./controller');

const router = express.Router();

router.get('/', authMiddleware.restricted, controller.find);
router.post(
  '/',
  [authMiddleware.restricted, reviewMiddleware.validateBodyReview],
  controller.post
);

module.exports = router;
