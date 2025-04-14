const router = require("express").Router()
const departmentController = require("../controllers/DepartmentController")
router.post("/create",departmentController.addDepartment)
module.exports = router