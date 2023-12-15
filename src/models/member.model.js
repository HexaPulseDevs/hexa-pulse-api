const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Member = db.define('member1', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  gerder: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.INTEGER(20),
    allowNull: false,
  },
  tech_role_id: {
    
    type: DataTypes.ENUM('frontend', 'backend'),
    allowNull: false,
    defaultValue: 'frontend',
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordChangedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'password_changed_at',
  },
  memberImgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      'https://images.pexels.com/photos/935762/pexels-photo-935762.jpeg',
    field: 'profile_img_url',
  },

  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Member;
