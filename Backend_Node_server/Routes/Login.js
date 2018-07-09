//Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,assert = require('assert');

// Routes
router.get('/test', function(req,res,next){

    return res.send('API working')
});

router.post('/crete_account/redundency_check',(req,res,next) => {
    // Performing a username redundency check------------------------------------------------------------------

     MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err, db) => {

         try {
             assert.equal(null, err);

         } catch (e) {
             return res.json({"code": 404, "message": "Error Accessing the Server"});
         }
         try {
         console.log("Successfully connected to the mongodb client --><--");
         // sending the information
         db.collection('Employee_Logged_In_Status').findOne({'Username': req.body.Username}, (err, result) => {

             if (result != null) {
                 return res.json({"code": 500, "message": "Username already  taken try another one ","status": true});
             }
             else
             {
                 return res.json({"code": 200 , "message": "Username available","status": false});
             }
         });
         }catch (e) {
             return res.json({"status": "404", "message": "Server Access Failed"});
         }
     });

});

router.post('/crete_account',(req,res,next)=> {

    // Performing a username redundency check------------------------------------------------------------------

   /* MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err, db) => {

        try {
            assert.equal(null, err);

        } catch (e) {
            return res.json({"code": 404, "message": "Error Accessing the Server"});
        }
        try {
        console.log("Successfully connected to the mongodb client --><--");
        // sending the information
        db.collection('Employee_Logged_In_Status').findOne({'Username': req.body.Username}, (err, result) => { //'Time_tamp': req.params.Time_Stamp

            if (result != null) {
                return res.json({"code": 500, "message": "Username already  taken try another one "});
                stat = false;
            }

            if(err)
            {
                console.log(err);
            }
        });
        }catch (e) {
            return res.json({"status": "404", "message": "Server Access Failed"});
        }
    });
*/

        //------------------------------------------------------------------------------------------------------------

         MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err, db) => {


             try {
                 assert.equal(null, err);

             } catch (e) {
                 return res.json({"status": "404", "message": "Server Access Failed"});
             }

             try {
                 db.collection('Employee_Logged_In_Status').findOne({'Username': req.body.Username}, (err, result) => {
                     console.log("Sucessfuly connected to the mongodb client");
                     // Registring the information in the server for the visitor
                     db.collection('Employee_Logged_In_Status').insertOne({
                         "Name_Of_Employee": req.body.Name_Of_Employee,
                         "Username": req.body.Username,
                         "Password": req.body.Password,
                         "Reception": req.body.Reception
                     })
                         .then((result) => {
                             return res.json({"status": "200", "message": "User Registration successfully"});
                         })
                 });
             } catch (e) {

                 return res.json({"status": "404", "message": "Server Access Failed"});
             }

         });

});

// Login Check

router.post('/Login_Check', (req,res,next)=>{
// fetching details
    MongoClient.connect('mongodb://ankit:iocl1234567890@ds247290.mlab.com:47290/iocl_gate_pass_booking', (err,db)=> {

        try {
            assert.equal(null,err);

        }catch (e) {
            return res.json({"code": 404,"message":"Error Accessing the Server"});
        }

        console.log("Successfully connected to the mongodb client");
        // sending the information
        db.collection('Employee_Logged_In_Status').findOne({'Username': req.body.Username},(err,result)=>{ //'Time_tamp': req.params.Time_Stamp

            if(result == null)
            {
                return res.json({"code": 404,"message":"No registered user please check the username"})
            }
            if(result.Password === req.body.Password )
            {
                return res.json({"code": 200 , "Reception": result.Reception});
            }
            else {

                return res.json({"code": 400});
            }
        });
        if(err)
        {
            return res.json({"code": 404,"message":"No appointment at this point in time"});
        }
    });
});









module.exports = router