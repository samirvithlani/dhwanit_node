//3rd party
const express = require("express"); //express require..
const mongoose = require("mongoose"); //mongoose require..
//create an object of express application
const app = express();
app.use(express.json()); //json datatype
const Redis = require("ioredis");
const { Queue } = require("bullmq");

//redis connection
const redisConnection = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

//queue
const myQueue = new Queue("taskQueue", { connection: redisConnection });

app.post("/add-job", async (req, res) => {
  const { name } = req.body;
  await myQueue.add("task", { name }, { delay: 0 });
  res.json({
    message: `job set for ${name}`,
  });
});

//query costly...
const fakeData = {
  1: { name: "amit", age: 23 },
  2: { name: "raj", age: 24 },
  3: { name: "jay", age: 25 },
  4: { name: "kunal", age: 24 },
};

const cacheMiddleware = async (req, res, next) => {
  const { id } = req.params; //1
  try {
    const cacheData = await redisConnection.get(id); //1 not found..
    if (cacheData) {
      console.log("cache hit");
      res.json({
        data: JSON.parse(cacheData),
      });
    }
    else{
      console.log("cache miss")
      next()
    }
  } catch (err) {}
};

app.get("/fakeData/:id", cacheMiddleware,async (req, res) => {
  const id = req.params.id; //1
  const foundData = fakeData[id]; // --{}
  //data cache memory..
  redisConnection.setex(id, 6000, JSON.stringify(foundData)); //{1,foundObject}
  res.json({
    data: foundData,
  });
});

//http:localhost:3000/users
const userRoutes = require("./routes/UserRoutes");
app.use(userRoutes);

const departmentRoutes = require("./routes/DepartmentRoutes");
app.use("/dept", departmentRoutes);

const uploadRoutes = require("./routes/UploadRoutes");
app.use("/upload", uploadRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/dhwanitapp")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error", err);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
