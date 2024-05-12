var express = require('express');
var router = express.Router();
const { addPost,fAll} = require('../../controller/postal/refund');
const { wrapper } = require('../../utils/errorWrapper');


router.post('/',wrapper(addPost));
router.get('/',wrapper(fAll));




module.exports = router;