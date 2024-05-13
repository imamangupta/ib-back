const mongoose = require('mongoose')

const smsAuctionSchema = new mongoose.Schema({
    SR_NO: {
        type: String,
    },
    FILENAME: {
        type: String,
    },
    PROSPECTNO: {
        type: String,
    },
    CUST_NAME: {
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
    STATE1: {
        type: String,
    },
    FORECLOSURE_AMNT: {
        type: String,
    },
    FORCLOSURE_AMNT_IN_WORDS: {
        type: String,
    },
    POS: {
        type: String,
    },
    POS_AMNT_IN_WORDS: {
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
    NOTICE_REF_NO: {
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
const SmsAuction = mongoose.model('smsAuction', smsAuctionSchema);
SmsAuction.createIndexes();
module.exports = SmsAuction;