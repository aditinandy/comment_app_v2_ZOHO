const express = require('express');

const userController = require('../controllers/signup');

const router = express.Router();

router.get('/signup', userController.getSignup);

router.get('/get_comment/:userId', userController.getComment);

router.get('/get_find_comment/:userId', userController.getfind);

router.post('/signup', userController.postSignup);

router.post('/login', userController.postLogin);

router.post('/post_comment/:userId', userController.postComment);

router.post('/Post_forget', userController.postForgetPassword);

module.exports = router;