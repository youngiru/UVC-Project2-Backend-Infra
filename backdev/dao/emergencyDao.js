const { Op } = require('sequelize');
const User = require('../models/user');
const WorkHistory = require('../models/workHistory');
const Emergency = require('../models/emergency');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Emergency.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 리스트 조회
  selectList(params) {
    const setQuery = {};
    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Emergency.findAll({
        ...setQuery,
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] },
            where: { id: params.userId },
          },
          {
            model: WorkHistory,
            attributes: [],
            where: { id: params.workHistoryId },
          }],
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Emergency.findByPk(
        params.id,
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
