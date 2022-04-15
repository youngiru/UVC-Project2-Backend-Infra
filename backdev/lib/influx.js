const Influx = require('influx');
const logger = require('./logger');

const client = new Influx.InfluxDB({
  host: 'localhost',
  database: 'boyeo',
  port: 8086,
});

// DB 없으면 만들기
Influx.getDatabaseNames()
  // eslint-disable-next-line consistent-return
  .then((names) => {
    if (!names.include('boyeo')) {
      return Influx.createDatabase('boyeo');
    }
  });

Influx.query(
  'select * from mqtt_edukit',
).catch((err) => {
  logger.error(err);
}).then((results) => {
  results.json(results);
});

module.exports = Influx;
