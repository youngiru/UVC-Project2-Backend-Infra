const { Op } = require('sequelize');
const { Device } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Device.create(params).then((inserted) => {
        // password는 제외하고 리턴함
        const insertedResult = { ...inserted };
        delete insertedResult.dataValues.password;
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
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }
    if (params.deviceid) {
      setQuery.where = {
        ...setQuery.where,
        deviceid: params.deviceid, // '='검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Device.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] }, // password 필드 제외
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;