var express = require("express");
var models = require('../models');


var sequelize = require("../config/connection.js");
var router = express.Router();

var Burger = models.Burger




router.get("/", function(req, res) {
    Burger.findAll({}).then(function(results) {
      console.log("BELOW IS RESULTS")
      console.log(results)
      burgers = {
        burgers: results
      }
      res.render("index", burgers);
    });
});

router.post("/", function(req, res) {

  Burger.create({  
    burger_name: req.body.name,
    devoured: req.body.devoured
  }).then(function (dbPost) {
    res.redirect("/");
  });
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
    })
    .then(function () {
      res.redirect("/");
    });
});


//To delete 
router.delete("/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  Burger.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (dbPost) {
      res.redirect("/");
    });
});


// Export routes for server.js to use.
module.exports = router;

