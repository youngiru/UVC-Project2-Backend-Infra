const workHistoryDao = require('../dao/workHistoryDao');
const logger = require('../lib/logger');

const service = {
  // 불량품 계산
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
};

module.exports = service;
