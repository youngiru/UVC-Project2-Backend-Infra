const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const workHistoryService = require('../service/workHistoryService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      deviceId: req.body.deviceId,
      sensorId: req.body.sensorId,
      emergencyId: req.body.emergencyId,
      userId: req.body.userId,
      workManagementId: req.body.workManagementId,
      inputQuantity: req.body.inputQuantity,
      targetQuantity: req.body.targetQuantity,
      outputQuantity: req.body.outputQuantity,
      stock: req.body.stock,
      leadtime: req.body.leadtime,
      color: req.body.color,
      ready: req.body.ready,
      reset: req.body.reset,
      operating: req.body.operating,
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
      deviceId: req.query.deviceId,
      userId: req.query.userId,
      operating: req.query.operating,
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
router.put('/ready/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      ready: req.body.ready,
    };
    logger.info(`(workHistory.patch.ready) ${JSON.stringify(params)}`);

    const result = await workHistoryService.readyCheck(params);
    logger.info(`(workHistory.patch.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 가동 상태 변동(시작, 정지)
// eslint-disable-next-line consistent-return
router.put('/operating/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      // inputQuantity: req.body.inputQuantity,
      // targetQuantity: req.body.targetQuantity,
      // leadtime: req.body.leadtime,
      // color: req.body.color,
      // ready: req.body.ready,
      // reset: req.body.reset,
      operating: req.body.operating,
    };
    logger.info(`(workHistory.put.operating.params) ${JSON.stringify(params)}`);

    // 준비상태 체크
    const data = await workHistoryService.info(params);
    logger.info(`(workHistory.put.operating.ready) ${JSON.stringify(data)}`);
    // 준비가 안 됐을 경우
    if (data.ready !== true) {
      const err = new Error('준비상태를 확인하세요');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const operatingStatus = await workHistoryService.check(params);
    logger.debug(`(workHistory.put.operating.operatingStatus) ${operatingStatus}`);

    // 원래 가동상태와 원하는 가동상태 비교
    if (operatingStatus === params.operating) {
      return res.status(401).json({
        msg: '가동 상태를 확인하세요',
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

// 중지
// eslint-disable-next-line consistent-return
router.put('/stop/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      deviceId: req.body.deviceId,
      userId: req.body.userId,
      inputQuantity: req.body.inputQuantity,
      outputQuantity: req.body.outputQuantity,
      stock: req.body.stock,
      leadtime: req.body.leadtime,
      color: req.body.color,
      operating: req.body.operating,
    };
    logger.info(`(workStatus.put.stop.params) ${JSON.stringify(params)}`);

    // operating값 null 체크
    if (params.operating === null) {
      const err = new Error('Not allowed null (operating)');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 가동상태 확인
    if (params.operating === true) {
      return res.status(401).json({
        msg: '가동중입니다',
      });
    }
    // // 중지시각
    // const downtime = new Date();
    // // 재고 계산
    // const stock = params.inputQuantity - params.outputQuantity;

    // 비즈니스 로직 호출
    // const time = await workHistoryService.edit(downtime);
    // logger.info(`(workStatus.put.reset.time) ${JSON.stringify(time)}`);

    const result = await workHistoryService.edit(params);
    logger.info(`(workStatus.put.reset.result) ${JSON.stringify(result)}`);

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
      reset: req.body.reset,
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
