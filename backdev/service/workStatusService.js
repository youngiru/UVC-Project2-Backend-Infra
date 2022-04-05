const logger = require('../lib/logger');
const workStatusDao = require('../dao/workStatusDao');

const service = {
  // 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await workStatusDao.insert(params);
    } catch (err) {
      logger.error(`(workStatus.reg) ${err.toString()}`);
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
      result = await workStatusDao.selectList(params);
      logger.debug('(workS)');
    } catch (err) {
      logger.error(`(workStatus.list) ${err.toString()}`);
      return new Promise((reject) => {
        reject(err``);
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
      result = await workStatusDao.update(params);
      logger.debug(`(workStatuService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workStatuService.edit) ${err.toString()}`);
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
      result = await workStatusDao.delete(params);
      logger.debug(`(workStatuService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workStatuService.delete) ${err.toString()}`);
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
