//3rd party
const express = require("express"); //express require..
const mongoose = require("mongoose"); //mongoose require..
//create an object of express application
const app = express();
app.use(express.json()) //json datatype
const  Redis = require("ioredis")
const {Queue} = require("bullmq")

//redis connection
const redisConnection = new Redis({
  host:"127.0.0.1",
  port:6379
})

//queue
const myQueue = new Queue("taskQueue",{connection:redisConnection})

app.post("/add-job",async(req,res)=>{
  const {name} = req.body;
  await myQueue.add("task",{name},{delay:0})
  res.json({
    message:`job set for ${name}`
  })
})


//http:localhost:3000/users
const userRoutes = require("./routes/UserRoutes");
app.use(userRoutes)

const departmentRoutes = require("./routes/DepartmentRoutes")
app.use("/dept",departmentRoutes)

const uploadRoutes = require("./routes/UploadRoutes")
app.use("/upload",uploadRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/dhwanitapp").then(()=>{
  console.log("connected to db");
}).catch((err)=>{
  console.log("error", err);
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
