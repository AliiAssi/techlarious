const router = require('express').Router();
const { createPostCtrl, getAllPostsCtrl, getPostsCountCtrl, getPostCtrl,
deletePostCtrl, updatePostCtrl, updatePostPictureCtrl, toggleLikeCtrl
} = require('../Controller/PostController');
const photoUpload1 = require('../Middleware/photoPostUpload');
const validateObjectId = require('../Middleware/validateObjectId');
const { verifyToken } = require('../Middleware/verifyToken');

router.route('/')
  .post(verifyToken, photoUpload1.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

router.route('/count')
  .get(getPostsCountCtrl);

router.route('/:id')
  .get(validateObjectId, getPostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl);

router.route('/postPhoto/:id')
  .post(validateObjectId, verifyToken, photoUpload1.single("image"), updatePostPictureCtrl);

router.route('/like/:id')
  .put(validateObjectId, verifyToken, toggleLikeCtrl);

module.exports = router;
