const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
const {requireAuth , redirect_back} = require('../middleware/authMiddleware');

router.get('/signup',redirect_back,AuthController.signup)
router.post('/signup_process',AuthController.signup_process);

router.get('/login',redirect_back,AuthController.login);
router.post('/login_process',AuthController.login_process);
router.get('/profile',requireAuth,AuthController.user_profile);

router.get('/logout',AuthController.logout);


module.exports = router;