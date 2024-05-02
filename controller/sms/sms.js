const multer = require('multer')
// const upload = multer({ dest: 'tmp/' })
const upload = multer()
const XLSX = require("xlsx");
const Sms = require('../../models/sms');

// working..,
exports.addSms = async (req, res) => {


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
            const data = XLSX.utils.sheet_to_json(worksheet); // Convert the sheet to JSON

            const post = await Sms.create({
                dataType: dataType,
                smsData: data,
             
            })

            // Return the response with the processed data
            return res.status(200).json(post);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error reading the Excel file" });
        }
    });

};

