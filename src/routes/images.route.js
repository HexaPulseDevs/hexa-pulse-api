const express = require('express');

//controllers
const imagesController = require('../controllers/images.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');

const upload = require('./../utils/multer');

const router = express.Router();

router.route('/')
.get(imagesController.findAllImages)
.post(
  upload.array('images', 3), 
 validationMiddleware.createImagesValidation,
 imagesController.createImages
);

//router.get('/me', postController.findMyPosts);

module.exports = router;
