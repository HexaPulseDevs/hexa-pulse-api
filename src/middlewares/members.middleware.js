const AppError = require('../utils/appError');
const Member = require('../models/member.model');
const catchAsync = require('../utils/catchAsync');

exports.validMember = catchAsync(async (req, res, next) => {
  
  const { id } = req.params;

  const member = await Member.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  
  if (!member) {
    return next(new AppError(`Member with id: ${id} not found`, 404));
  }
  
  req.member = member;
  next();
});
