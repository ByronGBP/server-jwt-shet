const User = require('../models/user');
const utils = require('../helpers/utils');

const create = (name) => {
  const username = name || 'Default';
  const hashPassword = utils.getHashPassword(process.env.SECRET_PASSWORD);
  const newUser = new User({
    username,
    password: hashPassword
  });

  return newUser.save()
    .then(() => {
      console.log('User created');
      return newUser;
    })
    .catch(err => {
      throw new Error(err);
    });
};

const remove = () => {
  return User.remove()
    .then(() => {
      console.log('Users removed');
    })
    .catch(err => {
      throw new Error(err);
    });
};

module.exports = {
  create,
  remove
};
