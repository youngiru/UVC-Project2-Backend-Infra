const express = require('express');

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

// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      location: req.body.location,
      edge_serial_number: req.body.edge_serial_number,
      network_interface: req.body.network_interface,
      network_config: req.body.network_config,
      description: req.body.description,
      operating: req.body.operating,
      ready_state: req.body.ready_state,
      inspection: req.body.inspection,
    };
    logger.info(`(workStatus.update.params) ${JSON.stringify(params)}`);

    const result = await workStatusService.edit(params);
    logger.info(`(workStatus.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(workStatus.delete.params) ${JSON.stringify(params)}`);

    const result = await workStatusService.delete(params);
    logger.info(`(workStatus.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
