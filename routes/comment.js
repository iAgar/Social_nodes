const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment_controllers');

router.post('/create', commentController.create);
router.get('/delete/:id', commentController.delete);

module.exports = router;