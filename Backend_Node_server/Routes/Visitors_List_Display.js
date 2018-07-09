//Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,assert = require('assert');

// Routes
router.get('/test', function(req,res,next){
    
    return res.send('API working')
});
// Fetching the result to display it at the reception system
router.get('/Visitors_Appointment_Display', (req,res,next)=>{

MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {

    try {
        assert.equal(null,err);
    }catch (e) {
        return res.json({"status":"404","message": "Error Acessing databases try after some time"});
    }

    console.log("Sucessfully connected to the mongodb client");
    // sending the information
 db.collection('Booked_Appointment').find({'Attended_Status?': true}).toArray((err,result)=>{

if(result == null)
  {
      return res.json({"code": 404,"message":"No appointment pending !!"})
  }
     return res.json({"code": 200,result});
});

});

});

//-----Route to retrieve appointments that have been generated

router.get('/Visitors_Appointment_Display/generated', (req,res,next)=>{

    MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {

        try {
            assert.equal(null,err);
        }catch (e) {
            return res.json({"status":"404","message": "Error Acessing databases try after some time"});
        }

        console.log("Sucessfully connected to the mongodb client");
        // sending the information
        db.collection('Booked_Appointment').find({'Attended_Status?': false}).toArray((err,result)=>{

            if(result == null)
            {
                return res.json({"code": 404,"message":"No appointment pending !!"})
            }
            return res.json({"code": 200,result});
        });

    });

});


// Link for Searching the data based on time
router.post('/Search_appointment', (req,res,next)=>{
// fetching details
    MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {
        try {
            assert.equal(null,err);
        }catch (e) {
            return res.json({"code": 404,"message":"cannot access the DB at this time !!"})
        }
        console.log("Sucessfully connected to the mongodb client");
        // sending the information
        db.collection('Booked_Appointment').find({'Time': req.body.Tim , 'Name_of_visitor': req.body.Name_of_visitor , 'Attended_Status?': req.body.Attended_Status }).toArray((err,result)=>{
            if(result == null)
            {
                return res.json({"code": 404,"message":"No Records Found"})
            }
            return res.json({"code": 200,result});
        });
    });
});

module.exports = router