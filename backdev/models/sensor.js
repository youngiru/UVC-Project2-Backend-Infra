const { text } = require('body-parser');
const Sequelize = require('sequelize');

module.exports = class Sensor extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(100),
      },
      location: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.TEXT,
      },
      operating: {
        type: Sequelize.BOOLEAN,
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(db) {
    db.Sensor.hasMany(db.WorkHistory);
  }
};
