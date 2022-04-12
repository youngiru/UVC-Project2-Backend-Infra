const logger = require('../lib/logger');
const workHistoryDao = require('../dao/workHistoryDao');

const service = {
  // 준비 상태 변동
  async readyCheck(params) {
    let newReady = null;

    try {
      // 이전 준비상태 확인
      const workHistory = await workHistoryDao.selectInfo(params);
      if (workHistory.ready === true) {
        newReady = await workHistoryDao.update(params.ready);
        logger.debug(`(workHistoryService.readyCheck) ${JSON.stringify(newReady)}`);
      }
      if (workHistory.ready === false) {
        newReady = await workHistoryDao.update(params.ready);
        logger.debug(`(workHistoryService.readyCheck) ${JSON.stringify(newReady)}`);
      }
    } catch (err) {
      logger.error(`(workHistoryService.readyCheck) ${err.toString()}`);
      return new Promise((reject) => {
        reject(err);
      });
    }
    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(newReady);
    });
  },

  // 조건 확인 후 db에 insert
  // 장비 유무 확인 & 가동상태 확인
  async check(params) {
    let operating = null;
    let ready = null;

    try {
      // 이전 상태 불러오기(없으면 새롭게 만듦)
      const workHistory = await workHistoryDao.selectInfo(params);
      logger.debug(`(workHistoryService.check.device) ${JSON.stringify(workHistory)}`);
      if (!workHistory) {
        const newWorkHistory = await workHistoryDao.insert(params);
        logger.debug(`(workHistoryService.check.newWorkHistory) ${JSON.stringify(newWorkHistory)}`);
      }
      ready = workHistory.ready;
      logger.debug(`(workHistoryService.check.ready) ${JSON.stringify(ready)}`);

      // 준비상태 확인
      if (ready === true) {
        operating = workHistory.operating;
        logger.debug(`(workHistoryService.check.operating) ${JSON.stringify(operating)}`);
      } else {
        return '준비 상태를 확인해주세요';
      }
    } catch (err) {
      logger.error(`(workHistoryService.check) ${err.toString()}`);
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
      inserted = await workHistoryDao.insert(params);
    } catch (err) {
      logger.error(`(workHistory.reg) ${err.toString()}`);
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
      result = await workHistoryDao.selectList(params);
      logger.debug(`(workHistoryService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(workHistory.list) ${err.toString()}`);
      return new Promise((reject) => {
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
};

module.exports = service;
