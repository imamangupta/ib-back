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
        const { dataType } = req.body;
        console.log(dataType);

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
                'STATE1',
                'MOBILE_NO',
                'FORECLOSURE_AMNT',
                'FORCLOSURE_AMNT_IN_WORDS',
                'POS',
                'POS_AMNT_IN_WORDS',
                'STATE',
                'ZONE',
                'NOTICE_TYPE',
                'LOCATION',
                'NAME',
                'BM_CODE',
                'BM_NAME',
                'CUID',
                'NOTICE_DATE',
                'OLDNOTICE_DATE',
                'DDD',
                'FFF',
                'NOTICE_REF_NO',
                'BAR_CODE',
                'NOTICE_URL',
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

                // const post = await PostalAuction.create({rowData});


                // const post = await PostalAuction.create({
                //     SR_NO: rowData.SR_NO,
                //     FILENAME: rowData.FILENAME,
                //     PROSPECTNO: rowData.PROSPECTNO,
                //     CUST_NAME: rowData.CUST_NAME,
                //     ADD1: rowData.ADD1,
                //     ADD2: rowData.ADD2,
                //     ADD3: rowData.ADD3,
                //     LANDMARK: rowData.LANDMARK,
                //     PINCODE: rowData.PINCODE,
                //     CITY: rowData.CITY,
                //     STATE1: rowData.STATE1,
                //     MOBILE_NO: rowData.MOBILE_NO,
                //     FORECLOSURE_AMNT: rowData.FORECLOSURE_AMNT,
                //     FORCLOSURE_AMNT_IN_WORDS: rowData.FORCLOSURE_AMNT_IN_WORDS,
                //     POS: rowData.POS,
                //     POS_AMNT_IN_WORDS: rowData.POS_AMNT_IN_WORDS,
                //     STATE: rowData.STATE,
                //     ZONE: rowData.ZONE,
                //     NOTICE_TYPE: rowData.NOTICE_TYPE,
                //     LOCATION: rowData.LOCATION,
                //     NAME: rowData.NAME,
                //     BM_CODE: rowData.BM_CODE,
                //     BM_NAME: rowData.BM_NAME,
                //     CUID: rowData.CUID,
                //     NOTICE_DATE: rowData.NOTICE_DATE,
                //     OLDNOTICE_DATE: rowData.OLDNOTICE_DATE,
                //     DDD: rowData.DDD,
                //     FFF: rowData.FFF,
                //     NOTICE_REF_NO: rowData.NOTICE_REF_NO,
                //     BAR_CODE: rowData.BAR_CODE,
                //     NOTICE_URL: rowData.NOTICE_URL
            
                // })




                result.push(rowData);
            }

            const post = await PostalAuction.insertMany(result)
                






            return res.status(200).json({ message: "Success"});

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error reading the Excel file" });
        }
    });

};
