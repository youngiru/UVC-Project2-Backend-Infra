const express = require('express');
const usersRouter = require('./user');
const authRouter = require('./auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/auths', authRouter);

module.exports = router;
