 const express = require("express");
 const connectDB = require("./db");
 require('dotenv').config();

 const userRoutes =require("./Routes/users")
 
 const app = express();

 app.use(express.json())
 app.get ('/',(req, res)=>(
    res.send('welcome to my post api')
 
 ))


 //routes
 
 app.use('/users',userRoutes)
 const PORT =process.env.PORT

 app.listen(PORT,()=>(
    console.log('server running on port ${PORT}')

 ))

 connectDB();

