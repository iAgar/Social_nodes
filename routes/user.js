const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user_controllers');

router.get('/sign-up', userControllers.signUp);
router.get('/sign-in', userControllers.signIn);

module.exports = router