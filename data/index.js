require('dotenv').config();
const mongoose = require('mongoose');
const user = require('./user');
const news = require('./news');

const main = () => {
  mongoose.Promise = Promise;
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });

  user.remove()
    .then(() => {
      return news.remove();
    })
    .then(() => {
      return user.create();
    })
    .then((user) => {
      return news.create(user._id);
    })
    .then(() => {
      mongoose.disconnect();
    })
    .catch(err => {
      throw new Error(err);
    });
};

main();
