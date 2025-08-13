const express = require('express');

//UserController for handling user authentication(Login,SignUp)
const { signupuser,test,testpost, loginuser} = require('../controllers/userController');
//ConnectsController for handling connects, finding total users in a particualr branch or company,
const { newConnects} = require('../controllers/userConnectsController');
//ConnectsController for handling connects, finding total users in a particualr branch or company,
const { sendChat,loadConnects,userChat} = require('../controllers/chatController');


//Importing router so it can be used to create APIs, like app/users for login purposes, app/connects to find the connects
const router = express.Router();

//Importing Middlewares
//Not used currently const authMiddleware = require("../middlewares/authMiddleware");
//const sessionMiddleware = require("../middlewares/sessionMiddleware");

//Defining Routes

//SingUp API Point
router.post('/signupuser', signupuser);
//Login API Point and Session Creation
router.post('/loginuser',loginuser);
//Finding all current users 
router.get('/loginuser/newconnects',newConnects);
//For Sending Chat
router.post('/loginuser/sendChat',sendChat);
//Loading User Connects
router.get('/loginuser/loadConnects',loadConnects);
//Loading Users Chat
router.get('/loginuser/userChat',userChat);

//For Testing Purposes, will be deleted later
//router.get('/test',sessionMiddleware,test);
router.post('/testpost',testpost);
//router.post('/test',test);
router.get('/test',test);

module.exports = router;

