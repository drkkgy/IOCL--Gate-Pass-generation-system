//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var MongoClient = require('mongodb').MongoClient,assert = require('assert');

// Connecting to the mongodb Database

// Express setup

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Setting server to accept cross-origin browser request

app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });

// Routes

app.get('/', (req,res,next)=>{
  
  res.send({"Status_Code": "200" ,"status":"Welcome to Gate Pass Generation Server !! Created by Ankit"});
 
});

app.use('/Visitors_Details_Registeration',require('./Routes/Visitors_Details_Registeration'));

app.use('/Visitors_List_Display',require('./Routes/Visitors_List_Display'));

app.use('/Visitors_Image_Upload',require('./Routes/Visitors_Image_Upload'));

app.use('/Visitors_Gate_Pass_Generation' , require('./Routes/Visitors_Gate_Pass_Generation'))

// null response 

app.use((req,res) => {
	res.sendStatus(404)
})

// Starting the server at the given port
app.listen(port);
console.log('Server Started at port = ' + port);