const departmentModel = require("../models/DepartmentModel")

const addDepartment = async(req,res)=>{


    const savedDepartment = await departmentModel.create(req.body)
    res.json({
        message:"department saved..",
        data:savedDepartment
    })
}

module.exports = {
    addDepartment
}