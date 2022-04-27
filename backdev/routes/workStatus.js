const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const workHistoryService = require('../service/workHistoryService');
const emergencyService = require('../service/emergencyService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      deviceId: req.body.deviceId,
      sensorId: req.body.sensorId,
      userId: req.body.userId,
      inputQuantity: req.body.inputQuantity,
      targetQuantity: req.body.targetQuantity,
      outputQuantity: req.body.outputQuantity,
      qualityQuantity: req.body.qualityQuantity,
      defectiveQuantity: req.body.defectiveQuantity,
      defectiveRate: req.body.defectiveRate,
      stock: req.body.stock,
      uptime: req.body.uptime,
      downtime: req.body.downtime,
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

// 작업현황 리스트 조회
router.get('/', async (req, res) => {
  try {
    const result = await workHistoryService.statusList();
    logger.info(`(workHistoryService.statusList.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 준비상태 체크
router.put('/ready/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      ready: req.body.ready,
    };
    logger.info(`(workHistory.put.ready) ${JSON.stringify(params)}`);

    const result = await workHistoryService.readyCheck(params);
    logger.info(`(workHistory.put.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 가동 상태 변동(시작, 정지)
// eslint-disable-next-line consistent-return
router.put('/start/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      operating: req.body.operating,
    };
    logger.info(`(workHistory.start.params) ${JSON.stringify(params)}`);

    // 준비상태 체크
    const data = await workHistoryService.info(params);
    logger.info(`(workHistory.start.ready) ${JSON.stringify(data)}`);
    // 준비가 안 됐을 경우
    if (data.ready !== true) {
      const err = new Error('준비상태를 확인하세요');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const operatingStatus = await workHistoryService.check(params);
    logger.debug(`(workHistory.start.operatingStatus) ${operatingStatus}`);

    // 원래 가동상태, 원하는 가동상태 비교
    if (operatingStatus === params.operating) {
      return res.status(401).json({
        msg: '가동 상태를 확인하세요',
      });
    }
    if (operatingStatus !== params.operating) {
      const result = await workHistoryService.edit(params);
      logger.debug(`(workStatus.operatingStatus.result) ${result}`);
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
      qualityQuantity: req.body.qualityQuantity,
      defectiveQuantity: req.body.defectiveQuantity,
      defectiveRate: req.body.defectiveRate,
      stock: req.body.stock,
      uptime: req.body.uptime,
      downtime: req.body.downtime,
      leadtime: req.body.leadtime,
      color: req.body.color,
      operating: req.body.operating || false,
    };
    logger.info(`(workStatus.stop.params) ${JSON.stringify(params)}`);

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
    const insert = await workHistoryService.historyList(result);
    logger.info(`(workStatus.put.reset.result) ${JSON.stringify(result)}`);
    logger.info(`(workStatus.put.reset.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(insert);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 완료
router.put('/done/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      deviceId: req.body.deviceId,
      userId: req.body.userId,
      outputQuantity: req.body.outputQuantity,
      qualityQuantity: req.body.qualityQuantity,
      defectiveQuantity: req.body.defectiveQuantity,
      defectiveRate: req.body.defectiveRate,
      stock: req.body.stock,
      downtime: req.body.downtime,
      operating: false,
    };
    logger.info(`(workStatus.done.params) ${JSON.stringify(params)}`);

    const result = await workHistoryService.edit(params);
    const insert = await workHistoryService.historyList(result);
    logger.info(`(workStatus.put.done.result) ${JSON.stringify(result)}`);
    logger.info(`(workStatus.put.done.insert) ${JSON.stringify(insert)}`);
    // 최종 응답
    res.status(200).json(insert);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 비상정지 버튼
router.post('/emergency', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      workHistoryId: req.body.workHistoryId,
      description: req.body.description,
    };
    logger.info(`(workStatus.emergency.params) ${JSON.stringify(params)}`);

    const result = await emergencyService.reg(params);
    logger.debug(`(workStatus.emergency.post.result) ${result}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 비상정지 이력 조회
router.get('/emergency', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      workHistoryId: req.body.workHistoryId,
      description: req.body.description,
    };
    logger.info(`(workStatus.emergency.get.params) ${params}`);

    const result = await emergencyService.list(params);
    logger.debug(`(workStatus.emergency.get.result) ${result}`);
    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
