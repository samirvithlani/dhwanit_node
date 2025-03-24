//3rd party
const express = require("express")//express require..
//create an object of express application

const app = express()

//http://localhost:3000/test
app.get("/test",(req,res)=>{
    console.log("test api callled...")
    res.send("test api called..")
})

const PORT = 3000;

app.listen(PORT,()=>{
    console.log("server started on port" ,PORT)
})


