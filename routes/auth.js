const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const tokenUtil = require('../lib/tokenUtil');

const router = express.Router();

router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      // 실패했을 때
      console.error(`authError: ${authError}`);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ msg: 'login failed' });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(`loginError: ${loginError}`);
        return next(loginError);
      }
      // return res.send("post login page");
      // const token = tokenUtil.makeToken(user);
      const token = jwt.sign({ userid: req.body.userid, password: req.body.password }, 'secret', { expiresIn: '1d' });
      res.setHeader('token', token);
      return res.status(201).json({
        data: {
          succes: true,
          token,
        },
      });
    });
  })(req, res, next);
  // res.send("post login page");
  // res.redirect("/profile");
});

router.get('/logout', isLoggedIn, async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
