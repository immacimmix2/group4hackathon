 const express = require("express");
 const connectDB = require("./db");
 const cors = require("cors");
 require('dotenv').config();
 const bodyParser = require("body-parser");
 const plateRoutes = require('./Routes/plates');
 const rideRoutes = require('./Routes/rides');

 
const path = require('path');
 const userRoutes =require("./Routes/users")
 
 const app = express();

 app.use(express.json())
 app.use(cors());
 app.use(express.static(path.join(__dirname, 'public'))); // serve frontend files
 app.use(bodyParser.json());
 app.get ('/',(req, res)=>(
    res.send('welcome to my post api')
 
 ))


 //routes
 
 app.use('/users',userRoutes)
 app.use('/', plateRoutes);
 app.use('/', rideRoutes);
 // Endpoint to receive ride requests


 const PORT = process.env.PORT

 app.listen(PORT,()=>(
    console.log("server running on port ${PORT}")

 ))

 connectDB();

