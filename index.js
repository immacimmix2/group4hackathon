const express = require("express");
const connectDB = require("./db");
require('dotenv').config();
const cors = require('cors');



const userRoutes = require("./Routes/users")
const riderRoutes = require("./Routes/riders")
const loginRoutes = require("./Routes/login")

const app = express();



//middleware
app.use(express.json())
app.use(cors());




//default route
app.get('/', (req, res) => (
  res.send('welcome to my post api')

))


//routes
app.use('/users', userRoutes)
app.use('/riders', riderRoutes)
app.use("/login", loginRoutes);

const PORT = process.env.PORT;

//listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
