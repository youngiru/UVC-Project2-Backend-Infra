const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const User = require('../models/user');
const userService = require('../service/userService');
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
      // return res.send("post login page");
      // const token = tokenUtil.makeToken(user);
      const token = jwt.sign({
        id: user.id,
        userid: user.userid,
        name: user.name,
        rank: user.rank,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }, 'secret', { expiresIn: '2d' });
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

// user 토큰 발행
// router.post('/login', async (req, res) => {
//   try {
//     const params = {
//       userid: req.body.userid,
//       password: req.body.password,
//     };
//     logger.info(`(auth.token.params) ${JSON.stringify(params)}`);

//     // 입력값 null 체크
//     if (!params.userid || !params.password) {
//       const err = new Error('Not allowed null (userid, password)');
//       logger.error(err.toString());

//       res.status(500).json({ err: err.toString() });
//     }

//     // 비즈니스 로직 호출
//     const result = await userService.info(params);
//     logger.info(`(auth.token.result) ${JSON.stringify(result)}`);

//     // 토큰 생성
//     const token = tokenUtil.makeToken(result);
//     logger.info('token', token);
//     res.set('token', token); // header 세팅

//     // 최종 응답
//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

router.delete('/logout', isLoggedIn, async (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
