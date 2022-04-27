const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const workChartService = require('../service/workChartService');

// 통계 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      id: req.query.id,
      deviceId: req.query.deviceId,
    };
    logger.info(`(workChart.list.params) ${JSON.stringify(params)}`);

    // 로직 호출
    const result = await workChartService.list(params);
    logger.info(`(workChartService.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
