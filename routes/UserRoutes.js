//app --> controller --> bridge
const router = require("express").Router();
const userController = require("../controllers/UserController")
const validationMiddleware = require("../middleware/ValidationMiddleware")
const zodvalidationMiddleware = require("../middleware/ZodValidationMiddleware")
const userValidationSchema = require("../validationModel/UserValidationSchema")
const validateUser = require("../middleware/AuthMiddleware")

// router.get("/users",(req,res)=>{

// })

router.get("/users",validateUser,userController.getUsers)

//router.post("/user",validationMiddleware.validate,userController.addUser)
router.post("/user",zodvalidationMiddleware.validateSchema(userValidationSchema),userController.addUser)
router.delete("/user/:id",userController.deleteUser)
router.get("/finduserbygender",userController.getUserByGender)
router.put("/updateuser/:id",userController.updateUserById)
router.put("/addhobby/:id",userController.addHobbieToexistinguser)
router.post("/loginuser",userController.userLogin)
module.exports = router;