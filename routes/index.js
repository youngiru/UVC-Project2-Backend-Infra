const express = require('express');
const usersRouter = require('./user');
const deviceRouter = require('./device');
const sensorRouter = require('./sensor');
const workHistoryRouter = require('./workHistory');
const authRouter = require('./auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/devices', deviceRouter);
router.use('/sensors', sensorRouter);
router.use('/workHistories', workHistoryRouter);
router.use('/auths', authRouter);

module.exports = router;
