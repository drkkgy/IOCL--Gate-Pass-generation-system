//Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,assert = require('assert');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating a local storage 

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

//Creating storage object 
 const storage = require('multer-gridfs-storage') ({

 	url: 'mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking/Visitors_Image',
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

// UPloading the image

router.post('/Visitor_Image_upload',(req, res,next)=> {
 // establish a connection
 var nPromise = new Promise(function(resolve, err){
   

  mongoose.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking/Visitors_Image');
  var conn = mongoose.connection;
  var path = require('path');
  //require GridFs
  var Grid = require('gridfs-stream');
  //require filesystem module
  var fs = require('fs');
  // Loction of the image file in local storage to be stored in DB
  //var filePath = req.body.FilePath;
  var imgPath = path.join(__dirname,'../Routes/readFrom/'+ req.body.File_Name + '.png');//<-------------------edit this
  Grid.mongo = mongoose.mongo;
  // Connect GridFS and Mongo
  conn.once('open', function(){
  	console.log('-Connection open-');
  	var gfs = Grid(conn.db);
  	// Writing the file
  	var writestream = gfs.createWriteStream({
     // File name in mongodb
     filename: JSON.stringify(req.body.Visitors_Name + req.body.Time_stamp)//<-----------------------------------------------------change
    
  	});
  	// Creating the read Stream from where the image
  	//and pipe it into the database(using write stream)
  	fs.createReadStream(imgPath).pipe(writestream);
  	writestream.on('close',function(file) {
  		console.log(file.filename + ' Written To DB');
  		res.json({"message":"Image Uploaded sucessfully"})
  	});

    writestream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
      res.json({"message":"cannot get the image file retry"});
    });
  });

});
 });


module.exports = router