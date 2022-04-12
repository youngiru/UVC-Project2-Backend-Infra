const express = require('express');
const { Sequelize } = require('sequelize');

const router = express.Router();
const logger = require('../lib/logger');
const workHistoryService = require('../service/workHistoryService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      deviceId: req.body.deviceId,
      emergencyId: req.body.emergencyId,
      userId: req.body.userId,
      workHistoryId: req.body.workHistoryId,
      targetQuantity: req.body.targetQuantity,
      leadtime: req.body.leadtime,
      color: req.body.color,
      start: req.body.start,
      reset: req.body.reset,
    };
    logger.info(`(workHistory.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await workHistoryService.reg(params);
    logger.info(`(workHistory.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      name: req.query.name,
      deviceid: req.query.deviceid,
    };
    logger.info(`(workHistory.list.params) ${JSON.stringify(params)}`);

    const result = await workHistoryService.list(params);
    logger.info(`(workHistoryService.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(workHistoryService.info.params) ${JSON.stringify(params)}`);

    const result = await workHistoryService.info(params);
    logger.info(`(workHistoryService.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 준비상태
router.patch('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      ready: req.body.ready,
    };
    logger.info(`(workHistory.patch.ready) ${JSON.stringify(params)}`);

    const result = await workHistoryService.readyCheck;
    logger.info(`(workHistory.patch.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 가동 상태 변동
// eslint-disable-next-line consistent-return
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      inputQuantity: req.body.inputQuantity,
      targetQuantity: req.body.targetQuantity,
      leadtime: req.body.leadtime,
      color: req.body.color,
      ready: req.body.ready,
      reset: req.body.reset,
      operating: req.body.operating,
    };
    logger.info(`(workHistory.patch.params) ${JSON.stringify(params)}`);

    // 준비상태 체크
    if (params.ready !== true) {
      const err = new Error('준비상태를 체크하세요');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 로직 호출
    const operatingStatus = await workHistoryService.check(params);

    // 가동상태 비교
    if (operatingStatus === params.operating) {
      return res.status(401).json({
        msg: '가동 상태를 확인해주세요',
      });
    }
    if (operatingStatus !== params.operating) {
      const result = await workHistoryService.edit(params);
      logger.debug(`(operatingStatus.result) ${result}`);
      // 최종 응답
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
