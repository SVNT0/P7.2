const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentification.js');
const multer = require('../middleware/multer-config.js');
const postCtrl = require('../controllers/post.js');

router.get('/home', auth, postCtrl.getAllPost);
router.post('/create', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth,  multer, postCtrl.modify);
router.delete('/:id', auth, postCtrl.deletePost);
router.post("/like", auth, postCtrl.likePost);

module.exports = router;