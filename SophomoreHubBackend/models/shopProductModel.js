const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Model Schema of Cart => This model is to store the all the products of the shop
//The userid will be of the user who has added the product to sell

const productSchema = new mongoose.Schema({
    productid:{
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: false
    },
    desc: {
      type: String,
      required: false
    },
    domain:
    {
      type: String,
      required: true,
      unique: false
    },
    price:
    {
        type:Number,
        required:true,
        unique:false
    },
    imagepath:
    {
      type: String,
      required: true,
      unique: true 
    },
    userid:{
        type: String,
        required: true,
        unique: false
      }
  });

//Export the schema as a model

const Product = mongoose.model('Product', productSchema);
module.exports = Product;