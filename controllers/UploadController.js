const multer = require("multer")
const path = require("path")
const cloudinaryUpload = require("../utils/cloudinary")

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

    upload(req,res,async(err)=>{
        if(err){
            res.json({
                message:"Error in file upload",
                error:err
            })
        }
        else{
            //file upl;oad folder..
            const cloundinaryResponse = await cloudinaryUpload.uploadImage(req.file.path)
            console.log(cloundinaryResponse)
            res.json({
                message:"File uploaded successfully",
                file:req.file,
                cloundinaryResponse
            })
        }
    })
}
module.exports ={
    uploadFile
}