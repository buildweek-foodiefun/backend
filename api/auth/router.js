const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
  res.json('Register');
});

router.post('/login', (req, res) => {
  res.json('Login');
});

module.exports = router;
