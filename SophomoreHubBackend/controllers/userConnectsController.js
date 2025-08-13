// User Information Model

//const session = require('express-session');
const cors = require("cors");
const bodyParser = require('body-parser');
const UserInfo = require('../models/userBasicInfoModel');

//Internal Functions for userConnectsController

function countObject(object)
{
    let count = 0;
    for (const value of Object.values(object)) {
        count++;
    }
    return count;
}


//Method to get all the users using Async

const getNewConnects = async(req,res)=>{
        try {
            //Gets the Name-Value Pair from the GET Request by React
    
            let queryFromGetRequest = req.query;
            if((countObject(queryFromGetRequest))==0)
            {
                a = await UserInfo.find({});
            }
            else
            {
                //Mongoose Query, If Parameters are passed
                const flag=queryFromGetRequest['userid'];
                if(flag!="34")
                {
                    a = await UserInfo.find({"year":queryFromGetRequest['year'],"branch":queryFromGetRequest['branch']});
                }
                else 
                {
                    console.log("connect");
                    const sessionData = req.session;
                    req.session.isLoggedIn = true;  // Set session
                    a = await UserInfo.find({"year":queryFromGetRequest['year'],"branch":queryFromGetRequest['branch'],"userid":req.session.userid});
                }
            }
            //Return the query result in JSON Format which can be used by React via Fetch
            res.status(200).json({a});
        } catch (error) {
            res.status(201).json({ message: 'Not found :(' });
        }
    } 


//Controller to get all the Possible Connects

exports.newConnects = async (req, res) => {    
    try {
        //If session is on the only
           const sessionData = req.session;
             //if (req.session.isLoggedIn) 
        console.log("connect");
                    //const sessionData = req.session;
                    //req.session.isLoggedIn = true;  // Set session
                    console.log(req.session.userid);
        getNewConnects(req,res);
      } 
    catch (error) {
        res.status(201).json({ message: 'Not registerd :(' });
      }
  };