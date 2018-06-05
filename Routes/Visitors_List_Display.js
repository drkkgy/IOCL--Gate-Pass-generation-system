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
app.get('/speed_violation_details/:Car_Number', (req,res,next)=>{

MongoClient.connect('mongodb://ankit:1234567890@ds219879.mlab.com:19879/speed_analysis', (err,db)=> {

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