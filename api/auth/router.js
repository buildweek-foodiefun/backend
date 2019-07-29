const express = require('express');
const controller = require('./controller');
const middleware = require('./middleware');

const router = express.Router();

router.post('/register', middleware.checkBodyForRegister, controller.register);

router.post('/login', (req, res) => {
  res.json('Login');
});

module.exports = router;
