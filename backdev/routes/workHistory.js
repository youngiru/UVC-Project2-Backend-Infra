const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const workHistoryService = require('../service/workHistoryService');

// 완료이력 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      deviceId: req.query.deviceId,
      userId: req.query.userId,
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

// 리셋
// eslint-disable-next-line consistent-return
router.put('/reset/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      reset: req.body.reset || true,
    };
    logger.info(`(workStatus.put.reset.params) ${JSON.stringify(params)}`);

    // operating값 null 체크
    const data = await workHistoryService.info(params);
    if (data.operating === null) {
      const err = new Error('Not allowed null (operating)');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 가동상태 확인
    if (data.operating === true) {
      return res.status(401).json({
        msg: '가동중지버튼을 먼저 눌러주세요',
      });
    }
    // const stock = params.inputQuantity - params.outputQuantity;

    // 비즈니스 로직 호출
    const result = await workHistoryService.edit(params);
    logger.info(`(workStatus.put.reset.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
