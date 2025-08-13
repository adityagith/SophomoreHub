//Modules
const UserLogin = require('../models/userLoginModel');
const UserSignup = require('../models/userSignupModel');
const cors = require("cors");
const bodyParser = require('body-parser');
const User = require('../models/userSignupModel');
//For creating unique userid which can be used to track the user data instead of using email id
const randomstring = require("randomstring");
const io = require("../index");

//Sign up Controller when a new user registers
exports.signupuser = async (req, res,next) => {
  //To create unique userid
  let tempuserid=randomstring.generate(6);
  const { name, email, password} = req.body;
  let {userid}=req.body;
  tempuserid = tempuserid.concat(name);
  userid=tempuserid;
  try {
    const newUser = new User({ name, email, password,userid });
    newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login the user 
exports.loginuser = async (req, res,next) => {
  const {email, password } = req.body;
  try {
    const checkIfUserExists = await User.exists({email:email});
    if(checkIfUserExists==null)
    {
      console.log("Failed :(");
      res.status(401).json({ message: 'Invalid Credentials !' });
    }
    else 
    {
      //Check if credentials matches, if yes save the userid
      const user = await User.collection.findOne({email:email});
      if(user.password!=password)
      {
        console.log("Wrong Password");
      }
      else
      {
        const sessionData = req.session;
        req.session.isLoggedIn = true;  // Set session
        req.session.userid = user.userid;
        req.session.flag=0;
        res.status(201).json({ message: 'Success !' }); 
      }
    }
    }
  catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Test
exports.test = async (req, res) => {
  //res.cookie('userEmail', email, { httpOnly: true, secure: false });
    try {
        console.log("Hey!");
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(201).json({ message: 'Not registerd :(' });
      }
};

//Test Post
exports.testpost = async (req, res,next) => {
  try {
      const u = await User.exists({"email":"ad@sd.com"});
      if(u!=null)
      {
        const user = await User.collection.findOne({email:"ad@sd.com"});
        console.log(user.password);
      }
    }
    catch (error) {
      res.status(401).json({ message: 'Not registerd :(' });
    }
};