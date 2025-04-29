const multer = require("multer")
const path = require("path")

///storage d
const storage = multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:storage,
}).single("file")
//any, array

const uploadFile=async(req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            res.json({
                message:"Error in file upload",
                error:err
            })
        }
        else{
            res.json({
                message:"File uploaded successfully",
                file:req.file,
            })
        }
    })
}
module.exports ={
    uploadFile
}