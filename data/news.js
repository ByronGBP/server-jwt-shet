const News = require('../models/news');

const create = (id, t, c) => {
  const title = t || 'Default title';
  const content = c || 'Default content';

  if (!id) {
    throw new Error('No id provide it');
  }

  const newNews = new News({
    owner: id,
    title,
    content
  });

  return newNews.save()
    .then(() => {
      console.log('News created');
      return newNews;
    })
    .catch(err => {
      throw new Error(err);
    });
};

const remove = () => {
  return News.remove()
    .then(() => {
      console.log('News removed');
    })
    .catch(err => {
      throw new Error(err);
    });
};

module.exports = {
  create,
  remove
};
