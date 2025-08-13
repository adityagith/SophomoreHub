const Product = require('../models/shopProductModel');
const Cart = require("../models/shopCartModel");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const randomstring = require("randomstring");//For creating unique Product ID
const io = require("../index"); 
const http = require('http');
const express = require("express");
let firstCallExecuted = false;
const Connects = require('../models/connectModel');
const message = require('../models/messageModel');
//Internal Functions for userConnectsController
function countObject(object)
{
    let count = 0;
    for (const value of Object.values(object)) {
        count++;
    }
    return count;
}

//Fetch Connections
exports.loadConnects = async(req,res) =>{
  //const userid = req.session.userid;
  const userid="D6baSGdad";
  const connects = await Connects.collection.findOne({userid:userid});
  const userConnects = connects.connections;
  console.log("These are connects");
  const k = userConnects[0];
  //Extract the connects into an array from the String 
  let array = JSON.parse(k.replace(/'/g, '"'));
  let temp,j;
  let names=[];
  
  //  temp = await Connects.collection.findOne({userid:array[elem]});
  //  names.push(temp.name);
  //console.log(names);
  //return names
  return res.status(200).json({"connects":JSON.stringify(array)});
}

//Fetch Chat Details
exports.userChat = async(req,res) =>{
  //const userid = req.session.userid;
  userid="D6baSGdad";
  //sendUserid receivedUserid
  //products = await Product.find({"domain":queryFromGetRequest['domain'],price: { $lt: queryFromGetRequest['price'] }});
  let messageSent = await message.find({"sendUserid":userid});
  const messageRecvd = await message.find({"receivedUserid":userid});
  //console.log(messageSent.join);
  messageSent=messageSent.join(messageRecvd);
  console.log(messageSent);
  return res.status(200).json({"messsage":JSON.stringify(messageSent)});
}

  //Display the available products
  exports.sendChat = async(req,res) =>{
  console.log(firstCallExecuted);
  const sessionData = req.session;
  req.session.isLoggedIn = true;  // Set session
  //req.session.flag=0;
  const sendUserid=req.session.userid;
  //console.log(userid);
  const receivedUserid="qwkrqeoqq";
  let messageSent;
  let messageTime; 
  //Read Real Time
  messageTime = new Date();
  const chatPort = 3000;
  const chatapp = express();
  const chatServer= http.createServer(chatapp);
  //Json and Cookies
  chatapp.use(express.json());
  chatapp.use(cookieParser());
  chatapp.use(bodyParser.json());
  chatapp.use(bodyParser.urlencoded({ extended: true }));
  chatapp.use((req, res, next) => {
    next();
  });
  const io = require("socket.io")(chatServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
  io.on('connection', (socket) => {
    console.log('A user connected'); // Optional, for debugging
    // Then listen for 'hello' event from the connected client
    socket.on('hello', (arg, callback) => {
      console.log(arg); // "world"
      messageSent=arg;
      let newMessage = new message({"sendUserid":sendUserid,"receivedUserid":receivedUserid,"message":messageSent,"timestamp":messageTime});
      newMessage.save();
      callback("got it");
    })});
    if(req.session.flag==0)
    {
      req.session.flag=1;
      chatServer.listen(chatPort, (error) => {
        if(!error)
        {         
            console.log("Chat Server listening on Port", chatPort);
        }
        else
        {
          console.log("Error: ",error);
        }});
        return res.status(200).json({"messsage":"Success !"});;
    };
    }