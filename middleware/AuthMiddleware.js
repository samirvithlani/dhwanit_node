const jwt = require("jsonwebtoken")
const SECRET = "secret"

const validateUser = async(req,res,next)=>{


    var token = req.headers.authorization;
    if(token){

        if(token.startsWith("Bearer ")){

            token = token.split(" ")[1]
            try{
                const user = jwt.verify(token,SECRET)
                next()
            }catch(err){
                
                res.status(401).json({
                    message:"user is not valid..."
                })
            }


        }else{
            res.status(401).json({
                message:"token is not bearer token"
            })
        }

    }else{
        res.status(401).json({
            message:"unauthorized... token is required"
        })
    }



}
module.exports= validateUser