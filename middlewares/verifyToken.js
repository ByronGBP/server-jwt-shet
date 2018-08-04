const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(422).json({ error: 'no-token' });
  }

  if (req.session.currentUser !== token) {
    return res.status(422).json({ error: 'different-token' });
  }

  jwt.verify(token, process.env.SECRET_JWT_KEY, (err, decoded) => {
    if (err) {
      return next(err);
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
