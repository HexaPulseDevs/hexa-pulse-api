const express = require('express');

//controllers
const imagesController = require('../controllers/images.controller');

//middlewares
const imagesMiddleware = require('./../middlewares/images.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const upload = require('./../utils/multer');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
.get(imagesController.findAllImages)
.post(
  upload.array('images', 3), 
 validationMiddleware.createImagesValidation,
 imagesController.createImages
)


router
  .use('/:id', imagesMiddleware.validImage)
  .route('/:id')
  .get(imagesController.findOneImage)
  .delete(imagesController.deleteImage);


module.exports = router;
