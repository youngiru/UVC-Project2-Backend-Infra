const express = require('express');
const bcrypt = require('bcrypt');
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
      hashPassword = await bcrypt.hash(params.password, 12);
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
      inserted = await userDao.insert(newParams);
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
  // selectUser
  async info(params) {
    let result = null;

    try {
      result = await userDao.selectUser(params);
      logger.debug(`(userService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await userDao.update(params);
      logger.debug(`(userService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await userDao.delete(params);
      logger.debug(`(userService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
