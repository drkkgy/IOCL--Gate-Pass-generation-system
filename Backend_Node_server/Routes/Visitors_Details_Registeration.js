//Dependencies
var express = require('express');
var router = express.Router();
var timestamp = require('time-stamp');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,assert = require('assert');

// Routes
router.get('/test', function(req,res,next){
    
    res.send('API working')
});
// Submitting the request for an appointment to the database
try {
router.post('/uploading_request',(req,res,next)=> {
        MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err, db) => {

            try {
                assert.equal(null, err);

            } catch (e) {
                res.json({"status": "404", "message": "Appointment registration failed try again"});
            }
            try {
                console.log("Sucessfuly connected to the mongodb client");
                // Registring the information in the server for the visitor
                db.collection('Booked_Appointment').insertOne({
                    "Name_of_visitor": req.body.Name_of_visitor,
                    "Name_of_the_Host": req.body.Name_of_the_Host,
                    "Visitors_company": req.body.Visitors_company,
                    "Age": req.body.Age,
                    "Visitors_Designation": req.body.Visitors_Designation,
                    "Visitors_Address": req.body.Visitors_Address,
                    "Purpose_Of_Visit": req.body.Purpose_Of_Visit,
                    "Time": timestamp('YYYY/MM/DD'),
                    "Time_Stamp": timestamp('YYYY/MM/DD:mm:ss'),
                    "Attended_Status?": true

                })
                    .then((result) => {
                        res.json({"status": "200", "message": "Visitors details registered successfully"});
                    })
            } catch (e) {

                res.json({"status": "404", "message": "Appointment registration failed try again"});
            }

        });

});

} catch (ERR_HTTP_HEADERS_SENT ) {
    res.json({"status": "404", "message": "Appointment registration failed try again"});
}

module.exports = router