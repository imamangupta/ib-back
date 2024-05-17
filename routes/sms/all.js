var express = require('express');
var router = express.Router();
const { allData,postalDataDownload} = require('../../controller/sms/FilterAllSms');
const { wrapper } = require('../../utils/errorWrapper');
const checkAuth = require('../../middleware/checkAuth');


router.get('/',wrapper(allData));
router.get('/download',wrapper(postalDataDownload));




module.exports = router;