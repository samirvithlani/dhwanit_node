//userModel --> users collection bind -->db dhwanitapp
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
    //fileds.. post...
    name:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    hobbies:[
        {
            type:String
        }
    ],
    password:{
        type:String
    },
    department:{
        type:Schema.Types.ObjectId,
        ref:"department"
    }
})
module.exports = mongoose.model("users", userModel);

//db.users.find
//userModel.find