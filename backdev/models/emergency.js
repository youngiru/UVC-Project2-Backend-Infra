const Sequelize = require('sequelize');

module.exports = class Emergency extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
      },
      workHistoryId: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.DATE,
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.Emergency.belongsTo(db.User, { foreignKey: { name: 'userId', onDelete: 'CASCADE', as: 'User' }, targetKey: 'id' });
    db.Emergency.belongsTo(db.WorkHistory, { foreignKey: { name: 'workHistoryId', onDelete: 'CASCADE', as: 'WorkHistory' }, targetKey: 'id' });
  }
};
