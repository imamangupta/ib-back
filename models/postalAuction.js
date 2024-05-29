const mongoose = require('mongoose')

const postalAuctionSchema = new mongoose.Schema({
    SERIAL_NO: {
        type: String,
    },
    FILENAME: {
        type: String,
    },
    PROSPECT_NUMBER: {
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
    MOBILE_NUMBER: {
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
    STATE1: {
        type: String,
    },
    FORECLOSURE_AMOUNT: {
        type: String,
    },
    FORCLOSURE_AMOUNT_IN_WORDS: {
        type: String,
    },
    POS: {
        type: String,
    },
    POS_AMOUNT_IN_WORDS: {
        type: String,
    },
    ZONE: {
        type: String,
    },
    NOTICE_TYPE: {
        type: String,
    },
    LOCATION: {
        type: String,
    },
    BM_CODE: {
        type: String,
    },
    BM_NAME: {
        type: String,
    },
    NOTICE_DATE: {
        type: String,
    },
    OLDNOTICE_DATE: {
        type: String,
    },
    DDD: {
        type: String,
    },
    FFF: {
        type: String,
    },
    NOTICE_REFERENCE_NO: {
        type: String,
    },
    BAR_CODE: {
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

// postalAuctionSchema.index({STATE:"text"});
const PostalAuction = mongoose.model('postalAuction', postalAuctionSchema);
PostalAuction.createIndexes();
module.exports = PostalAuction;