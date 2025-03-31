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

module.exports = {
  getUsers,
};
