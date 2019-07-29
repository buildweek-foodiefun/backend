const Users = require('../users/model');

exports.checkBodyForRegister = async (req, res, next) => {
  const { username, password } = req.body;
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
};
