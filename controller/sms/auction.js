const multer = require('multer')
const upload = multer({ dest: '/tmp' })
const XLSX = require("xlsx");
const SmsAuction = require('../../models/smsAuction');



// working...
exports.addPost = async (req, res) => {


    upload.single("excelFile")(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error uploading the file" });
        }

        const { path: filePath } = req.file;
        const { dataType } = req.body;
        console.log(dataType);

        try {
           
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0]; 
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); 

            const result = [];
          
            const columnNames = [
                'SR_NO',
                'FILENAME',
                'PROSPECTNO',
                'CUST_NAME',
                'ADD1',
                'ADD2',
                'ADD3',
                'LANDMARK',
                'PINCODE',
                'CITY',
                'MOBILE_NO',
                'NAME',
                'CUID',
                'STATE',
                'STATE1',
                'FORECLOSURE_AMNT',
                'FORCLOSURE_AMNT_IN_WORDS',
                'POS',
                'POS_AMNT_IN_WORDS',
                'ZONE',
                'NOTICE_TYPE',
                'LOCATION',
                'BM_CODE',
                'BM_NAME',
                'NOTICE_DATE',
                'OLDNOTICE_DATE',
                'DDD',
                'FFF',
                'NOTICE_REF_NO',
                'BAR_CODE',
                'NOTICE_URL',
            ];

            
            for (let i = 1; i < data.length; i++) {
                const rowData = {};

                for (let j = 0; j < columnNames.length; j++) {
                    const columnName = columnNames[j];
                    const cellValue = data[i][j];
                    rowData[columnName] = cellValue;
                }

                result.push(rowData);
            }

            const post = await SmsAuction.insertMany(result)

            return res.status(200).json({ message: "Success" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error reading the Excel file" });
        }
    });

};



exports.fAll = async (req, res) => {
    const { selectedMonth, state, city, skip, limit } = req.query;

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
            query.STATE = { $regex: state };
        }

        if (city) {
            query.CITY = { $regex: city };
        }

        let count = await SmsAuction.countDocuments(query)
        let data = await SmsAuction.find(query).skip(skipNum).limit(limitNum);
        return res.status(200).json({ count, data })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some thing went worng..." });
    }



}





