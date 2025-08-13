const Product = require('../models/shopProductModel');
const Cart = require("../models/shopCartModel");
const cors = require("cors");
const bodyParser = require('body-parser');
const randomstring = require("randomstring");//For creating unique Product ID

//Internal Functions for userConnectsController
function countObject(object)
{
    let count = 0;
    for (const value of Object.values(object)) {
        count++;
    }
    return count;
}

//Get Total items in User's Cart(Implement in Shop.jsx beside Cart)
//Maybe it loads when user logs in then we can store in variables 
exports.getCartCount = async(req,res) =>{
  const sessionData = req.session;
  req.session.isLoggedIn = true;
  Cart.countDocuments({"userid":req.session.userid}).
  then(response => res.status(201).json({response})).
  catch(error => res.json({"error":"500","message":error}));
}

//Display the cart
exports.getCart = async(req,res) =>{
  try {
    const sessionData = req.session;
    req.session.isLoggedIn = true;
    userCart = await Cart.find({"userid":req.session.userid});
    return res.status(201).json({userCart});
  } catch (error) {
    return res.status(401).json({"message":error});
  }
}

//Register new Product
//Also add to remove the product
exports.addToCart= async(req,res) =>{
  try {
    let newProductInCart;
    const{productid,price} = req.body;
    const sessionData = req.session;
    req.session.isLoggedIn = true;
    newProductInCart = new Cart({"userid":req.session.userid,"productid":productid,"price":price});
    newProductInCart.save();
    res.status(201).json({error: '0'});
  } catch (error) {
    res.status(501).json({error: '500'});
  }
}