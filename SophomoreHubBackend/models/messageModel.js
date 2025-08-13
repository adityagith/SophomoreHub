const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectSchema = new mongoose.Schema({
    sendUserid:{
        type: String,
        required: true,
        unique: false,
      },
    receivedUserid:{
        type: String,
        required: true,
        unique: false,
      },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
      unique: true,
    }
  });
  
//Export the schema as a model

const Message = mongoose.model('Message', connectSchema);
module.exports = Message;
