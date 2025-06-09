const zod = require("zod")

const userValidationSchema = zod.object({
    name:zod.string().min(3).max(10),
    email:zod.string().email(),
    age:zod.number(),
    gender:zod.string(),
    hobbies:zod.array(zod.string()),
    department:zod.string(),
    password:zod.string()

    

})
module.exports = userValidationSchema;