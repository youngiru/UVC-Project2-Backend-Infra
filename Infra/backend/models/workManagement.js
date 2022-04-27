const Sequelize = require('sequelize');

module.exports = class WorkManagement extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
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
    db.WorkManagement.belongsTo(db.Device, { foreignKey: { name: 'deviceId', onDelete: 'CASCADE', as: 'Device' }, targetKey: 'id' });
    db.WorkManagement.belongsTo(db.Sensor, { foreignKey: { name: 'sensorId', onDelete: 'CASCADE', as: 'Sensor' }, targetKey: 'id' });
    db.WorkManagement.belongsToMany(db.WorkHistory, { through: 'work' }, { onDelete: 'CASCADE' });
  }
};
