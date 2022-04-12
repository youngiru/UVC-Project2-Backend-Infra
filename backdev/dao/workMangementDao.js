const { Op } = require('sequelize');
const { Device, WorkHistory } = require('../models');
const WorkManagement = require('../models/workManagement');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      WorkManagement.create(params).then((inserted) => {
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
    if (params.workHistoryid) {
      setQuery.where = {
        ...setQuery.where,
        workHistoryid: params.workHistoryid, // '='검색
      };
    }

    // deviceId 검색
    const setDeviceQuery = {};
    if (params.deviceId) {
      setDeviceQuery.where = {
        ...setDeviceQuery.where,
        id: params.deviceId,
      };
    }

    // workHistoryId 검색
    const setWorkHistoryQuery = {};
    if (params.workHistoryId) {
      setWorkHistoryQuery.where = {
        ...setWorkHistoryQuery.where,
        id: params.workHistoryId,
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      WorkManagement.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: Device,
            as: 'Devices',
            ...setDeviceQuery,

          },
          {
            model: WorkHistory,
            as: 'WorkHistory',
            ...setWorkHistoryQuery,
          },
        ],
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
