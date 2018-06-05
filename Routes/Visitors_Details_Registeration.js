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
router.post('/uploading_request',(req,res,next)=> {

	MongoClient.connect('mongodb://anki:1234567890@ds012198.mlab.com:12198/user_personal_details',(err,db)=>{
     
    assert.equal(null,err);
    console.log("Sucessfuly connected to the mongodb client");
    // Registring the information in the server for the visitor
    db.collection('-->collection name<--').insertOne({
    	"Name_of_visitor": req.body.Name_of_visitor,
    	"Name_of_the_Host": req.body.Name_of_the_Host,
    	"Visitors_company": req.body.Visitors_company,
    	"Age": req.body.Age,
    	"Visitors_Designation": req.body.Visitors_Designation,
    	"Visitors_Address": req.body.Visitors_Address,
    	"Purpose_Of_Visit": req.body.Purpose_Of_Visit,
    	"Time-Stamp": timestamp('YYYY/MM/DD:mm:ss'),
    	"Attended_Status?": true

    })
    .then((result)=>{
    	res.json({"status":"200","message": "Visitors details registered sucessfully"});
    })
	});

});

module.exports = router