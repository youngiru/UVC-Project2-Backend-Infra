const { sequelize } = require('./connection');
const User = require('./user');
const Device = require('./device');
const Sensor = require('./sensor');
const WorkHistory = require('./workHistory');
const Emergency = require('./emergency');
const WorkManagement = require('./workManagement');

const db = {};

db.sequelize = sequelize;

// model 생성
db.User = User;
db.Device = Device;
db.Sensor = Sensor;
db.WorkHistory = WorkHistory;
db.Emergency = Emergency;
db.WorkManagement = WorkManagement;

// model init
User.init(sequelize);
Device.init(sequelize);
Sensor.init(sequelize);
WorkHistory.init(sequelize);
Emergency.init(sequelize);
WorkManagement.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
