const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  return hashPass;
};

const isSamePassword = (password, hashPassword) => {
  const isSame = bcrypt.compareSync(password, hashPassword);

  return isSame;
};

const getTokenFromUser = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_JWT_KEY);

  return token;
};

const getUserFromToken = (token) => {
  const user = jwt.verify(token, process.env.SECRET_JWT_KEY);

  return user;
};

module.exports = {
  getHashPassword,
  getTokenFromUser,
  getUserFromToken,
  isSamePassword
};
