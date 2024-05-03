const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
// const upload = multer()
const XLSX = require("xlsx");
const Post = require('../../models/post');

// working..,
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
            const data = XLSX.utils.sheet_to_json(worksheet); // Convert the sheet to JSON

            const post = await Post.create({
                dataType: dataType,
                postData: data,

            })

            // Return the response with the processed data
            return res.status(200).json(post);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error reading the Excel file" });
        }
    });

};


// all data of action
exports.allpost = async (req, res) => {

    
    let user = await Post.find({dataType:'Action'})
    var result= [];

    for (let index = 0; index < user.length; index++) {
       
        const element = user[index];
        for (let newIndex = 0; newIndex < element.postData.length; newIndex++) {
            const newElement = element.postData[newIndex];

            result.push(newElement);
           
            
        }        
    }

    return res.status(200).json(result)

};


//Filter by state

exports.fstate = async (req, res) => {

    
    let user = await Post.find({dataType:'Action'})
    var result= [];

    for (let index = 0; index < user.length; index++) {
       
        const element = user[index];
        for (let newIndex = 0; newIndex < element.postData.length; newIndex++) {
            const newElement = element.postData[newIndex];

            if (newElement.State === "ANDHRA PRADESH") {
                result.push(newElement);
            }
            
        }        
    }

    return res.status(200).json(result)

};


