//userModel --> users collection bind -->db dhwanitapp
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
    //fileds.. post...
})
module.exports = mongoose.model("users", userModel);

//db.users.find
//userModel.find