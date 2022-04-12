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
      leadtime: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      start: {
        type: Sequelize.BOOLEAN,
      },
      ready: {
        type: Sequelize.BOOLEAN,
      },
      reset: {
        type: Sequelize.BOOLEAN,
      },
      operating: {
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
    db.WorkHistory.belongsToMany(db.WorkManagement, { through: 'work' }, { onDelete: 'CASCADE' });
    db.WorkHistory.belongsToMany(db.User, { through: 'workingUser' }, { onDelete: 'CASCADE' });
  }
};
