const { Op } = require('sequelize');
const { Emergency } = require('../models/emergency');

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
    // where 검색 조건
    const setQuery = {};
    if (params.deviceId) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.deviceId}%` }, // like검색
      };
    }
    if (params.emergencyid) {
      setQuery.where = {
        ...setQuery.where,
        emergencyid: params.emergencyid, // '='검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Emergency.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // password 필드 제외
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
