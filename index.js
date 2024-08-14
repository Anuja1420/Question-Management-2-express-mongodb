const express = require('express');
const mongoose = require('mongoose');
const questions = require('./Routes/Questions.js');
const users = require('./Routes/users.js');
const cors = require('cors');   //TO connect it with UI React
const bodyParser=require('body-parser');  //you can use express.js directly 
const app = express();  //Creating a Router instance for creating requests.: app



mongoose.connect('mongodb+srv://test:test@cluster0.vkjnqsh.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0');
    
//Added Mongodb Atlas Drivers link here 
//Added username : test and password : test                 also added database here
//Cheking it in postman
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'));


const PORT = 5000;
app.listen(PORT , ()=>{
    console.log(`Mongodb Server is running on port ${PORT}`);
})

app.use(bodyParser.json());
app.use(cors());
app.use('/questions',questions);   //We are using questions in postman's path  : http://localhost:5000/questions
app.use('/users',users);  
// app.use('/question',questions); //This is path value where ever is "/" so we write "question" in the postman's path:- http://localhost:5000/question 
// app.use('/user',users); //same for user




//to run this
//Install ---> npm install 
//npm install express mongoose
//npm install cors
//npm install body-parser
//npx nodemon index.js


//If the app is crashing
//Go to Mongodb Atlas on chrome
//Go to network access
//Add Ip Address
//Click on connect anywhere