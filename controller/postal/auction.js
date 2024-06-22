const multer = require('multer')
const upload = multer({ dest: '/tmp' })
const XLSX = require("xlsx");
const PostalAuction = require('../../models/postalAuction');



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

            const result = [];
            
            const columnNames = [
                'FILENAME',
                'NOTICE_URL',
                'TRACKING_URL',
                'BARCODE',
                'STATUS',
                'CUSTOMER_NAME',
                'MOBILE_NUMBER',
                'DATE',
                'STATE',
                'CITY'
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

            const post = await PostalAuction.insertMany(result)

            return res.status(200).json({ message: "Success" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error reading the Excel file" });
        }
    });

};



exports.fAll = async (req, res) => {


    const { selectedMonth, state, city,filename, skip, limit } = req.query;

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
            query.DATE = { $regex: regexMonth };
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

        let count = await PostalAuction.countDocuments(query)
        let data = await PostalAuction.find(query).skip(skipNum).limit(limitNum).select('-date -CITY -STATE -DATE -__v -_id');
        return res.status(200).json({ count, data })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some thing went worng..." });
    }

}
