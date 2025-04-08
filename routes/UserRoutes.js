//app --> controller --> bridge
const router = require("express").Router();
const userController = require("../controllers/UserController")
// router.get("/users",(req,res)=>{

// })

router.get("/users",userController.getUsers)
router.post("/user",userController.addUser)
router.delete("/user/:id",userController.deleteUser)
router.get("/finduserbygender",userController.getUserByGender)
router.put("/updateuser/:id",userController.updateUserById)
router.put("/addhobby/:id",userController.addHobbieToexistinguser)
module.exports = router;