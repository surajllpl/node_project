const mongoose = require("mongoose");
// import mongoose library for MangoDB and Nodejs

const productSchema = mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId : String,
    company : String

});
//  data structure in MangoDB of mangoose schema for products

module.exports = mongoose.model("products",productSchema);

// adding mongoose model in application for use  magoDB collection of products schema
