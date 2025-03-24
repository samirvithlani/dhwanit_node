console.log("user file loaded..")
var userName = "amit"
var userage = 20


const getUserData = (flag)=>{
    console.log("get user data called....",flag)
}

module.exports = {
    userName,userage,getUserData
}
// module.exports = userName
// module.exports = userage