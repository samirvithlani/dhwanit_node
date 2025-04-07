//app --> controller --> bridge
const router = require("express").Router();
const userController = require("../controllers/UserController")
// router.get("/users",(req,res)=>{

// })

router.get("/users",userController.getUsers)
router.post("/user",userController.addUser)
router.delete("/user/:id",userController.deleteUser)
module.exports = router;