const jwt = require("jsonwebtoken")
const SECRET = "secret"

const generateToken = (user)=>{

    const token = jwt.sign(user,SECRET,{
        expiresIn:60
    })
    return token;

}

module.exports = {
    generateToken
}