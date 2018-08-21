const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api');
const verifyMiddleware = require('../middlewares/verifyToken');

router.get('/news', apiController.allNews);
router.get('/news/:id', apiController.oneNews);
router.post('/news', verifyMiddleware, apiController.createNews);

module.exports = router;
