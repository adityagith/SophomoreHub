//BEORE CHANGE

const port = 4000;
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const http = require('http');
const session = require('express-session');

//const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/database");
const bodyParser = require('body-parser');

//Shop Routes
const userRoutes = require("./routes/userRoute");
const shopRoutes = require("./routes/shopRoute");

//Json and Cookies
app.use(express.json());
app.use(cookieParser());

//CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));

//Starting Session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false , httpOnly: true, }
  }));

//Parse incoming JSON data from HTTP requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware Session so it can be accessed in all routes

app.use((req, res, next) => {
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/shop', shopRoutes);
//chatapp.use('/api/users', userRoutes);

//Chat

//Database Connect
dbConnect();

//API Creation
app.listen(port,(error)=>{
    if(!error)
        {
            console.log("Server Running on Port", port);
        }
    else{
        console.log("Error: ",error);
    }
})


// const chatPort = 3000;

//   const chatapp = express();

  //const http = require('http');
  //const session = require('express-session');
  //const cookieParser = require("cookie-parser");
  //const path = require("path");
  //const cors = require("cors");
  //const bodyParser = require('body-parser');
  //const chatServer= http.createServer(chatapp);
  
  // chatapp.use((req, res, next) => {
  //   next();
  // });
  
//Testing
// const Connect = require('./models/userBasicInfoModel');
// let newConnect = new Connect({"userid":"D4baSG5ad","name":"dad","branch":"ECE","year":"2019","company":"Amazon","profilePhoto":"abc.jpg"});
// newConnect.save();

// newConnect = new Connect({"userid":"4sWpV4adasda","name":"adasda","branch":"CSE","year":"2022","company":"Alphabet","profilePhoto":"def.jpg"});
// newConnect.save();

// newConnect = new Connect({"userid":"D3baSG5ad","name":"dad","branch":"ECE","year":"2019","company":"Amazon","profilePhoto":"abk.jpg"});
// newConnect.save();

// const newConnect = new Connect({"userid":"qwkrqeoqq","name":"bro","branch":"CSE","year":"2025","company":"Microsoft","photopath":"photo/sdsdsd",
//   "interest":"['marketing','electronics']","connections":"['D6baSGdad']"});