var express = require('express');
var router = express.Router();
const { addPost,fAll} = require('../../controller/sms/deficit');
const { wrapper } = require('../../utils/errorWrapper');


router.post('/',wrapper(addPost));
router.get('/',wrapper(fAll));




module.exports = router;