const AppError = require('../utils/appError');
const Images = require('../models/postImg1.model');
const catchAsync = require('../utils/catchAsync');

exports.validImage = catchAsync(async (req, res, next) => {
  
  const { id } = req.params;

  const image = await Images.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  
  if (!image) {
    return next(new AppError(`Image with id: ${id} not found`, 404));
  }
  
  req.image = image;
  next();
});
