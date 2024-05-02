var express = require('express');
var router = express.Router();
const { addSms,  } = require('../controller/sms/sms');
const { wrapper } = require('../utils/errorWrapper');
const checkAuth = require('../middleware/checkAuth');





router.post('/addsms',checkAuth, wrapper(addSms));







module.exports = router;