const PostalAuction = require('../../models/postalAuction');
const PostalDeficit = require('../../models/postalDeficit');
const PostalRefund = require('../../models/postalRefund');

exports.allData = async (req, res) => {


    const { selectedMonth, state, city, filename, skip, limit } = req.query;

    let skipNum = parseInt(skip);
    let limitNum = parseInt(limit);

    try {

        if (!skip || !limit) {
            return res.status(200).json({ error:"undefined skip & limit" })
        }


        let query = {};

        if (selectedMonth) {

            const firstThreeLetters = selectedMonth.slice(0, 3);
            const regexMonth = new RegExp(firstThreeLetters, 'i');
            query.NOTICE_DATE = { $regex: regexMonth };
        }

        if (state) {
            const regexState = new RegExp(state, 'i');
            query.STATE = { $regex: regexState };
        }

        if (filename) {
            const regexFilename = new RegExp(filename, 'i');
            query.FILENAME = { $regex: regexFilename };
        }

        if (city) {
            const regexCity = new RegExp(city, 'i');
            query.CITY = { $regex: regexCity };
        }

        let count1 = await PostalAuction.countDocuments(query)
        let count2 = await PostalDeficit.countDocuments(query)
        let count3 = await PostalRefund.countDocuments(query)
        

        if (skipNum < count1) {

            let data = await PostalAuction.find(query).skip(skipNum).limit(limitNum);
            let count = count1+count2+count3;

            return res.status(200).json({ count, data })
            
        }else if(skipNum - count1 < count2){

            let data = await PostalDeficit.find(query).skip(skipNum - count1).limit(limitNum);
            let count = count1+count2+count3;

            return res.status(200).json({ count, data })

        }else{

            let data = await PostalRefund.find(query).skip((skipNum - count1) - count2).limit(limitNum);
            let count = count1+count2+count3;

            return res.status(200).json({ count, data })

        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some thing went worng..." });
    }
}
