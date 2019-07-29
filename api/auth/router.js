const express = require('express');
const controller = require('./controller');
const middleware = require('./middleware');

const router = express.Router();

router.post('/register', middleware.checkBodyForRegister, controller.register);

router.post('/login', middleware.checkBodyForLogin, controller.login);

module.exports = router;
