/*
File name: app.js
Author: Hoang Long Le
StudentID: 301236235
Web app name: Car Listing

*/

let mongoose = require("mongoose");

// create a model class
let Car = mongoose.Schema(
  {
    Carname: String,
    Category: String,
    Carmodel: String,
    Price: Number,
  },
  {
    collection: "cars",
  }
);

module.exports = mongoose.model("Car", Car);
