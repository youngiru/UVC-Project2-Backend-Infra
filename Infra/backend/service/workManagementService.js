const logger = require('../lib/logger');
const workManagementDao = require('../dao/workMangementDao');

const service = {
  async reg(params) {
    let inserted = null;

    try {
      inserted = await workManagementDao.insert(params);
      logger.debug(`(workManagementService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(workManagementService.reg) ${err.toString()}`);
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
      result = await workManagementDao.selectList(params);
      logger.debug(`(workManagementService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workManagementService.list) ${err.toString()}`);
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
      result = await workManagementDao.selectInfo(params);
      logger.debug(`(workManagementService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workManagementService.info) ${err.toString()}`);
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
      result = await workManagementDao.update(params);
      logger.debug(`(workManagementService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workManagementService.edit) ${err.toString()}`);
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
      result = await workManagementDao.delete(params);
      logger.debug(`(workManagementService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workManagementService.delete) ${err.toString()}`);
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
