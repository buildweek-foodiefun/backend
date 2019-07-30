const express = require('express');
const authMiddleware = require('../auth/middleware');
const controller = require('./controller');

const router = express.Router();

router.get('/', authMiddleware.restricted, controller.find);

module.exports = router;
