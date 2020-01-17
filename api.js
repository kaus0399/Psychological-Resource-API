const express = require('express');
const router = express.Router();
const Psychres = require('../models/Psychres')

// get a list of psychological resources form the database
// get a list of ninjas from the db
router.get('/Psychres', function(req, res, next){
    // Ninja.find({}).then(function(ninjas){
    //  res.send(ninjas);
    // });
    Psychres.aggregate().near({ 
     near: 
     {
      'type': 'Point',
       'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)] }, 
       maxDistance: 250, 
       spherical: true, 
       distanceField: "dis" 
      }
      ).then(function(psychres){
      res.send(psychres);
       });
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