const express = require('express');
const userDao = require('../dao/userDao');
const logger = require('../lib/logger');
const passport = require('../passport');

const service = {

  // selectList
  async list(params) {
    let result = null;

    try {
      result = await userDao.selectList(params);
      logger.debug(`(userService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // signin
  // signin: async (req, res, next) => {
  //   try {
  //     const result = await userDao.selectUser(req);
  //     passport.authenticate('signin', (err, user, info) => {
  //       if (err || !user) {
  //         res.status(400).json({ message: info });
  //       }

  //       req.login(user, (err) => {
  //         logger.log(user);
  //       });
  //     });
  //   } catch (err) {
  //     res.json({
  //       message: err,
  //     });
  //   }
  // },
};

module.exports = service;
