const catchAsync = require('../utils/catchAsync');
const crypto = require('node:crypto');
const { db } = require('./../database/config');
//const { Post, postStatus } = require('../models/post.model'); 
const Image = require('../models/postImg1.model');
const storage = require('../utils/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');



exports.findAllImages = catchAsync(async (req, res, next) => {
  const images = await Image.findAll({   
    where: {
      status: postStatus.active,
    },
    attributes: {
      exclude: ['status' ], 
    },

    order: [['createdAt', 'DESC']],
    limit: 10,
  });

  const postPromises = images.map(async (post) => {

    if (post.length > 0){
  
    const postImgsPromises = post.Images.map(async (postImg) => {
      const imgRef = ref(storage, postImg.postImgUrl);
      const url = await getDownloadURL(imgRef);

      postImg.postImgUrl = url;
      return postImg;
    });

    const postImgsResolved = await Promise.all(postImgsPromises);
    post.Images = postImgsResolved;

    }

    return post;
  });

  await Promise.all(postPromises);

  return res.status(200).json({
    status: 'success',
    results: images.length,
    images,
  });
});




exports.createImages = catchAsync(async (req, res, next) => {

  const { alt_text } = req.body;

 let image = []

  const postImgsPromises = req.files.map(async (file) => {
    const imgRef = ref(
      storage,
      `images/${crypto.randomUUID()}-${file.originalname}`
    );   
    const imgUploaded = await uploadBytes(imgRef, file.buffer);
    return   image.push(await Image.create({
      alt_text: alt_text,  
      image_url: imgUploaded.metadata.fullPath,
    }));
  });

  await Promise.all(postImgsPromises);

  return res.status(201).json({
    status: 'success',
    message: 'the image has been created!',
    results: image.length,
    image,
  });
});


/**/
exports.deleteImage = catchAsync(async (req, res, next) => {
  const { image } = req;

  await image.update({ status: postStatus.disabled });

  return res.status(200).json({
    status: 'success',
    message: 'the image has been deleted!',
  });
}); 
