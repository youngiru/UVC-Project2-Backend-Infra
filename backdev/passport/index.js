const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const local = require('./localStrategy');
const userDao = require('../dao/userDao');

const User = require('../models/user');
const logger = require('../lib/logger');

require('dotenv').config();

const passportConfig = {
  usernameField: 'userid', passwordField: 'password',
};
const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'jwt-secret-key',
};

const passportVerify = async (userid, password, done) => {
  try {
    const user = await userDao.selectUser(userid);

    if (!user) {
      done(null, false, { message: '존재하지 않는 사용자 입니다.' });
      return;
    }

    const compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      done(null, user);
    }

    done(null, false, { reason: '올바르지 않은 비밀번호 입니다.' });
  } catch (err) {
    logger.error(`(passport.passportVerify), ${err.toString()}`);
    done(err);
  }
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    // payload의 id값으로 유저의 데이터 조회
    const user = await User.findOne({ where: { id: jwtPayload.id } });
    // 유저 데이터가 있다면 유저 데이터 객체 전송
    if (user) {
      done(null, user);
      return;
    }
    // 유저 데이터가 없을 경우 에러 표시
    done(null, false, { reason: '올바르지 않은 인증정보 입니다.' });
  } catch (error) {
    logger.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userid);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { userid: id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  passport.use('Local', new LocalStrategy(passportConfig, passportVerify));
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
  local();
};
