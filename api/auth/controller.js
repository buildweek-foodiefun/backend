const helper = require('./helper');
const Users = require('../users/model');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await Users.add({
      username,
      password: helper.generateHashedPassword(password)
    });
    if (response.length > 0) {
      const createdId = response[0];
      res
        .status(201)
        .json({ message: 'Created user', user: { id: createdId, username } });
    } else {
      throw new Error('There was a problem with the request');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const token = req.token;
  res.json({ message: 'You have been identified successfuly', token });
};
