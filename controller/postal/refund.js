const multer = require('multer')
const upload = multer({ dest: '/tmp' })
const XLSX = require("xlsx");
const postalRefund = require('../../models/postalRefund');



// working...
exports.addPost = async (req, res) => {


    upload.single("excelFile")(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error uploading the file" });
        }

        const { path: filePath } = req.file;


        try {
            // Read the Excel file using your preferred library
            // For example, you can use 'xlsx' library like this:
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert the sheet to JSON

            // Process the data and perform necessary operations
            const result = [];
            // Extract column names from the first row
            const columnNames = [
                'SERIAL_NO',
                'FILENAME',
                'CUSTOMER_NAME',
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
                'GL_IDS',
                'REFUND_AMOUNT',
                'REFUND_AMOUNT_IN_WORDS',
                'FORECLOSURE_AMOUNT',
                'AUCTION_PROCEEDS',
                'LREGION_CODE',
                'SUTRACODE',
                'BRANCH',
                'LOCATION',
                'MONTH',
                'NOTICE_DATE',
                'OLD_NOTICE_DATE',
                'DDD',
                'EEE',
                'NOTICE_REFERENCE_NUMBER',
                'BARCODE',
                'NOTICE_URL'

            ];
            // Iterate over each row (excluding the first row)
            for (let i = 1; i < data.length; i++) {
                const rowData = {};

                // Iterate over each column
                for (let j = 0; j < columnNames.length; j++) {
                    const columnName = columnNames[j];
                    const cellValue = data[i][j];
                    rowData[columnName] = cellValue;
                }

                result.push(rowData);
            }

            const post = await postalRefund.insertMany(result)

            return res.status(200).json({ message: "Success" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error reading the Excel file" });
        }
    });

};



exports.fAll = async (req, res) => {


    const {filename, selectedMonth, state, city, skip, limit } = req.query;

    let skipNum = parseInt(skip);
    let limitNum = parseInt(limit);

    // let stateName = state.toUpperCase();
    // let cityName = city.toUpperCase();

    // const firstThreeLetters = selectedMonth.slice(0, 3);
    // const regexMonth = new RegExp(firstThreeLetters, 'i');


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
            // let stateName = city.toUpperCase();
            // query.CITY = stateName;
        }


        let count = await postalRefund.countDocuments(query)
        let data = await postalRefund.find(query).skip(skipNum).limit(limitNum);

        return res.status(200).json({ count, data })





    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some thing went worng..." });
    }



}





