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

const postalAuction = require('./postal/auction')
router.use('/postal/auction', postalAuction);

const postalDeficit = require('./postal/deficit')
router.use('/postal/deficit',postalDeficit );

const postalRefund = require('./postal/refund')
router.use('/postal/refund', postalRefund);




module.exports = router;