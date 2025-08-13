const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    userid:
    {
      type: String,
      required: true,
      unique: true 
    }
  });
  //https://mongoosejs.com/docs/models.html

//Export the schema as a model

const User = mongoose.model('User', userSchema);
module.exports = User;
 


  