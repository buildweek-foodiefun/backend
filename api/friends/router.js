const express = require('express');
const authMiddleware = require('../auth/middleware');
const controller = require('./controller');

const router = express.Router();

router.post('/add/:username', [authMiddleware.restricted], controller.addFriend);

module.exports = router;
