const Influx = require('influx');

const logger = require('../lib/logger');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'boyeo',
  port: 8086,
});

// DB 없으면 만들기
// Influx.getDatabaseNames()
//   // eslint-disable-next-line consistent-return
//   .then((names) => {
//     if (!names.include('boyeo')) {
//       return Influx.createDatabase('boyeo');
//     }
//   });
const dao = {
  // 2일 지난 데이터 삭제
  delete() {
    return new Promise((resolve, reject) => {
      influx.query(
        'CREATE RETENTION POLICY "two_hours" ON "mqtt_edukit" DURATION 2h REPLICATION 1 DEFAULT',
      ).then((results) => {
        resolve(results);
      }).catch((err) => {
        logger.error(err);
        reject(err);
      });
    });
  },
  // 데이터 조회
  // select() {
  //   return new Promise((resolve, reject) => {
  //     influx.query(
  //       'SELECT * FROM mqtt_edukit ORDER BY time DESC',
  //     ).then((results) => {
  //       resolve(results);
  //     }).catch((err) => {
  //       logger.error(err);
  //       reject(err);
  //     });
  //   });
  // },

  // 시작 버튼
  // start() {
  //   return new Promise((resolve, reject) => {
  //     influx.query(
  // eslint-disable-next-line max-len
  //       'SELECT mean("value") FROM "mqtt_edukit" WHERE ("tagId" = '1') AND $timeFilter GROUP BY time($__interval) fill(null)',
  //     ).then((results) => {
  //       resolve(results);
  //     }).catch((err) => {
  //       logger.error(err);
  //       reject(err);
  //     });
  //   });
  // },
  // 공정 반복 시간
  // leadTime() {
  //   return new Promise((resolve, reject) => {
  //     influx.query(
  // eslint-disable-next-line max-len
  //       'SELECT mean("value") FROM "mqtt_edukit" WHERE ("tagId" = '14') AND $timeFilter GROUP BY time($__interval) fill(null)',
  //     ).then((results) => {
  //       resolve(results);
  //     }).catch((err) => {
  //       logger.error(err);
  //       reject(err);
  //     });
  //   });
  // },
  // 양품총수량카운트
  // item() {
  //   return new Promise((resolve, reject) => {
  //     influx.query(
  // eslint-disable-next-line max-len
  //       'SELECT mean("value") FROM "mqtt_edukit" WHERE ("tagId" = '17') AND $timeFilter GROUP BY time($__interval) fill(null)',
  //     ).then((results) => {
  //       resolve(results);
  //     }).catch((err) => {
  //       logger.error(err);
  //       reject(err);
  //     });
  //   });
  // },
  // 불량품, 불량률 조회
  defect() {
    return new Promise((resolve, reject) => {
      influx.query(
        'SELECT (No1Count - No3Count) FROM "boyeo"',
        'SELECT (No1Count - No3Count)/No1Count FROM "boyeo"',
      ).then((results) => {
        resolve(results);
      }).catch((err) => {
        logger.error(err);
        reject(err);
      });
    });
  },

};

module.exports = dao;
