const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://maryam:Maryam%4012345@cluster0.iaviyin.mongodb.net/myDatabase")
.then(()=>{
    console.log("Mongo Db Connected")
})
.catch((error)=>{
    console.log("Mongo Db not connected")
})
module.exports = db;