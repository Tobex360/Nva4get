const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/register', AuthController.registerUser)
router.post('/login',AuthController.loginUser);
router.post('/google-login', AuthController.googleLogin);


module.exports = router;