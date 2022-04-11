const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const workHistoryService = require('../service/workManagementService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      uptime: req.body.uptime,
      downtime: req.body.downtime,
      emergency: req.body.emergency,
      leadtime: req.body.leadtime,
      input_item: req.body.input_item,
      quality_item: req.body.quality_item,
      defective_item: req.body.defective_item,
      stock: req.body.stock,
    };
    logger.info(`(workHistory.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

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
      workHistoryid: req.query.workHistoryid,
    };
    logger.info(`(workHistory.list.params) ${JSON.stringify(params)}`);

    const result = await workHistoryService.list(params);
    logger.info(`(workHistory.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(workHistory.info.params) ${JSON.stringify(params)}`);

    const result = await workHistoryService.info(params);
    logger.info(`(workHistory.info.result) ${JSON.stringify(result)}`);

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
      uptime: req.body.uptime,
      downtime: req.body.downtime,
      emergency: req.body.emergency,
      leadtime: req.body.leadtime,
      input_item: req.body.input_item,
      quality_item: req.body.quality_item,
      defective_item: req.body.defective_item,
      stock: req.body.stock,
    };
    logger.info(`(workHistory.update.params) ${JSON.stringify(params)}`);

    const result = await workHistoryService.edit(params);
    logger.info(`(workHistory.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(workHistory.delete.params) ${JSON.stringify(params)}`);

    const result = await workHistoryService.delete(params);
    logger.info(`(workHistory.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
