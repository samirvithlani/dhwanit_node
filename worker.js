//coordinator
const {Worker} = require("bullmq")
const  Redis = require("ioredis")
//redis connection
const redisConnection = new Redis({
  host:"127.0.0.1",
  port:6379,
  maxRetriesPerRequest:null
})
const worker = new Worker(
    "taskQueue",
    async(job)=>{
        console.log(`started job for ${job.data.name}`)
        //job perform..time
        //delay visulise promise..
        await new Promise((resolve,reject)=>setTimeout(resolve,10000))
        console.log(`job done for ${job.data.name}`)
    },
    {connection:redisConnection}
)
