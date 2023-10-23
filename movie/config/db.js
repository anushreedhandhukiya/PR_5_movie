const {config}= require("dotenv")
const mongoose = require("mongoose")
require("dotenv").config()
console.log(process.env.DB_URL);

const connected =async()=>{
    await mongoose.connect(process.env.DB_URL)
}

module.exports=connected