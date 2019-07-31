const express = require('express');
const authRouter = require('./auth/router');
const reviewsRouter = require('./reviews/router');
const friendsRouter = require('./friends/router');

const router = express.Router();


router.get('/', (req, res) => res.json({ message: 'Welcome to FoodieFun API' }));

router.use('/auth', authRouter);
router.use('/reviews', reviewsRouter);
router.use('/friends', friendsRouter);

module.exports = router;
