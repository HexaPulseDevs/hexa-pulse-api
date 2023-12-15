const Member = require('../models/member.model');
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
    const imgRef = ref(storage, member.memberImgUrl);
    const url = await getDownloadURL(imgRef);
    member.memberImgUrl = url;
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

  const imgRef = ref(storage, member.memberImgUrl);
  const url = await getDownloadURL(imgRef);

  res.status(200).json({
    status: 'success',
    member: {
      first_name: member.first_name,
      last_name: member.last_name,
      gerder: member.gerder,
      email: member.email,
      phone_number: member.phone_number,
      imagenUrl: url,
      tech_role_id: member.tech_role_id,
    },
  });
});

exports.updateMember = catchAsync(async (req, res, next) => {
  const {member } = req;
  const { first_name, last_name, gerder, email, phone_number, tech_role_id  } = req.body;

  await member.update({ first_name, last_name, gerder, email, phone_number, tech_role_id });

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
