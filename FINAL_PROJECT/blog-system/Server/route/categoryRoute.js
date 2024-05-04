const router = require('express').Router();
const { createCategoryCtrl, getAllCategories, deleteCategoryCtrl } = require('../Controller/categoryController');
const { verifyToken, verifyTokenAndAdmin } = require('../Middleware/verifyToken');
const validateObjectId = require('../Middleware/validateObjectId');


router.route('/')
.post(verifyTokenAndAdmin,createCategoryCtrl)
.get(getAllCategories)

router.route('/:id')
.delete(validateObjectId,verifyTokenAndAdmin,deleteCategoryCtrl)

module.exports = router;
