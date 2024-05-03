var express = require('express');
var router = express.Router();
const { addSms,typeSms,fmonth,fstate  } = require('../controller/sms/sms');
const { wrapper } = require('../utils/errorWrapper');
const checkAuth = require('../middleware/checkAuth');





router.post('/addsms',checkAuth, wrapper(addSms));

router.get('/typesms',checkAuth,wrapper(typeSms));
router.get('/fstate',checkAuth,wrapper(fstate));
router.get('/fmonth',checkAuth,wrapper(fmonth));









module.exports = router;