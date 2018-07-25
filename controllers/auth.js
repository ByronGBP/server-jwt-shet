const User = require('../models/user');
const bcrypt = require('bcrypt');

const me = (req, res, next) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({ error: 'not-found' });
  }
};

const signup = (req, res, next) => {
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

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });

      newUser.save()
        .then(() => {
          res.json({ token: tokenForUser(user) });
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
    return res.status(422).json({ error: 'validation' });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'not-found' });
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.json(user);
      } else {
        return res.status(404).json({ error: 'not-found' });
      }
    })
    .catch(next);
};

const logout = (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
};

module.exports = {
  me,
  signup,
  login,
  logout
};
