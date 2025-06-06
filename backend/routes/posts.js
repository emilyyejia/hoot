const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/auth'
// Protect all defined routes
router.use(ensureLoggedIn);
// GET /api/posts Index action
router.get('/', postsCtrl.index);
// Post/api/posts Create action 
router.post('/', postsCtrl.create);
// Get/api/posts/:postId Show action
router.get('/:postId', postsCtrl.show);
// Put/ api/posts/:postId Update action
router.put('/:postId', postsCtrl.update);
//Delete/api/psost/:postId Delete action
router.delete('/:postId', postsCtrl.remove);
module.exports = router;