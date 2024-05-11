var express = require('express');
var router = express.Router();
const { addPost} = require('../../controller/postal/auction');
const { wrapper } = require('../../utils/errorWrapper');


router.post('/',wrapper(addPost));




module.exports = router;