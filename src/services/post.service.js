const { ref, getDownloadURL } = require("firebase/storage");
const PostImg = require("../models/postImg1.model");
const  Member  = require('./../models/member.model'); //post   { Post }
//const User = require('./../models/member.model');
const AppError = require('./../utils/appError');
const storage = require('./../utils/firebase');

class PostService {
  async findPost(id){
    try {
      const member = await Member.findOne({
        where: {
          id,
          status: 'active'
        },
        attributes: {
          exclude: [ 'status']
        },
        include: [
/*
          {
            model: User,
            attributes: ['id', 'name', 'profileImgUrl', 'description']
          },
          */
          {
            model: PostImg,
          }
        ]
      })

      if(!member){
        throw new AppError(`Member with id: ${id} not found`, 404);
      }

      return member
    } catch (error) {
      throw new Error(error)
    }
  }

  async downloadImgsPost(member){
    try {
      const imgRefMember = ref(storage, member.memberImgUrl); // tratamiento de la imagen de perfil del miembro del equipo
      const urlMember = await getDownloadURL(imgRefMember);

      member.memberImgUrl = urlMember;
     
      const postImgsPromises = member.PostImgs.map(async (postImg) => { //tratamiento de las imagenes generales del proyecto
        const imgRef = ref(storage, postImg.image_url);
        const url = await getDownloadURL(imgRef);

        postImg.image_url = url;
        return postImg;
      });

      await Promise.all(postImgsPromises);

      return member;

    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = PostService;