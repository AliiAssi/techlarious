const router = require('express').Router();
const { getTimeLinePosts, createPost, deletePost, updatePost, likePost } = require('../controllers/postController');
const { verifyTokenMiddleware } = require('../Middlewares/verifyToken');
const verifyObjectId = require('../middlewares/verifyObjectId');

//? api/post/

router.route('/')
.post(verifyTokenMiddleware, createPost)
.get(verifyTokenMiddleware, getTimeLinePosts);

router.route('/:id')
.delete(verifyObjectId,verifyTokenMiddleware , deletePost)
.put(verifyObjectId, verifyTokenMiddleware, updatePost)

router.put('/like/:id', verifyObjectId, verifyTokenMiddleware, likePost);
module.exports = router;