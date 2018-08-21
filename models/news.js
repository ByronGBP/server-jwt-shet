const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const newsSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  avatar: {
    type: String,
    default: 'https://htmlcolors.com/img/change-user.png'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
