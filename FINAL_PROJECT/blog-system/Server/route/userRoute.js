const router = require('express').Router();
const {getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl, deleteProfilePhotoCtrl,deleteUserProfileCtrl} = require('../Controller/userController');
const photoUpload = require('../Middleware/photoUpload');
const validateObjectId = require('../Middleware/validateObjectId');
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUserHimself, verifyTokenAndOnlyUserHimselfOrAdmin } = require('../Middleware/verifyToken');


router.route('/profile').get(verifyTokenAndAdmin,getAllUsersCtrl);


router.route('/profile/:id')
.get(validateObjectId,getUserProfileCtrl)
.put(validateObjectId,verifyTokenAndOnlyUserHimself,updateUserProfileCtrl)
.delete(validateObjectId,verifyTokenAndOnlyUserHimselfOrAdmin,deleteUserProfileCtrl);

router.route('/profile/profile-photo-upload')
.post(verifyToken,photoUpload.single("image"),profilePhotoUploadCtrl);

router.route('/profile/profile-photo-deleted')
.post(verifyToken,deleteProfilePhotoCtrl);



router.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;