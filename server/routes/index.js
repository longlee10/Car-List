/*
File name: app.js
Author: Hoang Long Le
StudentID: 301236235
Web app name: Car Listing

*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the game model
let car = require("../models/cars");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    cars: "",
  });
});

module.exports = router;
