const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Model Schema of Cart => This model is to track the cart of items for the particular user
//userid: The userid of the user whose cart is present, productid the id of the products which is added in the cart of the user
//price: The price of the product

const cartSchema = new mongoose.Schema({
    userid:{
      type: String,
      required: true,
      unique: false
    },
    productid: {
      type: String,
      required: true,
      unique: true
    },
    price:
    {
        type:Number,
        required:true,
        unique:false
    }
  });

//Export the schema as a model

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;