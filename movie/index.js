const express = require("express");
const connected = require("./config/db");
const router = require("./routes/user.route");

const app = express()

app.use(express.json())
app.use(router)


app.listen(8090,()=>{
    console.log("connected on 8090");
    connected()
})