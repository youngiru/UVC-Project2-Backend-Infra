const express = require('express');

const router = express.Router();
const { validationCheck, validatorErrorChecker } = require('../lib/validation');
const logger = require('../lib/logger');
const userService = require('../service/userService');

// 등록
router.post(
  '/',
  validationCheck,
  validatorErrorChecker,
  async (req, res) => {
    try {
      const insertedUser = {
        userid: req.body.userid,
        password: req.body.password,
        name: req.body.name,
        rank: req.body.rank,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role || 'leader',
        active: req.body.active || true,
      };
      logger.info(`(user.req.insertedUser) ${JSON.stringify(insertedUser)}`);

      // 입력값 null 체크
      if (!insertedUser.name || !insertedUser.userid || !insertedUser.password) {
        const err = new Error('Not allowed null (name, userid, password)');
        logger.error(err.toString());

        return res.status(500).json({ err: err.toString() });
      }

      // 비즈니스 로직 호출
      const result = await userService.register(insertedUser);
      logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      return res.status(200).json(result);
    } catch (err) {
      logger.error(`(userRouter) ${err.toString()}`);
      return res.status(500).json({ err: err.toString() });
    }
  },
);

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      name: req.query.name,
      userid: req.query.userid,
      role: req.query.role,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    const result = await userService.info(params);
    logger.info(`(user.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 사용자 관리 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      rank: req.body.rank,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      active: req.body.active || true,
    };
    logger.info(`(user.update.params) ${JSON.stringify(params)}`);

    const result = await userService.edit(params);
    logger.info(`(user.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 마이페이지 정보 수정
router.put('/mypage/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(user.mypage.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await userService.register(params);
    logger.info(`(user.mypage.result) ${JSON.stringify(result)}`);
    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.delete.params) ${JSON.stringify(params)}`);

    const result = await userService.delete(params);
    logger.info(`(user.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
