const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const deviceService = require('../service/deviceService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
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
    logger.info(`(device.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await deviceService.reg(params);
    logger.info(`(device.reg.result) ${JSON.stringify(result)}`);

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
    logger.info(`(device.list.params) ${JSON.stringify(params)}`);

    const result = await deviceService.list(params);
    logger.info(`(device.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(device.info.params) ${JSON.stringify(params)}`);

    const result = await deviceService.info(params);
    logger.info(`(device.info.result) ${JSON.stringify(result)}`);

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
    logger.info(`(device.update.params) ${JSON.stringify(params)}`);

    const result = await deviceService.edit(params);
    logger.info(`(device.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(device.delete.params) ${JSON.stringify(params)}`);

    const result = await deviceService.delete(params);
    logger.info(`(device.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
