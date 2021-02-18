const express = require('express');
const router = express.Router();
const passport = require('passport');
const userControllers = require('../controllers/user_controllers');

router.get('/sign-up', userControllers.signUp);
router.get('/sign-in', userControllers.signIn);
router.post('/create', userControllers.create);
router.post('/create-session', passport.authenticate('local', {failureRedirect: '/user/sign-in'}), userControllers.createSession);
router.get('/sign-out', userControllers.destroySession);
router.get('/profile',passport.checkAuthentication, userControllers.profile);


module.exports = router