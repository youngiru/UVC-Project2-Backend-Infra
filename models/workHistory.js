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
      uptime: {
        type: Sequelize.DATE,
      },
      downtime: {
        type: Sequelize.DATE,
      },
      emergency: {
        type: Sequelize.DATE,
      },
      leadtime: {
        type: Sequelize.DATE,
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
};
