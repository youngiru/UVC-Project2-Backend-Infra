const express = require('express');

const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const userService = require('../service/userService');

const logger = require('../lib/logger');

// postman으로 등록
// router.post('/register', async (req, res) => {
//   try {
//     const params = {
//       userid: req.body.userid,
//       password: req.body.password,
//       name: req.body.name,
//       rank: req.body.rank,
//       email: req.body.email,
//       phone: req.body.phone,
//       role: req.body.role,
//     };
//     logger.info(`(auth.login.params) ${JSON.stringify(params)}`);
//     // const exUser = await User.findOne({ where: { email } });
//     // if (exUser) {
//     //   return res.redirect('/join?error=exist'); // 주소 뒤에 에러를 쿼리스트링으로 표시함
//     // }
//     const hash = await bcrypt.hashSync(params.password, 12);
//     const newUser = {
//       userid: params.userid,
//       password: hash,
//       name: params.name,
//       rank: params.rank,
//       email: params.email,
//       phone: params.phone,
//       role: params.role,
//     };
//     try {
//       await User.create(newUser).then((data) => {
//         res.json({ data });
//       });
//       logger.info(`(auth.login.result) ${JSON.stringify(newUser)}`);
//       res.status(200).json({ newUser });
//     } catch (err) {
//       logger.error(err);
//     }
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(auth.login.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.userid || !params.password) {
      const err = new Error('Not allowed null (userid, password)');
      logger.error(`(auth.login,login) ${err.toString()}`);

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.signin(params);
    logger.info(`(auth.login.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
