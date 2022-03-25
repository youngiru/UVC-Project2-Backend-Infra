const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const userDao = require('../dao/userDao');
const logger = require('../lib/logger');
const tokenUtil = require('../lib/tokenUtil');

const service = {
  // user 입력
  async register(params) {
    let inserted = null;
    logger.info('makePassword.params', params);
    // 1. 비밀번호 암호화
    let hashPassword = null;
    try {
      hashPassword = await bcrypt.hash(params.password, 10, () => {
        logger.debug(`(userService.makePassword) ${JSON.stringify(params.password)}`);
      });
    } catch (err) {
      return new Promise((resolve, reject) => {
        logger.error(`(userService.makePassword) ${err.toString()}`);
        reject(err);
      });
    }

    // 2. 사용자 등록 처리
    const newParams = {
      ...params,
      password: hashPassword,
    };

    try {
      inserted = await userDao.insert(params);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

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
  async signin(req, res) {
    try {
      passport.authenticate('Local', { session: false }, (err, user, info) => {
        logger.debug('(userService.signin)');
        if (err || !user) {
          res.status(400).json({ message: info });
        }

        // 토큰 생성
        const token = tokenUtil.makeToken(user);
        res.set('token', token); // header 세팅

        return req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            logger.error(loginError);
            res.send(err);
          }
        });
      });
    } catch (err) {
      return new Promise((resolve, reject) => {
        logger.error(`(userService.signin) ${err.toString()}`);
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(res);
    });
  },
};

module.exports = service;
