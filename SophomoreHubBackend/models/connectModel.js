const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true,
        unique: true,
      },
    name:{
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: true
    },
    company:{
      type: String,
      required: true,
    },
    photoPath:{
        type: String,
        required: false,  
    },
    interest:{
        type: Array,
        required: false,  
    },
    connections:{
        type: Array,
        required: false,  
    },
  });
  
//Export the schema as a model

const Connect = mongoose.model('Connect', connectSchema);
module.exports = Connect;
 


  