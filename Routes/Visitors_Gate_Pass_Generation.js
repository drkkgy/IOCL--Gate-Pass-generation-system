//Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,assert = require('assert');
var fs = require('fs');

// Creating local storage 


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

//Creating storage object 
 const storage = require('multer-gridfs-storage') ({

 	url: 'mongodb://ankit:1234567890@ds012188.mlab.com:12188/user_report_upload',
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
router.get('/Gate_Pass_Generation_Engine/:Time_Stamp', (req,res,next)=>{
// fetching details
MongoClient.connect('mongodb://ankit:1234567890@ds219879.mlab.com:19879/speed_analysis', (err,db)=> {

    assert.equal(null,err);
    console.log("Sucessfully connected to the mongodb client");
    // sending the information
 db.collection('collection name here').find({"Time-Stamp": req.params.Time_Stamp},{_id: 0}).toArray((err,result)=>{

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

	MongoClient.connect('mongodb://ankit:1234567890@ds219879.mlab.com:19879/speed_analysis', (err,db)=> {

    assert.equal(null,err);
    console.log("Sucessfully connected to the mongodb client");

    // updating info
    db.collection.update(
   {"Time-Stamp": req.body.Time_Stamp},
   {"Attended_Status?": false},
   {
     "upsert": true
  });
 });
});

// image download to be displayed on the pass
router.get('/download/:Time_Stamp',(req,res,next) =>{

var Grid = require('gridfs-stream');
var mongoose = require("mongoose");
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);


gfs.files.find({ "filename": req.params.Time_Stamp}).toArray(function (err, files) { //<------------------check------------]

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





module.exports = router