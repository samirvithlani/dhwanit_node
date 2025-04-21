const validateSchema = (schema) =>async(req,res,next)=>{
    //parse -- userValdationSchema == zod
    console.log(req.body)

    try{
        await schema.parseAsync(req.body)
        next()

    }catch(err){
        console.log(err)
        res.json({
            message:"error",
            data:err
        })
    }

}
module.exports={
    validateSchema
}