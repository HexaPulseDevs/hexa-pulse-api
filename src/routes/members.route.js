const express = require('express');

//controllers

const membersController = require('./../controllers/members.controller');

//middlewares

const membersMiddleware = require('./../middlewares/members.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/', membersController.findAllMembers);


/**/
router
  .use('/:id', membersMiddleware.validMember)
  .route('/:id')
  .get(membersController.findOneMember)
  .patch(validationMiddleware.updateMemberValidation, membersController.updateMember)
  .delete(membersController.deleteMember);




module.exports = router;
