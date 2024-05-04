const router = require('express').Router();
const {loginUser, registerUser} = require ('../controllers/authController');

//? api/auth/

router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports = router;