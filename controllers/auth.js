const User = require('../models/user');
const utils = require('../helpers/utils');

const me = (req, res, next) => {
  if (req.session.currentUser) {
    res.json({token: req.session.currentUser});
  } else {
    res.status(404).json({ error: 'not-found' });
  }
};

const signup = (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({ error: 'missing-username-password' });
  }

  User.findOne({ username })
    .then(user => {
      if (user) {
        return res.status(422).send({ error: 'user-not-unique' });
      }

      const hashPass = utils.getHashPassword(password);
      const newUser = new User({
        username,
        password: hashPass
      });

      newUser.save()
        .then(() => {
          newUser.password = '';
          const token = utils.getTokenFromUser(newUser);
          req.session.currentUser = token;
          res.json({ token });
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({ error: 'missing-username-password' });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'not-found' });
      }

      if (utils.isSamePassword(password, user.password)) {
        user.password = '';
        const token = utils.getTokenFromUser(user);
        req.session.currentUser = token;
        return res.json({ token });
      } else {
        return res.status(404).json({ error: 'not-found' });
      }
    })
    .catch(next);
};

const logout = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  req.session.currentUser = null;
  return res.status(204).json();
};

module.exports = {
  me,
  signup,
  login,
  logout
};
