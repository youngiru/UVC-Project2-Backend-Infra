const express = require('express');
const { Sequelize } = require('sequelize');

const router = express.Router();
const logger = require('../lib/logger');
const workStatusService = require('../service/workStatusService');

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
    logger.info(`(workStatus.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await workStatusService.reg(params);
    logger.info(`(workStatus.reg.result) ${JSON.stringify(result)}`);

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
    logger.info(`(workStatus.list.params) ${JSON.stringify(params)}`);

    const result = await workStatusService.list(params);
    logger.info(`(workStatusService.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(workStatusService.info.params) ${JSON.stringify(params)}`);

    const result = await workStatusService.info(params);
    logger.info(`(workStatusService.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 가동 상태 변동
// eslint-disable-next-line consistent-return
router.patch('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      targetQuantity: req.body.targetQuantity,
      leadtime: req.body.leadtime,
      color: req.body.color,
      start: req.body.start,
      ready: req.body.ready,
      reset: req.body.reset,
      operating: req.body.operating,
    };
    logger.info(`(workStatus.patch.params) ${JSON.stringify(params)}`);

    // 가동상태 null 체크
    if (params.operating === null) {
      const err = new Error('Not allowed null (operating)');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 로직 호출
    const operatingStatus = await workStatusService.check(params);

    // 가동상태 비교
    if (operatingStatus === params.operating) {
      return res.status(401).json({
        msg: '가동 상태를 확인해주세요',
      });
    }
    if (operatingStatus !== params.operating) {
      const result = await workStatusService.edit(params);
      logger.debug(`(operatingStatus.result) ${result}`);
      // 최종 응답
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
