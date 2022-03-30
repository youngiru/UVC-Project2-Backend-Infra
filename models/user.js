const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userid: {
        type: Sequelize.STRING(50),
      },
      password: {
        type: Sequelize.STRING(255),
      },
      name: {
        type: Sequelize.STRING(50),
      },
      rank: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      role: {
        type: Sequelize.STRING(20),
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
    });
  }
};
