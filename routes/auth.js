const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const verifyMiddleware = require('../middlewares/verifyToken');

router.get('/me', authController.me);
router.post('/user', verifyMiddleware, authController.user);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
