const Sequelize = require('sequelize');

module.exports = class WorkHistory extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      sersorId: {
        type: Sequelize.INTEGER,
      },
      deviceId: {
        type: Sequelize.INTEGER,
      },
      emergencyId: {
        type: Sequelize.INTEGER,
      },
      workStatusId: {
        type: Sequelize.INTEGER,
      },
      uptime: {
        type: Sequelize.DATE,
      },
      downtime: {
        type: Sequelize.DATE,
      },
      leadtime: {
        type: Sequelize.STRING,
      },
      targetQuantity: {
        type: Sequelize.INTEGER,
      },
      achievementRate: {
        type: Sequelize.STRING,
      },
      inputItem: {
        type: Sequelize.INTEGER,
      },
      qualityItem: {
        type: Sequelize.INTEGER,
      },
      defectiveItem: {
        type: Sequelize.INTEGER,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.WorkHistory.belongsTo(db.Device, { foreignKey: { name: 'deviceId', onDelete: 'CASCADE', as: 'Device' }, targetKey: 'id' });
    db.WorkHistory.belongsTo(db.Sensor, { foreignKey: { name: 'sensorId', onDelete: 'CASCADE', as: 'Sensor' }, targetKey: 'id' });
    db.WorkHistory.hasMany(db.Emergency, { foreignKey: { name: 'emergencyId', sourceKey: 'id' } });
    db.WorkHistory.hasOne(db.WorkStatus, { foreignKey: { name: 'workStatusId', sourceKey: 'id' } });
  }
};
