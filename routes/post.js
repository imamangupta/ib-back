var express = require('express');
var router = express.Router();
const { addPost, fstate,allpost } = require('../controller/post/post');
const { wrapper } = require('../utils/errorWrapper');
const checkAuth = require('../middleware/checkAuth');





router.post('/addpost',wrapper(addPost));
router.get('/fstate',wrapper(fstate));
router.get('/all',wrapper(allpost));







module.exports = router;