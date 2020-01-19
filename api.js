const express = require('express');
const router = express.Router();
const Psychres = require('../models/Psychres')

// get a list of psychological resources form the database

router.get("/psychres", function(req, res, next) {
    Psychres.aggregate()
      .near({
        near: {
          type: "point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        distanceField: "dist.calculated",
        maxDistance: 100000,
        spherical: true
      })
      .then(function(psychres) {
        res.send(psychres);
      })
      .catch(next);
  });

//add a new psychological reosurce to the database
router.post('/Psychres',function(req,res,next){
    Psychres.create(req.body).then(function(psychres){
        res.send(psychres);
    }).catch(next);
})

//update a new psychological reosurce to the database
router.put('/Psychres/:id',function(req,res,next){
    Psychres.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Psychres.findOne({_id: req.params.id}).then(function(psychres){
            res.send(psychres);
        });
    }).catch(next);
});

//delete a psychological reosurce from the database
router.delete('/Psychres/:id',function(req,res,next){
    Psychres.findByIdAndRemove({_id: req.params.id}).then(function(psychres){
        res.send(psychres);
    }).catch(next);
})


 
module.exports = router; 
