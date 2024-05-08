const multer = require('multer')
const upload = multer({ dest: '/tmp' })
const XLSX = require("xlsx");
const Sms = require('../../models/sms');

// Add sms data by datatype
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
      
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0]; 
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet); 

            const post = await Sms.create({
                dataType: dataType,
                smsData: data,
             
            })

            return res.status(200).json({ message: "Success", post });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error reading the Excel file" });
        }
    });

};



// All data according to the datatype
exports.typeSms = async (req, res) => {

    const { dataType } = req.query;

    let user = await Sms.find({ dataType: dataType })
    var result = [];

    for (let index = 0; index < user.length; index++) {

        const element = user[index];
        for (let newIndex = 0; newIndex < element.smsData.length; newIndex++) {
            const newElement = element.smsData[newIndex];

            result.push(newElement);

        }
    }

    return res.status(200).json(result)
};



//Filter by state according to the datatype
exports.fstate = async (req, res) => {

    const { dataType, state } = req.query;

    let user = await Sms.find({ dataType: dataType })
    var result = [];

    for (let index = 0; index < user.length; index++) {

        const element = user[index];
        for (let newIndex = 0; newIndex < element.smsData.length; newIndex++) {
            const newElement = element.smsData[newIndex];

            if (newElement.State === state) {
                result.push(newElement);
            }

        }
    }

    return res.status(200).json(result)
};



//Filter by mounth according to the datatype
exports.fmonth = async (req, res) => {

    const { dataType, myMonth } = req.query;

    let user = await Sms.find({dataType: dataType})
    var result= [];

    for (let index = 0; index < user.length; index++) {

        const element = user[index];
        for (let newIndex = 0; newIndex < element.smsData.length; newIndex++) {
            const newElement = element.smsData[newIndex];

            const dateStr = newElement.Notice_Date;
            const [day, month, year] = dateStr.split('-');
            const dateObj = new Date(`${month} ${day}, ${year}`);
            const monthName = dateObj.toLocaleString('default', { month: 'long' });


            if (monthName === myMonth) {
                result.push(newElement);
            }

        }        
    }

    return res.status(200).json(result)
};


exports.fAll = async (req, res) => {


    try {
        

    const { type, selectedMonth, state } = req.query;
    let mymonth = selectedMonth

    var result = [];

    if (type) {
        var user = await Sms.find({ dataType: type })
    } else {
        var user = await Sms.find({})
    }


    for (let index = 0; index < user.length; index++) {

        const element = user[index];
        for (let newIndex = 0; newIndex < element.smsData.length; newIndex++) {
            const newElement = element.smsData[newIndex];


    

            if (mymonth) {

                const dateStr = newElement.Notice_Date;
                const [day, month, year] = dateStr.split('-');
                const dateObj = new Date(`${month} ${day}, ${year}`);
                const monthName = dateObj.toLocaleString('default', { month: 'long' });
    

                if (state) {

                    if (monthName === mymonth && newElement.State === state.toUpperCase()) {
                        result.push(newElement);
                    }


                    
                }else{
                    if (monthName === mymonth) {
                        result.push(newElement);
                    }

                }

             

            } else {

                if (state) {

                    if (newElement.State === state.toUpperCase()) {
                        result.push(newElement);
                    }
                } else {

                    result.push(newElement);

                }

            }




        }
    }


  











    return res.status(200).json(result)


} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error to find Data." });
}

};


