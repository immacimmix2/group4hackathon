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

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en', // Default language of your website
      includedLanguages: 'en,xog,lg,cgg,ach', // You can add more if supported
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    'google_translate_element' // The ID of the div where the widget appears
  );
}