require('dotenv').config();
const mongoose = require('mongoose');
const user = require('./user');

const main = () => {
  mongoose.Promise = Promise;
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });

  user.remove()
    .then(() => {
      return user.create();
    })
    .then(() => {
      mongoose.disconnect();
    })
    .catch(err => {
      throw new Error(err);
    });
};

main();
