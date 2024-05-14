var express = require('express');
var router = express.Router();
const { allData} = require('../../controller/postal/all');
const { wrapper } = require('../../utils/errorWrapper');
const checkAuth = require('../../middleware/checkAuth');


router.get('/',wrapper(allData));




module.exports = router;