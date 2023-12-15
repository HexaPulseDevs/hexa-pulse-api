//const Comment = require('./comment.model');
const  Member = require('./member.model');
const PostImg = require('./postImg1.model');
//const User = require('./user.model');

const initModel = () => {
  //User.hasMany(Post, { foreignKey: 'userId' });
 // Post.belongsTo(User, { foreignKey: 'userId' });

  //Post.hasMany(Comment);
  //Comment.belongsTo(Post);

  //User.hasMany(Comment);
  //Comment.belongsTo(User);

  Member.hasMany(PostImg);
 PostImg.belongsTo(Member);
};

module.exports = initModel;
