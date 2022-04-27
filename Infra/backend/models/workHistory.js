const Sequelize = require('sequelize');

module.exports = class WorkHistory extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      inputQuantity: {
        type: Sequelize.INTEGER, // 투입량
      },
      targetQuantity: {
        type: Sequelize.INTEGER, // 목표수량
      },
      outputQuantity: {
        type: Sequelize.INTEGER, // 산출량(양품 + 불량품)
      },
      qualityQuantity: {
        type: Sequelize.INTEGER, // 양품
      },
      defectiveQuantity: {
        type: Sequelize.INTEGER, // 불량품
      },
      defectiveRate: {
        type: Sequelize.FLOAT, // 불량률
      },
      stock: {
        type: Sequelize.INTEGER, // 재고수량
      },
      uptime: {
        type: Sequelize.DATE, // 시작시각
      },
      downtime: {
        type: Sequelize.DATE, // 중지시각
      },
      leadtime: {
        type: Sequelize.STRING, // 공정작업시간
      },
      color: {
        type: Sequelize.STRING, // 색선별
      },
      ready: {
        type: Sequelize.BOOLEAN, // 준비상태
      },
      reset: {
        type: Sequelize.BOOLEAN, // 리셋
      },
      operating: {
        type: Sequelize.BOOLEAN, // true: 가동중, false: 미가동
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    // eslint-disable-next-line max-len
    // db.WorkHistory.belongsToMany(db.WorkManagement, { through: 'work' }, { onDelete: 'CASCADE' });
    db.WorkHistory.belongsToMany(db.User, { through: 'workingUser' }, { onDelete: 'CASCADE' });
  }
};
