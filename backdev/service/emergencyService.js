const logger = require('../lib/logger');
const emergencyDao = require('../dao/emergencyDao');

const service = {
  // 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await emergencyDao.insert(params);
      logger.debug(`(emergencyService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(emergencyService.reg) ${err.toString()}`);
      return new Promise((reject) => {
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
      result = await emergencyDao.selectList(params);
      logger.debug(`(emergencyService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(emergencyService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await emergencyDao.selectInfo(params);
      logger.debug(`(emergencyService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(emergencyService.info) ${err.toString()}`);
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
