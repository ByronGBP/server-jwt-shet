require('dotenv').config();
const mongoose = require('mongoose');
const user = require('./user');
const news = require('./news');

const usersSeed = require('./seeds').users;
const newsSeed = require('./seeds').news;

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
      const promises = usersSeed.map((elem) => {
        return user.create(elem.username, elem.password);
      });
      return Promise.all(promises);
    })
    .then((users) => {
      const promises = newsSeed.map((elem, idx) => {
        return news.create(users[idx]._id, elem.title, elem.content);
      });
      return Promise.all(promises);
    })
    .then(() => {
      mongoose.disconnect();
    })
    .catch(err => {
      throw new Error(err);
    });
};

main();
