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
router.get('/Visitors_Appointment_Display', (req,res,next)=>{

MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {

    try {
        assert.equal(null,err);
    }catch (e) {
        res.json({"status":"404","message": "Error Acessing databases try after some time"});
    }

    console.log("Sucessfully connected to the mongodb client");
    // sending the information
 db.collection('Booked_Appointment').find({'Attended_Status?': true}).toArray((err,result)=>{

if(result == null)
  {
    res.json({"code": 404,"message":"No appointment pending !!"})
  }
  res.json({"code": 200,result});
});
// Catch block to detect any error and prevent the system from crashing

});

});

// Link for Searching the data based on time
router.post('/Search_appointment', (req,res,next)=>{
// fetching details
    MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {
        try {
            assert.equal(null,err);
        }catch (e) {
            res.json({"code": 404,"message":"cannot access the DB at this time !!"})
        }
        console.log("Sucessfully connected to the mongodb client");
        // sending the information
        db.collection('Booked_Appointment').find({'Time': req.body.Tim}).toArray((err,result)=>{
            if(result == null)
            {
                res.json({"code": 404,"message":"No Records Found"})
            }
            res.json({"code": 200,result});
        });
    });
});

module.exports = router