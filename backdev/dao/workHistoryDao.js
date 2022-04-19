const { Op } = require('sequelize');
const logger = require('../lib/logger');
const { User, WorkHistory } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      WorkHistory.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 작업 현황 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};

    // // userId 검색
    // const setUserQuery = {};
    // if (params.userId) {
    //   setUserQuery.where = {
    //     ...setUserQuery.where,
    //     id: params.userId,
    //   };
    // }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    // 리스트 조회 결과
    return new Promise((resolve, reject) => {
      // operating 조건(null & true 인 것만 조회)
      WorkHistory.findAll({
        where: {
          [Op.or]: [
            { operating: true },
            { operating: null },
          ],
        },
      }).then((selectedList) => {
        logger.debug('DaoselectedList', selectedList);
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    logger.debug(`workHistoryDao.selectInfo ${params.id}`);
    return new Promise((resolve, reject) => {
      WorkHistory.findByPk(
        params.id,
        // {
        //   include:
        //     {
        //       model: User,
        //       as: 'Users',
        //       attributes: { exclude: ['password'] },
        //     },
        // },
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      WorkHistory.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
