const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret =
  process.env.JWT_SECRET ||
  'This is a development secret key that is going to be replaced in production';

exports.generateHashedPassword = password => {
  return bcrypt.hashSync(password, 12);
};

exports.generateToken = username => {
  const payload = {
    username
  };
  const token = jwt.sign(payload, secret, { expiresIn: '3d' });

  return token;
};

exports.validateToken = token => {
  return jwt.verify(token, secret);
}

exports.identifyUserPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
