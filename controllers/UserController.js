//api function...
const userModel = require("../models/UserModel");

const getUsers = async (req, res) => {
  //datbase record fetch
  //db.users.find()

  const users = await userModel.find();

  res.json({
    message: "users api called...",
    data: users,
  });
};

const addUser = async (req, res) => {
  //frontend data -->
  //request --> data -->requestion object
  //req.body , req.params,req.query,req.headers
  //req.body --> object
  //parasm --> url
  //query ->?
  //header authent
  //console.log(req.body)
  const savedUser = await userModel.create(req.body);
  res.json({
    message: "user saved successfully",
    data: savedUser,
  });
};
const deleteUser = async (req, res) => {
  //db.users.remove({_id:"id"]})
  const id = req.params.id;
  //mongoose
  const deletedUser = await userModel.findByIdAndDelete(id);
  if (deletedUser != null) {
    res.json({
      message: "user deleted successfully",
      data: deletedUser,
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
};

const getUserByGender = async (req, res) => {

  const gender = req.query.gender;
  const age = req.query.age;
  const page = req.query.page;
  const sort = req.query.sort;
  
  //const foundUsers = await userModel.find({gender:gender,age:{$gt:age}}).sort({age:-1}).limit(page)
  const foundUsers = await userModel.find({gender:gender,age:{$gt:age}}).sort({age:sort == "asc"?1:-1}).limit(page)
  if(foundUsers.length>0){
    res.json({
      message: "users found",
      data: foundUsers,
    });
  }
  else{
    res.json({
      message: "user not found",
    });
  }

}

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  getUserByGender
};
