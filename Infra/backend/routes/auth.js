const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const tokenUtil = require('../lib/tokenUtil');
const logger = require('../lib/logger');

const router = express.Router();

router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (authError, user) => {
    if (authError) {
      // 실패했을 때
      logger.error(`authError: ${authError}`);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ msg: 'login failed' });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        logger.error(`loginError: ${loginError}`);
        return next(loginError);
      }

      // 토큰 생성
      const token = tokenUtil.makeToken(user);
      logger.info('token', token);
      res.setHeader('token', token);
      return res.status(201).json({
        data: {
          succes: true,
          token,
        },
      });
    });
  })(req, res, next);
  // res.send('post login page');
  // res.redirect("/profile");
});

router.delete('/logout', isLoggedIn, async (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
