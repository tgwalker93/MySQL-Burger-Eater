var express = require("express");
var models = require('../models');


var sequelize = require("../config/connection.js");
var router = express.Router();

// var burger = require('../models/burger.js');
var Burger = models.Burger

console.log(Burger);
// var User = require('../models/burger')(sequelize, DataTypes);


router.get("/", function(req, res) {
  console.log("Im in the / route get .............. -----------------")
  // burger.all(function(data) {
    Burger.findAll({}).then(function(results) {
      console.log("BELOW IS RESULTS")
      console.log(results)
      // results are available to us inside the .then
      // res.json(results);
      burgers = {
        burgers: results
      }
      res.render("index", burgers);
    });
  // burger.all(function (data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });

    
  // });
});

router.post("/", function(req, res) {

  Burger.create({  
    burger_name: req.body.name,
    devoured: req.body.devoured
  }), function() {
    res.redirect("/");
  }
  // .then(function(results) {
  //   res.render("index", results);
  // }).catch(function(err){
  //   res.send(err)
  // })
  });



//to switch between devoured and not devoured
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  Burger.update({
    devoured: req.body.devoured
  }, {
    where: {
      id: req.params.id
    }
  }, condition,function() {
    res.redirect("/");
  });
  // Burger.update({
  //   devoured: req.body.devoured
  // }, {where: condition}, function () {
  //     res.redirect("/");
  //   });

  // Burger.update({
  //   devoured: req.body.devoured
  // },condition, function () {
  //     res.redirect("/");
  //   });
});


//To delete 
// router.destroy("/:id", function (req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   // burger.update({
//   //   devoured: req.body.devoured
//   // }, condition, function() {
//   res.redirect("/");
//   // });
// });


// Export routes for server.js to use.
module.exports = router;

