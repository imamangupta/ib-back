var express = require('express');
var router = express.Router();

const user = require('./user')
router.use('/user', user);

const auth = require('./auth')
router.use('/auth', auth);

const sms = require('./sms')
router.use('/sms', sms);

const post = require('./post')
router.use('/post', post);




module.exports = router;