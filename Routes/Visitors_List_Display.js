//Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,assert = require('assert');

// Routes
router.get('/test', function(req,res,next){
    
    res.send('API working')
});
// Fetching the result to display it at the reception system
router.get('/Visitors_Appointment_Display/', (req,res,next)=>{

MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {

    assert.equal(null,err);
    console.log("Sucessfully connected to the mongodb client");
    // sending the information
 db.collection('-->collection name<--').find({Attended_Status: true}).toArray((err,result)=>{

if(result == null)
  {
    res.json({"code": 404,"message":"No appointment pending !!"})
  }
  res.json({"code": 200,result});
});

    
});

});

module.exports = router