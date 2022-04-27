const Sequelize = require('sequelize');

module.exports = class Device extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(50),
      },
      location: {
        type: Sequelize.STRING(255),
      },
      edge_serial_number: {
        type: Sequelize.STRING(20),
      },
      network_interface: {
        type: Sequelize.STRING(20),
      },
      network_config: {
        type: Sequelize.TEXT,
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
    db.Device.hasMany(db.WorkHistory, { foreignKey: 'deviceId', sourceKey: 'id' });
  }
};
