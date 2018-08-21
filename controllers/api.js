const News = require('../models/news');

const allNews = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  News.find({})
    .then(news => {
      return res.json({ news });
    })
    .catch(next);
};

const oneNews = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const idNews = req.params.id;
  News.findById(idNews)
    .then((news) => {
      if (!news) {
        return res.status(404).json({ error: 'not-found' });
      }
      return res.json({ news });
    })
    .catch(next);
};

const createNews = (req, res, next) => {
  // NOTE:- needs verify token before post a news

  const userId = req.user.user._id;
  const title = req.body.title;
  const content = req.body.content;

  if (!title || !content) {
    return res.status(422).json({ error: 'missing-title-content' });
  }

  const newNews = new News({
    owner: userId,
    title,
    content
  });

  newNews.save()
    .then(() => {
      return res.status(204).json();
    })
    .catch(next);
};

module.exports = {
  allNews,
  oneNews,
  createNews
};
