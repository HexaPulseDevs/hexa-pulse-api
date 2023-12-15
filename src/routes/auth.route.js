const express = require('express');

//controllers

const authController = require('./../controllers/auth.controller');

//middlewares

const validationMiddleware = require('./../middlewares/validations.middleware');
const memberMiddleware = require('./../middlewares/members.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const upload = require('./../utils/multer');

const router = express.Router();


router.post(
  '/signup',
upload.single('MemberImg'), 
  validationMiddleware.createMemberValidation,
  authController.signUp
);

router.post(
  '/signin',
  validationMiddleware.loginMemberValidation,
  authController.signIn
);

router.use(authMiddleware.protect);

router.patch(
  '/password/:id',
  validationMiddleware.updatePasswordValidation,
  memberMiddleware.validMember,
  authMiddleware.protectAccountOwner,
  authController.updatePassword
);


module.exports = router;
