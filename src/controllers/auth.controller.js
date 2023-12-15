const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('./../utils/jwt');
const storage = require('../utils/firebase');
const Member = require('./../models/member.model');

const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

exports.signUp = catchAsync(async (req, res, next) => {
  const {first_name, email, last_name, gerder, phone_number, tech_role_id, password } = req.body; 

  if (!req.file) {  
    return next(new AppError('Please upload a file', 400));
  }

  const imgRef = ref(storage, `member/${Date.now()}-${req.file.originalname}`);
  const imgUpload = await uploadBytes(imgRef, req.file.buffer); 

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const member = await Member.create({
    first_name: first_name.toLowerCase().trim(),
    last_name: last_name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
   password: encryptedPassword,
    gerder: gerder.toLowerCase().trim(),
    phone_number: phone_number.toLowerCase().trim(),
    tech_role_id: tech_role_id.toLowerCase().trim(),
    memberImgUrl: imgUpload.metadata.fullPath,
  });

  const tokenPromise = generateJWT(member.id);

  const imgRefToDownload = ref(storage, member.memberImgUrl);
  const urlPromise = getDownloadURL(imgRefToDownload); 

  const [token, url] = await Promise.all([tokenPromise, urlPromise]);

  member.memberImgUrl = url;

  res.status(200).json({
    status: 'success',
    message: 'The member has been created',
    token,
    member: {
      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      password: encryptedPassword,
      gerder: member.gerder,
      phone_number: member.phone_number,
      tech_role_id: member.tech_role_id,
      memberImgUrl: member.memberImgUrl,
    },
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const member = await Member.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: 'active',
    },
  });

  if (!member) {
    return next(new AppError(`member with email: ${email} not found`, 404));
  }
  
  if (!(await bcrypt.compare(password, member.password))) {
    return next(new AppError('Correo o contraseña incorrecta', 401));
  }

  const tokenPromise = generateJWT(member.id);

  const imgRef = ref(storage, member.memberImgUrl);
  const urlPromise = getDownloadURL(imgRef);

  const [token, url] = await Promise.all([tokenPromise, urlPromise]);

  member.memberImgUrl = url;

  res.status(200).json({
    status: 'success',
    token,
    member: {

      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      gerder: member.gerder,
      phone_number: member.phone_number,
      tech_role_id: member.tech_role_id,
      memberImgUrl: member.memberImgUrl,
      
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { member } = req;

  const { currentPassword, newPassword } = req.body;

  if (currentPassword === newPassword) {
    return next(new AppError('The password cannot be equals', 400));
  }

  if (!(await bcrypt.compare(currentPassword, member.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(newPassword, salt);

  await member.update({
    password: encryptedPassword,
    passwordChangedAt: new Date(),
  });

  
  return res.status(200).json({
    status: 'success',
    message: 'The member password was updated successfully',
  });
});
