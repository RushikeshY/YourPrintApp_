// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/otp', userController.sendOTP);
router.post('/verify-otp', userController.verifyOTP);
router.post('/logout', userController.logoutUser);
module.exports = router;