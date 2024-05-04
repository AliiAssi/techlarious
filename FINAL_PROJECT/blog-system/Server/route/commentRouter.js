const { createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl } = require('../Controller/commentController');
const { verifyToken, verifyTokenAndAdmin } = require('../Middleware/verifyToken');
const validateObjectId = require('../Middleware/validateObjectId');

const router = require('express').Router();

router.route('/')
.post(verifyToken,createCommentCtrl)
.get(verifyToken,verifyTokenAndAdmin,getAllCommentsCtrl)

router.route('/:id')
.delete(validateObjectId,verifyToken,deleteCommentCtrl)
.put(validateObjectId,verifyToken,updateCommentCtrl)
module.exports = router;