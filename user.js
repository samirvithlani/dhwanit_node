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
  