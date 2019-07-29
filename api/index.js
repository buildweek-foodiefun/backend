const express = require('express');
const authRouter = require('./auth/router');

const router = express.Router();


router.get('/', (req, res) => res.json({ message: 'Welcome to FoodieFun API' }));

router.use('/auth', authRouter);

module.exports = router;
