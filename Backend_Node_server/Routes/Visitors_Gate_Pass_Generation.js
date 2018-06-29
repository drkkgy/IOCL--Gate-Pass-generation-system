//Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var fs = require('fs');

// Creating local storage 


if (typeof localStorage === "undefined" || localStorage === null) {
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
}

//Creating storage object 
 const storage = require('multer-gridfs-storage') ({

 	url: 'mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking',
 	file: (req,file) => {
      if(file.mimetyoe === 'image/jpeg')  {
      	return {
        bucketName: 'file_' + Date.now()
      	};
      } else {
      	return null;
      }
 	}

 });



// Routes
router.get('/test', function(req,res,next){
    
    res.send('API working')
});
// Fetching the details from the database for the form
router.post('/Gate_Pass_Generation_Engine', (req,res,next)=>{
// fetching details
MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {

    assert.equal(null,err);
    console.log("Sucessfully connected to the mongodb client");
    // sending the information
 db.collection('Booked_Appointment').findOne({'Time_Stamp': req.body.Time_Stamp},(err,result)=>{ //'Time_tamp': req.params.Time_Stamp

if(result == null)
  {
    res.json({"code": 404,"message":"No appointment at this point in time"})
  }
  res.json({"code": 200,result});
  });
});
});

// marking the appointments false after generation

router.post('/Gate_Pass_Generation_Engine/Mark_after_Generation' , (req,res,next)=>{


    // Checking if the record exist or not

    MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {

        try {
            assert.equal(null,err);
        } catch (e) {
            res.json({"status":"404","message": "Error Acessing databases try after some time"});
        }

    console.log("Sucessfully connected to the mongodb client");
    // sending the information
  db.collection('Booked_Appointment').findOne({"Time_Stamp": req.body.Time_Stamp}
  
)
.then(function(result) {
	console.log(result)
  if(result == null)
  {
  	res.json({"status": 404 , "message": "Apointment not found"});
  }
  
}) 
});
    function pause(){
MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {

    try {
        assert.equal(null,err);

    } catch (e) {
        res.json({"status":"404","message": "Error Acessing databases try after some time"});
    }
    console.log("Sucessfully connected to the mongodb client");
   
    // updating info
    db.collection('Booked_Appointment').update(
   {'Time_Stamp': req.body.Time_Stamp },
   {
     $set: {
       'Attended_Status?': false
     },
   }
   ).then((result1)=>{
    res.json({"status": 200, "message": "Appointment marked sucessfully"});
 })
 });
}
setTimeout(pause, 1000);
});

// image download to be displayed on the pass
router.post('/download',(req,res,next) =>{
var nPromise = new Promise(function(resolve,err){


var Grid = require('gridfs-stream');
var mongoose = require("mongoose");
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

mongoose.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking');
  var conn = mongoose.connection;
  var path = require('path');
  var fs = require('fs');



gfs.files.find({ "filename": req.body.Visitors_Name + req.body.Time_stamp}).toArray(function (err, files) { //<------------------check------------]

    if(files.length===0){
        return res.status(400).send({
            message: 'File not found'
        });
    }

    res.writeHead(200, {'Content-Type': files[0].contentType});

    var readstream = gfs.createReadStream({
          filename: files[0].filename
    });

    readstream.on('data', function(chunk) {
        res.write(chunk);
    });

    readstream.on('end', function() {
        res.end();        
    });

    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
      res.json({"Status":500,"message":"cannot get the file"});
    });
  });
});
});





module.exports = router