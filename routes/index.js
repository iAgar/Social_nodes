const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/home_controllers');

console.log('Router loaded');

router.get('/', homeControllers.home);

module.exports = router;