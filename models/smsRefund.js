const mongoose = require('mongoose')

const smsRefundSchema = new mongoose.Schema({
    SERIAL_NO: {
        type: String,
    },
    FILENAME: {
        type: String,
    },
    CUSTOMER_NAME: {
        type: String,
    },
    ADD1: {
        type: String,
    },
    ADD2: {
        type: String,
    },
    ADD3: {
        type: String,
    },
    LANDMARK: {
        type: String,
    },
    PINCODE: {
        type: String,
    },
    CITY: {
        type: String,
    },
    MOBILE_NO: {
        type: String,
    },
    NAME: {
        type: String,
    },
    CUID: {
        type: String,
    },
    STATE: {
        type: String,
    },
    GL_IDS: {
        type: String,
    },
    REFUND_AMOUNT: {
        type: String,
    },
    REFUND_AMOUNT_IN_WORDS: {
        type: String,
    },
    FORECLOSURE_AMOUNT: {
        type: String,
    },
    AUCTION_PROCEEDS: {
        type: String,
    },
    LREGION_CODE: {
        type: String,
    },
    SUTRACODE: {
        type: String,
    },
    BRANCH: {
        type: String,
    },
    LOCATION: {
        type: String,
    },
    MONTH: {
        type: String,
    },
    NOTICE_DATE: {
        type: String,
    },
    OLD_NOTICE_DATE: {
        type: String,
    },
    DDD: {
        type: String,
    },
    EEE: {
        type: String,
    },
    NOTICE_REFERENCE_NUMBER: {
        type: String,
    },
    BARCODE: {
        type: String,
    },
    NOTICE_URL: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const SmsFefund = mongoose.model('smsRefund', smsRefundSchema);
SmsFefund.createIndexes();
module.exports = SmsFefund;