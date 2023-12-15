const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.updateMemberValidation = [
  body('first_name').notEmpty().withMessage('first_name is required'),
  body('last_name').notEmpty().withMessage('last_name is required'),
  body('email').notEmpty().withMessage('email is required'),
  body('gerder').notEmpty().withMessage('gerder is required'),
  body('phone_number').notEmpty().withMessage('phone_number is required'),
  body('tech_role_id').notEmpty().withMessage('tech_role_id is required'),
   
  validFields,
];

exports.createMemberValidation = [

  body('first_name').notEmpty().withMessage('first_name is required'),
  body('last_name').notEmpty().withMessage('last_name is required'),
  body('email').notEmpty().withMessage('email is required')
  .isEmail()
  .withMessage('Email must be a correct format'),
  body('gerder').notEmpty().withMessage('gerder is required'),
  body('phone_number').notEmpty().withMessage('phone_number is required'),
  body('tech_role_id').notEmpty().withMessage('tech_role_id is required'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have cotain a least one letter'),
   
  validFields,
];

exports.loginMemberValidation = [

  body('email').notEmpty().withMessage('email is required')
  .isEmail()
  .withMessage('Email must be a correct format'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have cotain a least one letter'),

  validFields,

];

exports.updatePasswordValidation = [
  body('currentPassword')
  .notEmpty().withMessage('currentPassword is required')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have cotain a least one letter'),
  body('newPassword')
  .notEmpty().withMessage('newPassword is required')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have cotain a least one letter'),
  validFields,
];

exports.createImagesValidation = [
  body('alt_text').notEmpty().withMessage('alt_text is required'),
  validFields,
];






