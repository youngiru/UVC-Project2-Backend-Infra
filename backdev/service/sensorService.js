const logger = require('../lib/logger');
const sensorDao = require('../dao/sensorDao');

const service = {
  // 센서 유무 확인 & 가동상태 확인
  async check(params) {
    let sensor = null;
    let operating = null;

    try {
      sensor = await sensorDao.selectInfo(params);
      logger.debug(`(sensorService.check) ${JSON.stringify(sensor)}`);
      if (sensor) {
        operating = sensor.operating;
        logger.debug(`(sensorService.check.operating) ${JSON.stringify(operating)}`);
      } else {
        return '센서가 존재하지 않습니다';
      }
    } catch (err) {
      logger.error(`(sensorService.check) ${err.toString()}`);
      return new Promise((reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(operating);
    });
  },

  // 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await sensorDao.insert(params);
      logger.debug(`(sensorService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(sensorService.reg) ${err.toString()}`);
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
      result = await sensorDao.selectList(params);
      logger.debug(`(sensorService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(sensorService.list) ${err.toString()}`);
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
      result = await sensorDao.selectInfo(params);
      logger.debug(`(sensorService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(sensorService.info) ${err.toString()}`);
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
    logger.info(`info, ${params}`);
    try {
      result = await sensorDao.update(params);
      logger.debug(`(sensorService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(sensorService.edit) ${err.toString()}`);
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
      result = await sensorDao.delete(params);
      logger.debug(`(sensorService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(sensorService.delete) ${err.toString()}`);
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
