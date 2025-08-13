//Mongoose Module for using MongoDb

const mongoose = require('mongoose');

//Model Schema of User : UserID like unique id of users, name of users, branch in enginnering, year is in which user is graduating
//company is current working location of the user if working, internship , else it is college for students graduating,profile photo
//is the path where image is stored

const userSchema = new mongoose.Schema({
    userid:{
      type: String,
      required: true,
      unique: true
    },
    name:{
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
      },
    year: {
      type: Number,
      required: true
    },
    company: {
        type: String,
        required: false
      },
    profilePhoto: {
        type: String,
        required: false
      }
  });

//Export the schema as a model

const UserBasicInfo = mongoose.model('UserBasicInfo', userSchema);
module.exports = UserBasicInfo;