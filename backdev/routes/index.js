const express = require('express');
const usersRouter = require('./user');
const deviceRouter = require('./device');
const sensorRouter = require('./sensor');
const workMangementRouter = require('./workManagement');
const authRouter = require('./auth');
const workHistoryRouter = require('./workHistory');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/devices', deviceRouter);
router.use('/sensors', sensorRouter);
router.use('/workManagements', workMangementRouter);
router.use('/workHistory', workHistoryRouter);
router.use('/auths', authRouter);

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보' });
});
// 로그인이 안 되면 로그인 페이지로 다시 보내기.
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login', { title: 'login' });
});

module.exports = router;
