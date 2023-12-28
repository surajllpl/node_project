const mongoose = require("mongoose"); 
// import mongoose library for MangoDB and Nodejs
 
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password : String
});
//  data structure in MangoDB of mangoose schema for user
module.exports = mongoose.model("users",userSchema);
// adding mongoose model in application for use  magoDB collection of user schema