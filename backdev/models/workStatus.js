const Sequelize = require('sequelize');

module.exports = class WorkStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
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
    db.WorkStatus.belongsToMany(db.WorkHistory, { through: 'work' }, { onDelete: 'CASCADE' });
    db.WorkStatus.belongsToMany(db.User, { through: 'workingUser' }, { onDelete: 'CASCADE' });
  }
};
