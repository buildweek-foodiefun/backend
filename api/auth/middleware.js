const Users = require('../users/model');
const helper = require('./helper');

exports.checkBodyForRegister = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (username && password) {
      const user = await Users.findByUsername(username);
      if (user) {
        res.status(422).json({ message: 'Username already exists' });
      } else {
        next();
      }
    } else {
      res.status(400).json({ message: 'Required parameter missing' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error processing your request' });
  }
};

exports.checkBodyForLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await Users.findByUsername(username);
      if (user && helper.identifyUserPassword(password, user.password)) {
        // eslint-disable-next-line require-atomic-updates
        req.token = helper.generateToken(username);
        next();
      } else {
        res.status(401).json({ message: 'Wrong credentials' });
      }
    } else {
      res.status(400).json({ message: 'Missing required parameter' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error processing your request' });
  }
};

exports.restricted = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const payload = helper.validateToken(token);
    if (token && payload) {
      // eslint-disable-next-line require-atomic-updates
      req.user = await Users.findByUsername(payload.username);
      next();
    } else {
      res.status(401).json({
        message: 'You are not authorized to perform that operation '
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'There was an error in your request' });
  }
};
