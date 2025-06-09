//api function...
const userModel = require("../models/UserModel");
const sendMail = require("../utils/MailUtil");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  //datbase record fetch
  //db.users.find()

  const users = await userModel.find().populate("department");

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

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt); //encrypted

  req.body.password = hashedPassword;

  const savedUser = await userModel.create(req.body);
  //mail...
  sendMail(savedUser.email, "Welcome Mail", "Welcome to portal");
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
  const foundUsers = await userModel
    .find({ gender: gender, age: { $gt: age } })
    .sort({ age: sort == "asc" ? 1 : -1 })
    .limit(page);
  if (foundUsers.length > 0) {
    res.json({
      message: "users found",
      data: foundUsers,
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
};

const updateUserById = async (req, res) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (updatedUser) {
    res.json({
      message: "user update successfully..",
      data: updatedUser,
    });
  } else {
    res.json({
      message: "user not updated",
    });
  }
};

const addHobbieToexistinguser = async (req, res) => {
  //id --> req.params
  //hobby --->req.body

  const updateUser = await userModel.findByIdAndUpdate(
    req.params.id,
    { $push: { hobbies: req.body.hobby } },
    { new: true }
  );
  if (updateUser) {
    res.json({
      message: "user update successfully..",
      data: updateUser,
    });
  } else {
    res.json({
      message: "user not updated",
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  //abc@gmail
  const userFromEmail = await userModel.findOne({ email: email }); //object --> encrypedPassword
  if (userFromEmail) {
    //plian password enc pass compare
    const isMatch = bcrypt.compareSync(password, userFromEmail.password); //true
    if (isMatch) {
      res.json({
        message: "login success",
        data: userFromEmail,
      });
    } else {
      res.status(401).json({
        message: "invalid cred...",
      });
    }
  } else {
    res.status(404).json({
      message: "user not exist..",
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  getUserByGender,
  updateUserById,
  addHobbieToexistinguser,
  userLogin
};
