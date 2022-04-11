const { Op } = require('sequelize');
const { Device, WorkStatus } = require('../models');
const { WorkHistory } = require('../models/workMangement');

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

    // workStatusesId 검색
    const setWorkStatusQuery = {};
    if (params.workStatusId) {
      setWorkStatusQuery.where = {
        ...setWorkStatusQuery.where,
        id: params.workStatusId,
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      WorkHistory.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: Device,
            as: 'Devices',
            ...setDeviceQuery,

          },
          {
            model: WorkStatus,
            as: 'WorkStatuses',
            ...setWorkStatusQuery,
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
