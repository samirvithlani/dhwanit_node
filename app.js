//3rd party
const express = require("express"); //express require..
//create an object of express application

const app = express();

//http://localhost:3000/test
app.get("/test", (req, res) => {
  console.log("test api callled...");
  res.send("test api called..");
});

const users = [
  {
    id: 1,
    name: "amit",
  },
  {
    id: 2,
    name: "sumit",
  },
];

app.get("/users", (req, res) => {
  res.json({
    message: "users api called...",
    users: users,
  });
});

//:id wild card char
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  //console.log("id = ",id)
  var foundUser = users.find((user) => user.id == id);
  console.log(foundUser);
  if (foundUser) {
    res.json({
      message: "user found",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not found",
      data: null,
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
