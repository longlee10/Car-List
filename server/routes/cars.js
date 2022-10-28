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

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
router.get("/cars", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/cars/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render('cars/add',{
    title: "Add Cars"
  });
});

// POST process the Car  Details page and create a new Car  - CREATE
router.post("/cars/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // instantiate the car model
  let newCar = car({
    Carmodel : req.body.Carmodel,
    Carname: req.body.Carname,
    Category : req.body.Category,
    Price: req.body.Price
  });

  // pass to create method
  car.create(newCar, (err, car)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/cars');
    }
  })

});

// GET the Car Details page in order to edit an existing Car
router.get('/cars/:id', (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;

   car.findById(id, (err, carToEdit) => {
       if(err)
       {
           console.log(err);
           //res.end(err);
       }
       else
       {
           //show the edit view
           res.render('cars/details', {title: "Edit car", car: carToEdit})
       }
   });
});

// POST - process the information passed from the details form and update the document
router.post("/cars/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id
   let updatedCar = car({
       "_id": id,
       "Carname": req.body.Carname,
       "Category": req.body.Category,
       "Carmodel": req.body.Carmodel,
       "Price": req.body.Price,
   });
   car.updateOne({_id: id}, updatedCar, (err) => {
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
           // refresh the cars list
           res.redirect('/cars');
       }
   });
});

// GET - process the delete
router.get('/delete', (req, res, next)=>{
  res.render('cars/delete', {
    title:"Delete Cars"
  });
})

router.post("/delete", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // let id = req.params.id;
   let carName = req.body.Carname;
   let upper = req.body.upper;
   let lower = req.body.lower;

   car.remove({$or:[{Carname: carName},{Price:{$gte:lower}},{Price:{$lte:upper}}]}/*,,*/, (err)=>{
     if(err){
       console.log(err);
       res.end(err);
     }
     else{
       res.redirect('/cars');
     }
   })
   //res.send("deleted")
});

module.exports = router;
