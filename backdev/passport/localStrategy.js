const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const userDao = require('../dao/userDao');
const logger = require('../lib/logger');

module.exports = () => {
  logger.info('exUser');
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userid',
        passwordField: 'password',
      },
      async (userid, password, done) => {
        try {
          const exUser = await User.findOne({ where: { userid } });
          console.log(exUser);
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            console.log(result);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          }
        } catch (err) {
          logger.error(`(localStrategy) ${err.toString()}`);
          done(err);
        }
      },
    ),
  );
};
