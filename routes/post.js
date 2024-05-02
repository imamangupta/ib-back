var express = require('express');
var router = express.Router();
const { addPost,  } = require('../controller/post/post');
const { wrapper } = require('../utils/errorWrapper');
const checkAuth = require('../middleware/checkAuth');





router.post('/addpost', checkAuth,wrapper(addPost));







module.exports = router;