const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/auth'
// Protect all defined routes
router.use(ensureLoggedIn);

// Post/api/posts Create action 
router.post('/:postId/comments', commentsCtrl.create);
// Put/ api/posts/:postId Update action
router.put('/:postId/comments/:commentId', commentsCtrl.update);
// //Delete/api/psost/:postId Delete action
router.delete('/:postId/comments/:commentId', commentsCtrl.remove);
module.exports = router;