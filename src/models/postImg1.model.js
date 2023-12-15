const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Image = db.define('Image', { 
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alt_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Image;
