const Sequelize = require('sequelize');

module.exports = class WorkHistory extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      inputQuantity: {
        type: Sequelize.INTEGER,
      },
      targetQuantity: {
        type: Sequelize.INTEGER,
      },
      outputQuantity: {
        type: Sequelize.INTEGER,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      leadtime: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      ready: {
        type: Sequelize.BOOLEAN,
      },
      reset: {
        type: Sequelize.BOOLEAN,
      },
      operating: {
        type: Sequelize.BOOLEAN, // true: 시작, false: 정지
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.WorkHistory.belongsToMany(db.WorkManagement, { through: 'work' }, { onDelete: 'CASCADE' });
    db.WorkHistory.belongsToMany(db.User, { through: 'workingUser' }, { onDelete: 'CASCADE' });
  }
};
