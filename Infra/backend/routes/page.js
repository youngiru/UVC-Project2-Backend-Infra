const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보' });
});

module.exports = router;
