const Influx = require('influx');

const logger = require('./logger');

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
  create() {
    return new Promise((resolve, reject) => {
      influx.query(
        'CREATE RETENTION POLICY "one_day_onl" ON "boyeo" DURATION 1d REPLICATION 1',
      ).then((results) => {
        resolve(results);
      }).catch((err) => {
        logger.error(err);
        reject(err);
      });
    });
  },

  select() {
    return new Promise((resolve, reject) => {
      influx.query(
        'SELECT * FROM mqtt_edukit ORDER BY time DESC',
      ).then((results) => {
        resolve(results);
      }).catch((err) => {
        logger.error(err);
        reject(err);
      });
    });
  },

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
