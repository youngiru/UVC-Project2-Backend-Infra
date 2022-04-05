const Sequelize = require('sequelize');

module.exports = class WorkStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      deviceId: {
        type: Sequelize.INTEGER,
      },
      emergencyId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      workHistoryId: {
        type: Sequelize.INTEGER,
      },
      targetQuantity: {
        type: Sequelize.INTEGER,
      },
      leadtime: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      start: {
        type: Sequelize.BOOLEAN,
      },
      reset: {
        type: Sequelize.BOOLEAN,
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.WorkStatus.belongsTo(db.WorkHistory, { foreignKey: { name: 'workHistoryId', onDelete: 'CASCADE', as: 'WorkHistory' }, targetKey: 'id' });
  }
};
