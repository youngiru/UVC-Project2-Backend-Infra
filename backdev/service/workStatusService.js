const logger = require('../lib/logger');
const workStatusDao = require('../dao/workStatusDao');

const service = {
  // 장비 유무 확인 & 가동상태 확인
  async check(params) {
    let operating = null;
    let ready = null;

    try {
      // 이전 상태 불러오기(없으면 새롭게 만듦)
      const workStatus = await workStatusDao.selectInfo(params);
      logger.debug(`(workStatusService.check.device) ${JSON.stringify(workStatus)}`);
      if (!workStatus) {
        const newWorkStatus = await workStatusDao.insert(params);
        logger.debug(`(workStatusService.check.newWorkStatus) ${JSON.stringify(newWorkStatus)}`);
      }
      ready = workStatus.ready;
      logger.debug(`(workStatusService.check.ready) ${JSON.stringify(ready)}`);

      // 준비상태 확인
      if (ready) {
        operating = workStatus.operating;
        logger.debug(`(workStatusService.check.operating) ${JSON.stringify(operating)}`);
      } else {
        return '준비 상태를 확인해주세요';
      }
    } catch (err) {
      logger.error(`(workStatusService.check) ${err.toString()}`);
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
      logger.debug(`(workStatusService.list) ${JSON.stringify(result)}`);
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
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await workStatusDao.selectInfo(params);
      logger.debug(`(workStatusService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workStatusService.info) ${err.toString()}`);
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
};

module.exports = service;
