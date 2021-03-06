const express = require('express');
const router = express.Router();
const postsAPIController = require('../../../controllers/api/v1/posts_api');

router.get('/', postsAPIController.index);
router.delete('/:id', postsAPIController.delete);

module.exports = router;