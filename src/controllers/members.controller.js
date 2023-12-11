const Member = require('../models/user.model');
const storage = require('../utils/firebase');
const catchAsync = require('../utils/catchAsync');
const { ref, getDownloadURL } = require('firebase/storage');

exports.findAllMembers = catchAsync(async (req, res, next) => {
  const members = await Member.findAll({
    where: {
      status: 'active',
    },
  });

  const membersPromises = members.map(async (member) => {
    //obtenemos la referencia
    const imgRef = ref(storage, member.profileImgUrl);
    //nos traemos la url
    const url = await getDownloadURL(imgRef);
    //hacemos el cambio del path por la url
    member.profileImgUrl = url;
    //retornamos el usuario
    return member;
  });

  const memberResolved = await Promise.all(membersPromises);

  res.status(200).json({
    status: 'success',
    members: memberResolved,
  });
});

exports.findOneMember = catchAsync(async (req, res, next) => {
  const { member } = req;

  const imgRef = ref(storage, member.profileImgUrl);
  const url = await getDownloadURL(imgRef);

  res.status(200).json({
    status: 'success',
    member: {
      name: member.name,
      email: member.email,
      description: member.description,
      profileImgUrl: url,
      role: member.role,
    },
  });
});

exports.updateMember = catchAsync(async (req, res, next) => {
  const {member } = req;
  const { name, description } = req.body;

  await member.update({ name, description });

  res.status(200).json({
    status: 'success',
    message: 'Member updated successfully',
  });
});

exports.deleteMember = catchAsync(async (req, res, next) => {
  const {member } = req;

  await member.update({ status: 'inactive' }); 

  return res.status(200).json({
    status: 'success',
    message: 'Member deleted successfully',
  });
});
