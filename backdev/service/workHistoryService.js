const logger = require('../lib/logger');
const workHistoryDao = require('../dao/workHistoryDao');

const service = {
  async reg(params) {
    let inserted = null;

    try {
      inserted = await workHistoryDao.insert(params);
      logger.debug(`(workHistoryService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(workHistoryService.reg) ${err.toString()}`);
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
      result = await workHistoryDao.selectList(params);
      logger.debug(`(workHistoryService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workHistoryService.list) ${err.toString()}`);
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
      result = await workHistoryDao.selectInfo(params);
      logger.debug(`(workHistoryService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workHistoryService.info) ${err.toString()}`);
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
      result = await workHistoryDao.update(params);
      logger.debug(`(workHistoryService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workHistoryService.edit) ${err.toString()}`);
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
      result = await workHistoryDao.delete(params);
      logger.debug(`(workHistoryService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workHistoryService.delete) ${err.toString()}`);
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
