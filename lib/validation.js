const { validationResult, body } = require('express-validator');

exports.validationCheck = [
  body('userid').notEmpty().trim(),
  body('password').notEmpty().trim().isLength({ min: 4 })
    .withMessage('최소 4자 이상 입력해주세요'),
  body('name').notEmpty().withMessage('이름을 입력해주세요'),
  body('email').isEmail().withMessage('이메일 형식을 확인해주세요'),
  body('phone').isMobilePhone().withMessage('010-xxxx-xxxx 형식으로 입력해주세요'),
];

exports.validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
