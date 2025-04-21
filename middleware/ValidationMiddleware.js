const validate = (req,res,next)=>{


    if(req.body.name !=undefined){
        next()
    }
    else{
        res.json({
            message:"name is required*"
        })
    }


}
module.exports = {
    validate
}